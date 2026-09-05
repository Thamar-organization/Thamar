import { Router, type IRouter } from "express";
import { GetMarketQuotesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const instruments = [
  { id: "gold", symbol: "GC=F", nameAr: "الذهب", nameEn: "Gold" },
  { id: "equities", symbol: "^TASI.SR", nameAr: "مؤشر السوق السعودي", nameEn: "Saudi market index" },
  { id: "bitcoin", symbol: "BTC-USD", nameAr: "بيتكوين", nameEn: "Bitcoin" },
  { id: "oil", symbol: "CL=F", nameAr: "النفط", nameEn: "Oil" },
] as const;

type QuoteResponse = ReturnType<typeof GetMarketQuotesResponse.parse>;

let cached: { expiresAt: number; data: QuoteResponse } | undefined;

async function fetchQuote(instrument: (typeof instruments)[number]) {
  const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(instrument.symbol)}`);
  url.searchParams.set("interval", "5m");
  url.searchParams.set("range", "1d");

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ThamarMarket/1.0)",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Market provider returned ${response.status} for ${instrument.symbol}`);
  }

  const payload = await response.json() as {
    chart?: {
      result?: Array<{
        meta?: {
          regularMarketPrice?: number;
          chartPreviousClose?: number;
          previousClose?: number;
          currency?: string;
          regularMarketTime?: number;
        };
        timestamp?: number[];
        indicators?: { quote?: Array<{ close?: Array<number | null> }> };
      }>;
    };
  };

  const result = payload.chart?.result?.[0];
  const meta = result?.meta;
  const price = meta?.regularMarketPrice;
  const previousClose = meta?.chartPreviousClose ?? meta?.previousClose;

  if (!result || !meta || typeof price !== "number" || typeof previousClose !== "number" || previousClose === 0) {
    throw new Error(`Market provider returned an invalid quote for ${instrument.symbol}`);
  }

  const timestamps = result.timestamp ?? [];
  const closes = result.indicators?.quote?.[0]?.close ?? [];
  const history = timestamps.flatMap((timestamp, index) => {
    const pointPrice = closes[index];
    return typeof pointPrice === "number"
      ? [{ time: new Date(timestamp * 1_000).toISOString(), price: pointPrice }]
      : [];
  });

  return {
    ...instrument,
    price,
    previousClose,
    changePercent: ((price - previousClose) / previousClose) * 100,
    currency: instrument.id === "equities" ? "POINTS" : (meta.currency ?? "USD"),
    marketTime: new Date((meta.regularMarketTime ?? Math.floor(Date.now() / 1_000)) * 1_000).toISOString(),
    history,
  };
}

router.get("/market-quotes", async (_req, res) => {
  if (cached && cached.expiresAt > Date.now()) {
    res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=30");
    res.json(cached.data);
    return;
  }

  const results = await Promise.allSettled(instruments.map(fetchQuote));
  const quotes = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
  const data = GetMarketQuotesResponse.parse({
    status: quotes.length === instruments.length ? "live" : quotes.length > 0 ? "partial" : "unavailable",
    updatedAt: new Date().toISOString(),
    source: "Yahoo Finance",
    quotes,
  });

  if (quotes.length > 0) {
    cached = { expiresAt: Date.now() + 60_000, data };
  }

  res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=30");
  res.json(data);
});

export default router;