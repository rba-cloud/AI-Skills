import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { learningPaths } from "@/data/content";
import { LearningExplorer } from "./LearningExplorer";

export const metadata: Metadata = { title: "Learn AI", description: "Explore practical AI learning paths for students, professionals, creators, and beginners." };

export default function LearnPage() {
  return <><section className="page-hero"><div className="site-container page-hero-grid"><div><p className="eyebrow-label"><span />Learn AI</p><h1>Build skills around real things you want to do.</h1><p>Choose a practical path, understand the process, and strengthen your judgment with every project. No need to memorize a hundred tools.</p></div><div className="hero-note"><span>Start here</span><strong>Understand → Practice → Build → Evaluate → Improve</strong></div></div></section><section className="section-shell compact"><div className="site-container"><LearningExplorer /></div></section><section className="section-shell"><div className="site-container"><SectionHeading eyebrow="Learning paths" title="Pick a useful place to begin." copy="Available resources open directly. Paths still being developed are labeled clearly, so you never land on an empty course page." /><div className="card-grid">{learningPaths.map((path, index) => <article className="path-card" id={path.slug} key={path.slug}><span className="path-number">{String(index + 1).padStart(2, "0")} / {path.state}</span><h3>{path.title}</h3><p>{path.description}</p><dl><div><dt>Who it is for</dt><dd>{path.audience}</dd></div><div><dt>Practice</dt><dd>{path.practice}</dd></div><div><dt>Difficulty</dt><dd>{path.difficulty}</dd></div></dl>{path.resourceHref ? <Link className="text-link" href={path.resourceHref}>Open starting resource <ArrowRight size={16} /></Link> : <span className="status-badge status-coming-soon" style={{ marginTop: "auto" }}>{path.state}</span>}</article>)}</div></div></section></>;
}
