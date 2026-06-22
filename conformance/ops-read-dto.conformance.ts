// Type-level conformance fixture (ops-read live bot-results surface).
// Asserts the SDK's own-declared ops-read DTOs are bidirectionally assignable to the platform's
// ops-read wire types (src/operations/dto.ts). Compiled with `tsc --noEmit` by
// verify_sdk_ops_read_conformance.mjs.
//
// This file is NOT part of the published SDK (it lives outside packages/sdk/src), so importing the
// platform module here does not leak internals into the public surface.

import type * as Sdk from '../src/ops-read/index.js';
import type * as PlatOps from '../../../dist/src/operations/dto.js';

// Non-distributive mutual-assignability check (tuple-wrap avoids union distribution).
type Mutual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Assert<T extends true> = T;

// closed unions
type _BotMode = Assert<Mutual<Sdk.BotMode, PlatOps.BotMode>>;
type _BotRunStatus = Assert<Mutual<Sdk.BotRunStatus, PlatOps.BotRunStatus>>;
type _TradeSide = Assert<Mutual<Sdk.TradeSide, PlatOps.TradeSide>>;
type _OpsSeverity = Assert<Mutual<Sdk.OpsSeverity, PlatOps.OpsSeverity>>;

// records
type _BotRunStrategyRef = Assert<Mutual<Sdk.BotRunStrategyRef, PlatOps.BotRunStrategyRef>>;
type _BotRunRecord = Assert<Mutual<Sdk.BotRunRecord, PlatOps.BotRunRecord>>;
type _ClosedTrade = Assert<Mutual<Sdk.ClosedTrade, PlatOps.ClosedTrade>>;
type _ClosedTradesAggregate = Assert<Mutual<Sdk.ClosedTradesAggregate, PlatOps.ClosedTradesAggregate>>;
type _RunSummary = Assert<Mutual<Sdk.RunSummary, PlatOps.RunSummary>>;
type _OperationalEvent = Assert<Mutual<Sdk.OperationalEvent, PlatOps.OperationalEvent>>;
type _DecisionLogEntry = Assert<Mutual<Sdk.DecisionLogEntry, PlatOps.DecisionLogEntry>>;

// Reference every alias so tsc must evaluate them.
export type ConformanceChecks = [
  _BotMode, _BotRunStatus, _TradeSide, _OpsSeverity,
  _BotRunStrategyRef, _BotRunRecord, _ClosedTrade, _ClosedTradesAggregate,
  _RunSummary, _OperationalEvent, _DecisionLogEntry,
];
