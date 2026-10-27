import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { resources } from "@/data/content";

export const metadata: Metadata = {
  title: "Free AI Learning Resources",
  description: "Practical beginner guides, prompt checklists, and workflow templates for using AI thoughtfully.",
};

export default function ResourcesPage() {
  const published = resources.filter((resource) => resource.published);
  const upcoming = resources.filter((resource) => !resource.published);
  return (
    <>
      <section className="page-hero"><div className="site-container page-hero-grid"><div><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Resources</span></nav><p className="eyebrow-label"><span />Free resources</p><h1>Learn One Useful Thing at a Time.</h1><p>Short, practical material that helps you plan AI-assisted work, give better instructions, and review the result with care.</p></div><aside className="hero-note"><span>Editorial principle</span><strong>What changed? Why does it matter? What can you do with it?</strong></aside></div></section>
      <section className="section-shell"><div className="site-container"><SectionHeading eyebrow="Start here" title="Guides for Thoughtful AI Use." copy="Every published resource has a clear purpose and can be used without a paid course." /><div className="resource-list">{published.map((resource) => <article className="resource-card" key={resource.slug}><div className="resource-meta"><span>{resource.type}</span><span>{resource.readTime}</span></div><StatusBadge status={resource.status} /><h3 style={{ marginTop: 18 }}>{resource.title}</h3><p>{resource.description}</p><Link className="text-link" href={`/resources/${resource.slug}`}>Read resource <ArrowRight size={16} /></Link></article>)}</div></div></section>
      {upcoming.length > 0 && <section className="section-shell compact philosophy"><div className="site-container"><SectionHeading eyebrow="In development" title="More Practical Material Is Coming." /><div className="card-grid">{upcoming.map((resource) => <article className="resource-card" key={resource.slug}><StatusBadge status={resource.status} /><h3 style={{ marginTop: 18 }}>{resource.title}</h3><p>{resource.description}</p></article>)}</div></div></section>}
    </>
  );
}
