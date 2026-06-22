// Feature 034 — vendor conformance fixture (US3 / T026; FR-005, SC-006).
// Drift layer 2 (structural): asserts the SDK-owned VENDORED contract types are mutually assignable
// with the PLATFORM source-of-truth types. Byte-level drift is caught by verify_034_snapshot_drift;
// this is an independent type-level oracle (compiled against the platform's built dist) that catches
// any structural divergence in the vendored copy. Build-time only — never shipped.

import type * as Snap from '../src/contract/research/index.js'; // SDK-owned vendored snapshot
import type * as Plat from '../../../dist/src/contracts/research/index.js'; // platform source-of-truth

// `true` is assignable to AssertMutual<A,B> ONLY when A and B are mutually assignable (structurally
// identical); otherwise the type resolves to `never` and the assignment fails to compile.
type AssertMutual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;

const _moduleManifest: AssertMutual<Snap.ModuleManifest, Plat.ModuleManifest> = true;
const _moduleKind: AssertMutual<Snap.ModuleKind, Plat.ModuleKind> = true;
const _strategyDecision: AssertMutual<Snap.StrategyDecision, Plat.StrategyDecision> = true;
const _overlayDecision: AssertMutual<Snap.OverlayDecision, Plat.OverlayDecision> = true;
const _validationResult: AssertMutual<Snap.ValidationResult, Plat.ValidationResult> = true;
const _validationIssue: AssertMutual<Snap.ValidationIssue, Plat.ValidationIssue> = true;
const _validationCode: AssertMutual<Snap.ValidationCode, Plat.ValidationCode> = true;
const _validationStatus: AssertMutual<Snap.ValidationStatus, Plat.ValidationStatus> = true;
const _severity: AssertMutual<Snap.Severity, Plat.Severity> = true;
const _capabilityDecl: AssertMutual<Snap.CapabilityDeclaration, Plat.CapabilityDeclaration> = true;
const _dataNeedsDecl: AssertMutual<Snap.DataNeedsDeclaration, Plat.DataNeedsDeclaration> = true;
const _marketDataKind: AssertMutual<Snap.MarketDataKind, Plat.MarketDataKind> = true;
const _marketDataCoverage: AssertMutual<Snap.MarketDataCoverageState, Plat.MarketDataCoverageState> = true;
const _strategyContext: AssertMutual<Snap.StrategyContext, Plat.StrategyContext> = true;

void [
  _moduleManifest, _moduleKind, _strategyDecision, _overlayDecision, _validationResult,
  _validationIssue, _validationCode, _validationStatus, _severity, _capabilityDecl,
  _dataNeedsDecl, _marketDataKind, _marketDataCoverage, _strategyContext,
];

export {};
