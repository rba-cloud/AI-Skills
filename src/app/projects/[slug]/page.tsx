import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { projects } from "@/data/content";
import { ProjectViewer } from "../ProjectViewer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((project) => project.published).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.published);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.published);
  if (!project) notFound();
  const related = projects.find((item) => item.slug !== project.slug && item.published);

  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/projects">Projects</Link><span>/</span><span aria-current="page">{project.title}</span></nav>
          <div className="card-topline"><p className="eyebrow-label"><span />{project.category}</p><StatusBadge status={project.status} /></div>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container detail-layout">
          <article className="prose">
            <p className="provisional-note"><strong>Content status:</strong> {project.result}</p>
            <h2>Objective</h2><p>{project.objective}</p>
            <div className="placeholder-frame"><div><StatusBadge status={project.status} /><p>No authentic project imagery has been supplied yet.</p></div></div>
            <h2>Follow the process</h2>
            <p>Use the tabs to inspect each stage. They describe the prepared workflow, not an unverified completed client project.</p>
            <ProjectViewer project={project} />
            <h2>Human decisions</h2><ul>{project.humanDecisions.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2>Key lessons</h2><ul>{project.lessons.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className="text-link" href="/projects"><ArrowLeft size={16} /> All projects</Link>
          </article>
          <aside className="detail-aside">
            <StatusBadge status={project.status} />
            <dl><dt>Category</dt><dd>{project.category}</dd><dt>Tools involved</dt><dd>{project.tools.join(", ")}</dd><dt>Evidence</dt><dd>{project.status === "DEMO" ? "Illustrative workflow only" : "Authentic materials pending"}</dd></dl>
            {related && <Link className="primary-button" href={`/projects/${related.slug}`}>Next project <ArrowRight size={16} /></Link>}
          </aside>
        </div>
      </section>
    </>
  );
}
