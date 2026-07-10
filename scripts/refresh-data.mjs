import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const README_URL = "https://raw.githubusercontent.com/vault-developer/react-ecosystem-chart/main/README.md";
const OUTPUT_URL = new URL("../public/ecosystem.json", import.meta.url);
const FALLBACK_SOURCE_URL = new URL("../app/data.ts", import.meta.url);
const DAY_MS = 86_400_000;

function activityFromDate(pushedAt) {
  if (!pushedAt) return "Unknown";
  const age = Date.now() - new Date(pushedAt).getTime();
  if (age <= 90 * DAY_MS) return "Active";
  if (age <= 365 * DAY_MS) return "Maintained";
  return "Quiet";
}

function parseReadme(markdown) {
  let category = "";
  const libraries = [];

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      category = heading[1].trim();
      continue;
    }

    const row = line.match(/^\|\s*\[([^\]]+)\]\(https:\/\/github\.com\/([^/]+)\/([^)\/]+)(?:\/[^)]*)?\)\s*\|/);
    if (!row || !category) continue;

    libraries.push({
      name: row[1],
      repo: `${row[2]}/${row[3].replace(/\.git$/, "")}`,
      category,
      reactOnly: /shields\.io\/badge\/-yes-gray/i.test(line),
      activity: "Unknown",
      stars: null,
      pushedAt: null,
      description: null,
    });
  }

  if (!libraries.length) throw new Error("No libraries found in the source README");
  return libraries;
}

async function readFallback() {
  const source = await readFile(FALLBACK_SOURCE_URL, "utf8");
  const match = source.match(/export const fallbackLibraries: Library\[\] = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error("Unable to read bundled fallback data");
  return JSON.parse(match[1]);
}

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "react-ecosystem-explorer",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function enrich(library) {
  try {
    const response = await fetch(`https://api.github.com/repos/${library.repo}`, {
      headers: githubHeaders(),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return library;

    const repo = await response.json();
    const pushedAt = repo.pushed_at ?? null;
    return {
      ...library,
      stars: repo.stargazers_count ?? null,
      pushedAt,
      description: repo.description ?? null,
      activity: activityFromDate(pushedAt),
    };
  } catch {
    return library;
  }
}

async function enrichInBatches(libraries) {
  const enriched = [];
  for (let index = 0; index < libraries.length; index += 8) {
    enriched.push(...await Promise.all(libraries.slice(index, index + 8).map(enrich)));
  }
  return enriched;
}

async function main() {
  let libraries;
  let sourceStatus = "fresh";

  try {
    const response = await fetch(README_URL, {
      headers: { "User-Agent": "react-ecosystem-explorer" },
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`Source request failed with ${response.status}`);
    libraries = parseReadme(await response.text());
  } catch (error) {
    sourceStatus = "fallback";
    libraries = await readFallback();
    console.warn(`Source refresh failed; using bundled data: ${error.message}`);
  }

  const enriched = await enrichInBatches(libraries);
  const payload = {
    libraries: enriched,
    refreshedAt: new Date().toISOString(),
    source: "vault-developer/react-ecosystem-chart",
    sourceStatus,
  };

  await mkdir(new URL("../public/", import.meta.url), { recursive: true });
  await writeFile(OUTPUT_URL, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const metadataCount = enriched.filter((library) => library.stars !== null).length;
  console.log(`Wrote ${enriched.length} libraries (${metadataCount} with GitHub metadata) to ${fileURLToPath(OUTPUT_URL)}`);
}

await main();
