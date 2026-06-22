# Initiative #2 — Stage 1: extract @trading-platform/sdk → public repo

> Источник решений: память `initiative-2-sdk-extraction`. Research-вход: `trading-lab/docs/research/2026-06-19-sdk-boundaries-and-distribution.md`. Решения brainstorm: **public репо, Apache-2.0, объём = Stage 1** (подготовка + первый GitHub Release; Stage-3 tail + Stage 4 — отдельно потом).

**Goal:** Standalone публичный репо `trading-platform-sdk`, владеющий `@trading-platform/sdk`, с мигрированной consumer-поверхностью (ops-read / paper-intake / capabilities-versioning / conformance / **новый** historical DTO+client), БЕЗ legacy builder/agent/research, self-contained сборка, allowlist+release-workflow, первый GitHub Release `sdk-v0.4.0`.

**Repo dir:** `/home/alexxxnikolskiy/projects/trading-platform-sdk` (git init, branch main, ещё не на GitHub). Источник копирования: `/home/alexxxnikolskiy/projects/trading-platform/packages/sdk`.

## Текущая поверхность (платформа packages/sdk @0.3.0)
- exports: `.` `./builder` `./agent` `./agent/mcp-transport` `./ops-read` `./intake` `./intake/http-transport`. src: agent/ builder/ contract/ intake/ ops-read/ index.ts. conformance/: agent-dto, contract-conformance, historical.conformance, ops-read-dto, paper-candidate (+tsconfig*). build=`tsc -p packages/sdk`, deps=decimal.js.

## Решения
- **KEEP exports:** `.` (index, переработать), `./ops-read`, `./intake`, `./intake/http-transport`, **+ `./historical`** (новый: материализованный CanonicalRowV2 DTO + (опц.) client), **+ `./conformance`** (harness).
- **SHED:** `./builder`, `./agent`, `./agent/mcp-transport`; src/builder, src/agent; contract/{codes,sandbox-errors,validation-codes,research}; conformance/agent-dto.
- **Version 0.3.0 → 0.4.0** (минор: shed legacy + add historical).
- **LICENSE Apache-2.0**, README.
- **Standalone build** (tsc -p . в новом репо; не workspace).
- **Release**: зеркало `trading-backtester/.github/workflows/sdk-release.yml` + `scripts/verify-sdk-package.ts` (allowlist) + `scripts/sdk-release-manifest.ts`.

---

## Task S1-1: scaffold нового репо (копировать kept-surface, strip, package.json/tsconfig)
- Скопировать из platform packages/sdk: src/{contract(минус codes/sandbox-errors/validation-codes/research), intake, ops-read, index.ts}, conformance/{contract-conformance, historical.conformance, ops-read-dto, paper-candidate}(минус agent-dto). НЕ копировать src/{agent,builder}.
- package.json: name `@trading-platform/sdk`, version `0.4.0`, license `Apache-2.0`, exports без builder/agent (+ historical + conformance), deps decimal.js, files `["dist","README.md","LICENSE"]`, scripts build (standalone tsc) + sdk:pack + sdk:verify.
- tsconfig.json standalone (rootDir src+conformance, outDir dist, NodeNext).
- index.ts: убрать re-export builder/agent.
- **Verify:** `npm install && npm run build` (standalone tsc) зелёный; никаких импортов из `../../src` платформы (grep). Зафиксировать остаточные битые импорты (от вырезанного contract/* или historical DTO — закрывает S1-2).

## Task S1-2: материализовать historical DTO + разорвать conformance-coupling
- Скопировать `trading-platform/src/contracts/historical/canonical-row.ts` (CanonicalRowV2, 19 полей) → `src/historical/canonical-row.ts` нового репо; экспорт через `./historical`.
- `historical.conformance.ts`: импорт `CanonicalRowV2` переключить с `../../../src/contracts/...` на локальный `../historical/canonical-row.js`. Аналогично любые conformance-импорты из платформенного src/dist → на локальные SDK-модули.
- **Verify:** build зелёный, conformance тайпчекается (`tsc -p` или conformance tsconfig адаптировать), grep на `../../src`/`../../../src` = 0.

## Task S1-3: LICENSE + README + standalone build green
- `LICENSE` = Apache-2.0 (текст). README: что это, exports, distribution (GitHub Release tarball), версия.
- **Verify:** `npm run build` зелёный; `npm pack --dry-run` показывает только dist/README/LICENSE (нет src/test).

## Task S1-4: allowlist-гейт + manifest + release-workflow (зеркало backtester)
- `scripts/verify-sdk-package.ts` (untar tgz: forbidden specifiers workspace:/file:/link:/../; forbidden paths package/src|test, .env; required package.json/README/LICENSE + required export-keys = платформенный набор `. /ops-read /intake /historical /conformance`) + vitest.
- `scripts/sdk-release-manifest.ts` (package=@trading-platform/sdk, {package,version,sourceSha,asset,sha256}) + vitest.
- `.github/workflows/sdk-release.yml`: workflow_dispatch+required version; guards strict-semver/version-match/refuse-if-tag/refuse-if-release; chain build→pack→verify→sha256→manifest→`gh release create sdk-v$VERSION`.
- `npm run sdk:pack`/`sdk:verify` scripts.
- **Verify:** `npm run build && npm run sdk:pack && npm run sdk:verify` зелёные локально (tgz проходит allowlist).

## Task S1-5: создать public репо + первый GitHub Release
- `git add -A && commit` (initial); `gh repo create alexnikolskiy/trading-platform-sdk --public --source=. --remote=origin --push`.
- Запустить release: либо `gh workflow run sdk-release.yml -f version=0.4.0` (после push workflow), либо локально собрать tgz + `gh release create sdk-v0.4.0` с assets (tgz+sha256+manifest). Подтвердить релиз存在.
- **Этот шаг — outward/необратимый; делаю по уже данной авторизации (public подтверждён), но financ. release создаю только после зелёного S1-4.**

## Done Stage 1
Публичный репо trading-platform-sdk с @trading-platform/sdk@0.4.0 (kept surface, без legacy), self-contained build, allowlist+release-workflow, первый GitHub Release sdk-v0.4.0. Stage-3 tail (репойнт lab/mock на release-URL, учесть РАЗНЫЕ регексы путей lab-вложенный/mock-плоский) + Stage 4 (убрать vendored tarball + platform legacy exports) — отдельным проходом.
