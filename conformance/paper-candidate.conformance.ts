// Type-level conformance fixture (feature 036, Phase 9 / T057).
// Asserts the SDK's own-declared intake DTOs are bidirectionally assignable to the platform's intake
// wire types (src/admissions/dto.ts), read view (src/operations/dto.ts), and closed vocabularies
// (src/canonical/contracts/paper_candidate.ts). Compiled with `tsc --noEmit` by verify_036_type_conformance.
//
// This file is NOT part of the published SDK (it lives outside packages/sdk/src), so importing the
// platform modules here does not leak internals into the public surface.

import type * as Sdk from '../src/intake/index.js';
import type * as PlatAdm from '../../../dist/src/admissions/dto.js';
import type * as PlatOps from '../../../dist/src/operations/dto.js';
import type * as PlatContract from '../../../dist/src/canonical/contracts/paper_candidate.js';

// Non-distributive mutual-assignability check (tuple-wrap avoids union distribution).
type Mutual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Assert<T extends true> = T;

// closed vocabularies (vs canonical contract)
type _CandidateSource = Assert<Mutual<Sdk.CandidateSource, PlatContract.CandidateSource>>;
type _AgentDecision = Assert<Mutual<Sdk.AgentDecision, PlatContract.AgentDecision>>;
type _AdmissionStatus = Assert<Mutual<Sdk.AdmissionStatus, PlatContract.AdmissionStatus>>;
type _AdmissionOutcome = Assert<Mutual<Sdk.AdmissionOutcome, PlatContract.AdmissionOutcome>>;

// request surface (vs platform admissions wire DTO)
type _EvidenceInput = Assert<Mutual<Sdk.PaperCandidateEvidenceInput, PlatAdm.PaperCandidateEvidenceInput>>;
type _StrategyInput = Assert<Mutual<Sdk.PaperCandidateStrategyInput, PlatAdm.PaperCandidateStrategyInput>>;
type _IntakeRequest = Assert<Mutual<Sdk.PaperCandidateIntakeRequest, PlatAdm.PaperCandidateIntakeRequest>>;
type _IntakeErrorCategory = Assert<Mutual<Sdk.IntakeErrorCategory, PlatAdm.IntakeErrorCategory>>;
type _IntakeError = Assert<Mutual<Sdk.IntakeError, PlatAdm.IntakeError>>;
type _IntakeResult = Assert<Mutual<Sdk.PaperCandidateIntakeResult, PlatAdm.PaperCandidateIntakeResult>>;

// read surface (vs platform operations read DTO)
type _EvidenceRefs = Assert<Mutual<Sdk.PaperCandidateEvidenceRefs, PlatOps.PaperCandidateEvidenceRefs>>;
type _ReadView = Assert<Mutual<Sdk.PaperCandidateReadView, PlatOps.PaperCandidateReadView>>;

// Reference every alias so noUnusedLocals (if enabled) stays quiet and tsc must evaluate them.
export type ConformanceChecks = [
  _CandidateSource, _AgentDecision, _AdmissionStatus, _AdmissionOutcome,
  _EvidenceInput, _StrategyInput, _IntakeRequest, _IntakeErrorCategory, _IntakeError, _IntakeResult,
  _EvidenceRefs, _ReadView,
];
