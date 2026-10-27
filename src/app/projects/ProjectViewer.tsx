"use client";

import { useRef, useState } from "react";
import type { Project } from "@/data/content";

type Tab = { label: string; title: string; body: string; notes?: string[] };

export function ProjectViewer({ project }: { project: Project }) {
  const tabs: Tab[] = [
    {
      label: "Idea",
      title: project.steps[0]?.title ?? "Initial idea",
      body: project.steps[0]?.description ?? project.objective,
      notes: project.humanDecisions,
    },
    {
      label: "First Result",
      title: project.steps[1]?.title ?? "First result",
      body: project.steps[1]?.description ?? "No approved first-result asset is available yet.",
    },
    {
      label: "Problems",
      title: project.steps[2]?.title ?? "Problems found",
      body: project.steps[2]?.description ?? "The review findings will be documented when an authentic project is supplied.",
      notes: project.problems,
    },
    {
      label: "Improved Result",
      title: project.steps[3]?.title ?? "Improved result",
      body: project.steps[3]?.description ?? project.result,
      notes: project.corrections,
    },
  ];
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="project-tabs" role="tablist" aria-label={`${project.title} case-study stages`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(node) => { refs.current[index] = node; }}
            id={`project-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`project-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); move(active + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); move(active - 1); }
              if (event.key === "Home") { event.preventDefault(); move(0); }
              if (event.key === "End") { event.preventDefault(); move(tabs.length - 1); }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => active === index && (
        <section
          className="project-tab-panel"
          id={`project-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${index}`}
          tabIndex={0}
          key={tab.label}
        >
          <h2>{tab.title}</h2>
          <p>{tab.body}</p>
          {tab.notes && tab.notes.length > 0 && <ul>{tab.notes.map((note) => <li key={note}>{note}</li>)}</ul>}
        </section>
      ))}
    </div>
  );
}
