"use client";

import { useState } from "react";

const options = [
  { role: "Student", title: "Study, research, and think more clearly", copy: "Start with AI foundations, source-aware research, and a practical prompting habit." },
  { role: "Freelancer", title: "Build stronger creative workflows", copy: "Explore content, website, research, and productivity paths while keeping quality control human." },
  { role: "Office Worker", title: "Make everyday work more manageable", copy: "Learn structured drafting, document review, summaries, and safe workflow automation." },
  { role: "Creator", title: "Move from idea to complete production", copy: "Practice concept development, scripts, visuals, video planning, editing, and responsible publishing." },
  { role: "Business Owner", title: "Choose tools around the job", copy: "Map business tasks, assess risk, run focused experiments, and evaluate value before scaling." },
];

export function LearningExplorer() {
  const [active, setActive] = useState(0);
  return <div className="audience-picker"><p className="eyebrow-label" style={{ color: "var(--cyan)" }}><span />Learning path explorer</p><h3>What best describes you?</h3><div className="audience-buttons">{options.map((item, index) => <button className={index === active ? "active" : ""} aria-pressed={index === active} key={item.role} onClick={() => setActive(index)}>{item.role}</button>)}</div><div className="audience-result" aria-live="polite"><strong>{options[active].title}</strong>{options[active].copy}<small style={{ display: "block", marginTop: 12, color: "#8298b4" }}>This is a general suggestion, not a personalized educational diagnosis.</small></div></div>;
}
