import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { tools } from "@/data/content";

type ToolPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.filter((tool) => tool.isPublished).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug && item.isPublished);
  if (!tool) return { title: "Tool not found" };
  return {
    title: `${tool.name} — Practical AI Tool Guide`,
    description: `${tool.description} Review practical uses, strengths, limitations, and a human-led example workflow.`,
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug && item.isPublished);
  if (!tool) notFound();

  const related = tools
    .filter((item) => item.isPublished && item.slug !== tool.slug && item.category === tool.category)
    .slice(0, 2);
  const broaderRelated = related.length ? related : tools.filter((item) => item.isPublished && item.slug !== tool.slug).slice(0, 2);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "/tools" },
      { "@type": "ListItem", position: 3, name: tool.name, item: `/tools/${tool.slug}` },
    ],
  };

  return (
    <>
      <section className="page-hero">
        <div className="site-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/tools">AI Tools</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{tool.name}</span>
          </nav>
          <div className="page-hero-grid">
            <div>
              <div className="card-topline" style={{ justifyContent: "flex-start" }}>
                <span className="category-label">{tool.category}</span><StatusBadge status={tool.status} />
              </div>
              <h1>{tool.name}</h1>
              <p>{tool.description}</p>
            </div>
            <aside className="hero-note">
              <span>Verification note</span>
              <strong>This is an editorial overview, not a real-time product listing. Check the official source before making a decision.</strong>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-shell compact">
        <div className="site-container detail-layout">
          <article className="prose">
            <h2>Where it can be useful</h2>
            <p>Use {tool.name} when its capabilities fit a clearly defined task and you can review the result responsibly.</p>
            <div className="pill-row">{tool.bestFor.map((item) => <span className="pill" key={item}>{item}</span>)}</div>

            <h2>Strengths</h2>
            <ul>{tool.strengths.map((item) => <li key={item}>{item}</li>)}</ul>

            <h2>Limitations to consider</h2>
            <ul>{tool.limitations.map((item) => <li key={item}>{item}</li>)}</ul>

            <h2>An example human-led workflow</h2>
            <ol>{tool.exampleWorkflow.map((step) => <li key={step}>{step}</li>)}</ol>

            <h2>Supported tasks</h2>
            <div className="pill-row">{tool.supportedTasks.map((item) => <span className="pill" key={item}>{item}</span>)}</div>

            <p className="provisional-note" style={{ marginTop: 40 }}>
              Tool features, policies, and commercial terms can change. AI Skills Academy has not published a verified tutorial for this entry yet.
            </p>
            <Link className="text-link" href="/tools"><ArrowLeft size={16} /> Back to all tools</Link>
          </article>

          <aside className="detail-aside" aria-label={`${tool.name} summary`}>
            <StatusBadge status={tool.status} />
            <dl>
              <dt>Category</dt><dd>{tool.category}</dd>
              <dt>Good fit for</dt><dd>{tool.audience.join(", ")}</dd>
              <dt>Free or paid?</dt><dd>{tool.freePaidStatus}</dd>
              <dt>Last reviewed</dt><dd>{tool.lastReviewedAt ?? "Not yet formally verified"}</dd>
            </dl>
            <a className="primary-button" href={tool.officialURL} target="_blank" rel="noreferrer noopener">
              Visit official website <ExternalLink size={16} aria-label="opens in a new tab" />
            </a>
          </aside>
        </div>
      </section>

      <section className="section-shell philosophy">
        <div className="site-container">
          <div className="section-heading"><p className="eyebrow-label"><span />Keep exploring</p><h2>Related tools</h2></div>
          <div className="card-grid two">
            {broaderRelated.map((item) => (
              <Link className="tool-card" href={`/tools/${item.slug}`} key={item.slug}>
                <span className="category-label">{item.category}</span>
                <h3 style={{ marginTop: 20 }}>{item.name}</h3><p>{item.description}</p>
                <span className="text-link">View guide <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
