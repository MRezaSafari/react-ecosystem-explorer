"use client";

import { useEffect, useMemo, useState } from "react";
import { fallbackLibraries, type Activity, type Library } from "./data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categoryColors: Record<string, string> = {
  "General Frameworks/Libraries": "#49b9ff",
  "Global State Management": "#52e6aa",
  "CSS utility frameworks": "#f6c761",
  "UI kit & components": "#48d8f5",
  "Data fetching": "#9d7cff",
  "Unit testing": "#c875ff",
  "Application architecture": "#ff7e76",
  "Awesome lists": "#f3a75f",
};

const shortCategory: Record<string, string> = {
  "General Frameworks/Libraries": "Frameworks",
  "Global State Management": "State",
  "CSS utility frameworks": "Styling",
  "UI kit & components": "UI",
  "Data fetching": "Data Fetching",
  "Unit testing": "Testing",
  "Application architecture": "Architecture",
  "Awesome lists": "Collections",
};

function initials(name: string) {
  const cleaned = name.replace(/\.js$/i, "").replace(/[-_]/g, " ");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts.map((part) => part[0]).join("") : cleaned.slice(0, 2)).toUpperCase();
}

function formatStars(stars: number | null) {
  if (stars == null) return "—";
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(stars);
}

function activityCopy(activity: Activity) {
  if (activity === "Active") return "Updated within 90 days";
  if (activity === "Maintained") return "Updated within the last year";
  if (activity === "Quiet") return "No push in the last year";
  return "Activity is still refreshing";
}

