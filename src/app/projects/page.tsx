import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "AI Projects & Experiments",
  description: "Explore transparent, human-led AI project workflows for websites, videos, and visual design.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container page-hero-grid">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Projects</span></nav>
            <p className="eyebrow-label"><span />Projects & experiments</p>
            <h1>Build, Test, Correct, Repeat.</h1>
            <p>Practical AI work is rarely one perfect prompt. These case-study structures show the decisions, problems, corrections, and human judgment behind useful results.</p>
          </div>
          <aside className="hero-note"><span>Transparency first</span><strong>Demo concepts and coming-soon work are labeled clearly. Completed outcomes are never invented.</strong></aside>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container">
          <SectionHeading eyebrow="Prepared case studies" title="See the Work Behind the Result." copy="Explore the current case-study framework. Authentic screenshots and completed outcomes will be added only when approved project material is available." />
          <div className="project-grid">
            {projects.filter((project) => project.published).map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="project-art" aria-hidden="true"><i /><i /><i /></div>
                <div className="card-topline"><span className="category-label">{project.category}</span><StatusBadge status={project.status} /></div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Link className="text-link" href={`/projects/${project.slug}`}>Explore the process <ArrowRight size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
