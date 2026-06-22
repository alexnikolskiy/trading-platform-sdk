// @trading-platform/sdk/ops-read — live bot-results wire types (types-only, own-declared).
//
// Source of truth for these shapes is trading-platform/src/operations/dto.ts (feature "ops-read 033").
// They are declared here verbatim (primitive / closed-union only — zero platform imports) and proven
// bidirectionally assignable to the platform DTOs by conformance/ops-read-dto.conformance.ts. Do NOT
// edit a field here without the conformance gate going green against operations/dto.ts.

export type BotMode = 'live' | 'paper' | 'backtest';
export type BotRunStatus = 'running' | 'finished' | 'crashed' | 'aborted';
export type TradeSide = 'long' | 'short';
export type OpsSeverity = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface BotRunStrategyRef {
  readonly name: string;
  readonly version: string;
}

export interface BotRunRecord {
  readonly runId: string;
  readonly mode: BotMode;
  readonly status: BotRunStatus;
  readonly strategy: BotRunStrategyRef;
  readonly startedAtMs: number;
  readonly finishedAtMs: number | null;
  readonly lastSeenMs: number;
  readonly symbols: readonly string[];
}

export interface ClosedTrade {
  readonly tradeId: string;
  readonly runId: string;
  readonly symbol: string;
  readonly side: TradeSide;
  readonly openedAtMs: number;
  readonly closedAtMs: number | null;
  readonly realizedPnl: string;
  readonly pnlPct: string;
  readonly isWin: boolean | null;
  readonly closeReason: string | null;
}

export interface ClosedTradesAggregate {
  readonly closedTrades: number;
  readonly wins: number;
  readonly losses: number;
  readonly breakeven: number;
  readonly winratePct: number;
  readonly pnlUsd: string;
  readonly avgPnl: string;
  readonly exitReasons: Record<string, number>;
}

export interface RunSummary extends ClosedTradesAggregate {
  readonly runId: string;
  readonly excludesReconcile: boolean;
  readonly asOf: number;
}

export interface OperationalEvent {
  readonly category: string;
  readonly severity: OpsSeverity | null;
  readonly runId: string;
  readonly tradeId: string | null;
  readonly tsMs: number;
  readonly safeMessage: string;
}

export interface DecisionLogEntry {
  readonly category: string;
  readonly runId: string;
  readonly botId: string;
  readonly symbol: string;
  readonly side: TradeSide;
  readonly reason: string;
  readonly tsMs: number;
  readonly safeMessage: string;
}