function Cluster({
  category,
  libraries,
  selected,
  onSelect,
}: {
  category: string;
  libraries: Library[];
  selected: string | null;
  onSelect: (library: Library) => void;
}) {
  const color = categoryColors[category] ?? "#61dafb";
  const visible = libraries.slice(0, 7);

  return (
    <section className="cluster" style={{ "--cluster": color } as React.CSSProperties} aria-label={`${category} libraries`}>
      <div className="clusterHeader">
        <h2>{shortCategory[category] ?? category}</h2>
        <span>{libraries.length}</span>
      </div>
      <svg className="clusterLines" viewBox="0 0 100 100" aria-hidden="true">
        {visible.slice(1).map((_, index) => {
          const angle = (index / Math.max(visible.length - 1, 1)) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 36;
          const y = 54 + Math.sin(angle) * 31;
          return <line key={index} x1="50" y1="54" x2={x} y2={y} />;
        })}
      </svg>
      {visible.map((library, index) => {
        const angle = ((index - 1) / Math.max(visible.length - 1, 1)) * Math.PI * 2 - Math.PI / 2;
        const x = index === 0 ? 50 : 50 + Math.cos(angle) * 36;
        const y = index === 0 ? 54 : 54 + Math.sin(angle) * 31;
        return (
          <button
            key={library.repo}
            className={`libraryNode ${index === 0 ? "primaryNode" : ""} ${selected === library.repo ? "selectedNode" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onSelect(library)}
            title={`${library.name} — ${library.repo}`}
            aria-label={`Open details for ${library.name}`}
          >
            <span className="nodeMark">{initials(library.name)}</span>
            <span className="nodeName">{library.name}</span>
          </button>
        );
      })}
      {libraries.length > visible.length && <span className="moreCount">+{libraries.length - visible.length}</span>}
    </section>
  );
}

export default function Home() {
  const [libraries, setLibraries] = useState<Library[]>(fallbackLibraries);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [reactOnly, setReactOnly] = useState("All libraries");
  const [activity, setActivity] = useState("All activity");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [refreshState, setRefreshState] = useState<"snapshot" | "fresh" | "offline">("snapshot");
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [shareLabel, setShareLabel] = useState("Share");
  const [urlStateReady, setUrlStateReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restoreUrlState = window.setTimeout(() => {
      setQuery(params.get("q") ?? "");
      setCategory(params.get("category") ?? "All categories");
      setReactOnly(params.get("react") ?? "All libraries");
      setActivity(params.get("activity") ?? "All activity");
      setSelectedRepo(params.get("selected"));
      setUrlStateReady(true);
    }, 0);

    fetch(`${basePath}/ecosystem.json`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Snapshot failed");
        return response.json();
      })
      .then((payload: { libraries?: Library[]; refreshedAt?: string }) => {
        if (payload.libraries?.length) {
          setLibraries(payload.libraries);
          setRefreshedAt(payload.refreshedAt ?? null);
          setRefreshState("fresh");
        }
      })
      .catch(() => setRefreshState("offline"));
    return () => window.clearTimeout(restoreUrlState);
  }, []);

  useEffect(() => {
    if (!urlStateReady) return;
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All categories") params.set("category", category);
    if (reactOnly !== "All libraries") params.set("react", reactOnly);
    if (activity !== "All activity") params.set("activity", activity);
    if (selectedRepo) params.set("selected", selectedRepo);
    const next = `${window.location.pathname}${params.size ? `?${params}` : ""}`;
    window.history.replaceState({}, "", next);
  }, [query, category, reactOnly, activity, selectedRepo, urlStateReady]);

  const categories = useMemo(() => [...new Set(libraries.map((library) => library.category))], [libraries]);
  const hasActivityData = libraries.some((library) => library.activity !== "Unknown");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return libraries.filter((library) => {
      const matchesQuery = !needle || `${library.name} ${library.repo} ${library.category}`.toLowerCase().includes(needle);
      const matchesCategory = category === "All categories" || library.category === category;
      const matchesReact = reactOnly === "All libraries" || (reactOnly === "React only" ? library.reactOnly : !library.reactOnly);
      const matchesActivity = activity === "All activity" || !hasActivityData || library.activity === activity;
      return matchesQuery && matchesCategory && matchesReact && matchesActivity;
    });
  }, [libraries, query, category, reactOnly, activity, hasActivityData]);

  const grouped = useMemo(
    () => categories.map((name) => ({ name, libraries: filtered.filter((library) => library.category === name) })).filter((group) => group.libraries.length),
    [categories, filtered],
  );
  const selected = libraries.find((library) => library.repo === selectedRepo) ?? null;

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: "React Ecosystem Explorer", url });
      else await navigator.clipboard.writeText(url);
      setShareLabel("Shared");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setShareLabel("Copied");
      } catch {
        setShareLabel("Copy URL");
      }
    }
    window.setTimeout(() => setShareLabel("Share"), 1600);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All categories");
    setReactOnly("All libraries");
    setActivity("All activity");
  }

  const freshnessLabel = refreshState === "fresh"
    ? refreshedAt
      ? `Daily snapshot · ${new Date(refreshedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`
      : "Daily snapshot loaded"
    : refreshState === "offline"
      ? "Using bundled fallback"
      : "Loading daily snapshot";

  return (
    <main className="siteShell">
      <header className="topbar">
        <div className="brand">
          <span className="brandOrbit" aria-hidden="true"><i /><i /><i /><b /></span>
          <span><strong>React Ecosystem Explorer</strong><small>Discover the libraries shaping modern React apps.</small></span>
        </div>
        <button className="shareButton" onClick={share} aria-label="Share current ecosystem view"><span>↗</span>{shareLabel}</button>
      </header>

      <section className="controls" aria-label="Search and filters">
        <label className="searchBox">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search libraries, categories, or repositories…" aria-label="Search libraries" />
          {query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </label>
        <div className="filterRow">
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>React scope</span><select value={reactOnly} onChange={(event) => setReactOnly(event.target.value)}><option>All libraries</option><option>React only</option><option>Framework agnostic</option></select></label>
          <label className={!hasActivityData ? "disabledFilter" : ""}><span>Activity</span><select value={activity} disabled={!hasActivityData} onChange={(event) => setActivity(event.target.value)}>{!hasActivityData ? <option value="All activity">Refreshing activity…</option> : <><option>All activity</option><option>Active</option><option>Maintained</option><option>Quiet</option></>}</select></label>
        </div>
      </section>

      <section className="explorerFrame">
        <div className="canvasToolbar">
          <span className={`freshness ${refreshState}`}><i />{freshnessLabel}</span>
          <span>{filtered.length} of {libraries.length} libraries</span>
        </div>
        <div className="chartViewport">
          <div className="ambientGrid" />
          <div className="clusterGrid" style={{ transform: `scale(${zoom})` }}>
            {grouped.map((group) => <Cluster key={group.name} category={group.name} libraries={group.libraries} selected={selectedRepo} onSelect={(library) => setSelectedRepo(library.repo)} />)}
          </div>
          {!grouped.length && <div className="emptyState"><strong>No libraries found</strong><span>Try a broader search or reset the filters.</span><button onClick={clearFilters}>Reset filters</button></div>}
          <div className="zoomControls" aria-label="Chart zoom controls"><button onClick={() => setZoom((value) => Math.max(0.8, +(value - 0.1).toFixed(1)))} aria-label="Zoom out">−</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom((value) => Math.min(1.2, +(value + 0.1).toFixed(1)))} aria-label="Zoom in">+</button></div>
        </div>
      </section>

      <footer><span>Source: <a href="https://github.com/vault-developer/react-ecosystem-chart" target="_blank" rel="noreferrer">vault-developer/react-ecosystem-chart</a></span><span>Activity: Active ≤ 90d · Maintained ≤ 1y · Quiet &gt; 1y</span></footer>

      {selected && (
        <aside className="detailPanel" aria-label={`${selected.name} details`}>
          <button className="panelClose" onClick={() => setSelectedRepo(null)} aria-label="Close details">×</button>
          <div className="detailMark" style={{ "--detail": categoryColors[selected.category] } as React.CSSProperties}>{initials(selected.name)}</div>
          <p className="eyebrow">{shortCategory[selected.category] ?? selected.category}</p>
          <h2>{selected.name}</h2>
          <p className="repoName">{selected.repo}</p>
          <p className="description">{selected.description ?? "Project details are refreshed from GitHub every 24 hours."}</p>
          <div className="statGrid"><div><span>Stars</span><strong>{formatStars(selected.stars)}</strong></div><div><span>Scope</span><strong>{selected.reactOnly ? "React only" : "Agnostic"}</strong></div></div>
          <div className={`activityCard ${selected.activity.toLowerCase()}`}><i /><span><strong>{selected.activity} activity</strong><small>{activityCopy(selected.activity)}</small></span></div>
          {selected.pushedAt && <p className="updated">Last push {new Date(selected.pushedAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}</p>}
          <a className="githubLink" href={`https://github.com/${selected.repo}`} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>
        </aside>
      )}
      {selected && <button className="panelBackdrop" aria-label="Close details" onClick={() => setSelectedRepo(null)} />}
    </main>
  );
}
