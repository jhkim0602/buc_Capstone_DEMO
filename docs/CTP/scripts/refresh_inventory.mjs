#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();
const outPath = path.join(root, "docs/CTP/INVENTORY.md");
const base = path.join(root, "web/components/features/ctp/contents/categories");

const rows = [];

const rel = (p) => path.relative(root, p).replace(/\\/g, "/");

function walkDirs(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p.includes("/sub-concepts/")) rows.push(parseSubConceptDir(p));
      walkDirs(p);
    }
  }
}

function parseSubConceptDir(dir) {
  const relDir = path.relative(base, dir).replace(/\\/g, "/");
  const parts = relDir.split("/");
  const category = parts[0];
  const concept = parts[2];
  const subConcept = parts[4];
  const configPath = path.join(dir, "config.ts");
  const logicPath = path.join(dir, "logic.ts");

  let mode = "code";
  if (fs.existsSync(configPath)) {
    const configText = fs.readFileSync(configPath, "utf8");
    const mm = configText.match(/\bmode\s*:\s*['\"](code|interactive)['\"]/);
    if (mm) mode = mm[1];
  }

  let simType = "OTHER";
  let adapter = "";
  let dataMapper = false;
  if (fs.existsSync(logicPath)) {
    const logicText = fs.readFileSync(logicPath, "utf8");
    if (/useSkulptEngine\s*\(/.test(logicText)) {
      simType = "SKULPT";
      const am = logicText.match(/adapterType\s*:\s*['\"]([^'\"]+)['\"]/);
      if (am) adapter = am[1];
      dataMapper = /dataMapper\s*:/.test(logicText);
    } else if (/interactive\s*:/.test(logicText) || /useState\s*\(/.test(logicText)) {
      simType = "STATE";
    }
  }

  return {
    category,
    concept,
    subConcept,
    mode,
    simType,
    adapter,
    dataMapper,
    configPath: rel(configPath),
    logicPath: rel(logicPath),
  };
}

function moduleKeysFromRegistry(absPath) {
  const txt = fs.readFileSync(absPath, "utf8");
  const keys = [];
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*(?:['\"]([a-z0-9-]+)['\"]|([a-zA-Z_][a-zA-Z0-9_-]*))\s*:\s*\{/);
    if (!m) continue;
    const k = m[1] || m[2];
    if (["config", "useSim", "Visualizer"].includes(k)) continue;
    keys.push(k);
  }
  return keys;
}

function parseRouteConceptKeys() {
  const regPath = path.join(root, "web/lib/ctp-content-registry.tsx");
  const txt = fs.readFileSync(regPath, "utf8");
  const keys = new Set();
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/"([a-z0-9-]+\/[a-z0-9-]+)"\s*:/i);
    if (m) keys.add(m[1]);
  }
  return keys;
}

walkDirs(base);
rows.sort((a, b) => `${a.category}/${a.concept}/${a.subConcept}`.localeCompare(`${b.category}/${b.concept}/${b.subConcept}`));

const totals = {
  total: rows.length,
  mode: {},
  simType: {},
  adapters: {},
};
for (const r of rows) {
  totals.mode[r.mode] = (totals.mode[r.mode] || 0) + 1;
  totals.simType[r.simType] = (totals.simType[r.simType] || 0) + 1;
  if (r.adapter) totals.adapters[r.adapter] = (totals.adapters[r.adapter] || 0) + 1;
}

const categoryIdMap = {
  linear: "linear-ds",
  "non-linear": "non-linear-ds",
  algorithms: "algorithms",
};

const routeKeys = parseRouteConceptKeys();

const conceptMeta = [];
const conceptRoot = path.join(base);
for (const category of fs.readdirSync(conceptRoot)) {
  const conceptDir = path.join(conceptRoot, category, "concepts");
  if (!fs.existsSync(conceptDir)) continue;

  for (const concept of fs.readdirSync(conceptDir)) {
    const p = path.join(conceptDir, concept);
    if (!fs.statSync(p).isDirectory()) continue;
    const registryFile = fs.readdirSync(p).find((f) => f.endsWith("-registry.ts"));
    const registryAbs = registryFile ? path.join(p, registryFile) : null;
    const moduleKeys = registryAbs ? moduleKeysFromRegistry(registryAbs) : [];

    const categoryId = categoryIdMap[category] || category;
    const routeKey = `${categoryId}/${concept}`;

    conceptMeta.push({
      category,
      categoryId,
      concept,
      routeExposed: routeKeys.has(routeKey),
      route: `/insights/ctp/${categoryId}/${concept}`,
      moduleCount: moduleKeys.length,
      moduleKeys,
      indexPath: rel(path.join(p, "index.tsx")),
      registryPath: registryAbs ? rel(registryAbs) : "",
    });
  }
}
conceptMeta.sort((a, b) => `${a.category}/${a.concept}`.localeCompare(`${b.category}/${b.concept}`));

const lines = [];
lines.push("# CTP Inventory Snapshot");
lines.push("");
lines.push("기준: 현재 코드베이스 자동 스캔 결과");
lines.push("");
lines.push("## 1) 전체 통계");
lines.push("");
lines.push(`- 총 서브컨셉 디렉토리: **${totals.total}**`);
lines.push(`- 모드 분포: code=${totals.mode.code || 0}, interactive=${totals.mode.interactive || 0}`);
lines.push(`- 시뮬레이션 타입: SKULPT=${totals.simType.SKULPT || 0}, STATE=${totals.simType.STATE || 0}, OTHER=${totals.simType.OTHER || 0}`);
lines.push("");
lines.push("- Adapter 사용량:");
for (const [k, v] of Object.entries(totals.adapters).sort((a, b) => b[1] - a[1])) {
  lines.push(`  - ${k}: ${v}`);
}
lines.push("");
lines.push("## 2) Concept 단위 맵");
lines.push("");
lines.push("| category(folder) | categoryId(route) | conceptId | routeExposed | modules(registry) | moduleKeys | route | index | registry |");
lines.push("|---|---|---|---|---:|---|---|---|---|");
for (const c of conceptMeta) {
  const moduleKeysText = c.moduleKeys.join(", ");
  lines.push(`| ${c.category} | ${c.categoryId} | ${c.concept} | ${c.routeExposed ? "yes" : "no"} | ${c.moduleCount} | ${moduleKeysText} | \`${c.route}\` | \`${c.indexPath}\` | \`${c.registryPath}\` |`);
}
lines.push("");
lines.push("## 3) 서브컨셉 전체 매트릭스 (CSV)");
lines.push("");
lines.push("```csv");
lines.push("category_folder,concept_id,subconcept_id,mode,sim_type,adapter_type,data_mapper,config_path,logic_path");
for (const r of rows) {
  lines.push([
    r.category,
    r.concept,
    r.subConcept,
    r.mode,
    r.simType,
    r.adapter,
    r.dataMapper ? "yes" : "",
    r.configPath,
    r.logicPath,
  ].join(","));
}
lines.push("```");
lines.push("");
lines.push("## 4) Interactive 모듈 목록");
lines.push("");
lines.push("| concept | subConcept | config | logic |");
lines.push("|---|---|---|---|");
for (const r of rows.filter((x) => x.mode === "interactive")) {
  lines.push(`| ${r.concept} | ${r.subConcept} | \`${r.configPath}\` | \`${r.logicPath}\` |`);
}
lines.push("");
lines.push("## 5) 특이사항");
lines.push("");
lines.push("- `algorithms/dfs`, `algorithms/bfs`는 registry에서 `../dfs-bfs/sub-concepts/*`를 참조하는 shared 구조다.");
lines.push("- `algorithms/dfs-bfs` 폴더는 route 노출 대상이 아니며(shared 소스 저장소 역할), 실제 사용자 라우트는 `dfs`, `bfs`다.");
lines.push("- 일부 모듈은 `adapterType` 대신 `dataMapper` 기반 커스텀 파싱을 사용한다(예: stack 하위 일부).");
lines.push("- `mode: interactive` 구현은 두 가지:");
lines.push("  - 로직에서 `interactive` runtime 직접 반환 (`CTPInteractiveModule`)");
lines.push("  - 로직 최소화 + `CTPInteractivePlayground` fallback");

fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath}`);
