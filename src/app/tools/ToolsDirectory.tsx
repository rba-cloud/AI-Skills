"use client";

import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { toolCategories, tools } from "@/data/content";

export function ToolsDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof toolCategories)[number]>("All");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (!tool.isPublished) return false;
      const matchesCategory = category === "All" || tool.category === category;
      const searchable = [
        tool.name,
        tool.category,
        tool.description,
        ...tool.bestFor,
        ...tool.supportedTasks,
      ].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  return (
    <section className="section-shell">
      <div className="site-container">
        <div className="filter-bar" role="search" aria-label="Filter AI tools">
          <label className="search-field">
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search tools"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tool, category, or task…"
            />
          </label>
          <label>
            <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value as (typeof toolCategories)[number])}>
              {toolCategories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <p aria-live="polite" style={{ color: "var(--muted)", marginBottom: 20 }}>
          {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} shown
        </p>

        <div className="card-grid">
          {filteredTools.map((tool) => (
            <article className="tool-card" key={tool.slug}>
              <div className="card-topline">
                <span className="category-label">{tool.category}</span>
                <StatusBadge status={tool.status} />
              </div>
              <h2 style={{ fontSize: "1.7rem" }}>{tool.name}</h2>
              <p>{tool.description}</p>
              <div className="pill-row" aria-label={`Best uses for ${tool.name}`}>
                {tool.bestFor.slice(0, 3).map((use) => <span className="pill" key={use}>{use}</span>)}
              </div>
              <Link className="text-link" href={`/tools/${tool.slug}`}>Explore {tool.name} <ArrowRight size={16} /></Link>
            </article>
          ))}
          {filteredTools.length === 0 && (
            <div className="empty-state">
              <SlidersHorizontal size={30} aria-hidden="true" />
              <h2>No tools match those filters.</h2>
              <p>Try a broader search or choose another category.</p>
              <button className="secondary-button" type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
