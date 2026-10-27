import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { resources } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resources.filter((resource) => resource.published).map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug && item.published);
  if (!resource) return { title: "Resource Not Found" };
  return { title: resource.title, description: resource.description };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug && item.published);
  if (!resource) notFound();
  const related = resources.find((item) => item.published && item.slug !== resource.slug);

  return (
    <>
      <section className="page-hero"><div className="site-container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/resources">Resources</Link><span>/</span><span aria-current="page">{resource.title}</span></nav><div className="card-topline"><p className="eyebrow-label"><span />{resource.type} · {resource.readTime}</p><StatusBadge status={resource.status} /></div><h1>{resource.title}</h1><p>{resource.description}</p></div></section>
      <section className="section-shell"><div className="site-container detail-layout"><article className="prose"><p className="provisional-note">This educational guide supports human judgment. Do not share sensitive material with an AI service, and verify important outputs against reliable sources.</p><h2>What you will take away</h2>{resource.takeaways.map((takeaway, index) => <section key={takeaway}><h3><CheckCircle2 size={21} style={{ color: "var(--brand)", marginRight: 8, verticalAlign: "middle" }} />{index + 1}. {takeaway}</h3><p>{resource.slug === "human-review-loop" ? reviewCopy[index] : resourceCopy[index]}</p></section>)}<h2>Put it into practice</h2><ol><li>Choose one small task with a result you can evaluate.</li><li>Write down what a good result must include before using a tool.</li><li>Review the response for accuracy, usefulness, safety, and fit.</li><li>Correct it yourself and keep final approval human.</li></ol><Link className="text-link" href="/resources"><ArrowLeft size={16} /> All resources</Link></article><aside className="detail-aside"><StatusBadge status={resource.status} /><dl><dt>Format</dt><dd>{resource.type}</dd><dt>Reading time</dt><dd>{resource.readTime}</dd><dt>Audience</dt><dd>Practical AI beginners</dd></dl>{related && <Link className="primary-button" href={`/resources/${related.slug}`}>Read next <ArrowRight size={16} /></Link>}</aside></div></section>
    </>
  );
}

const resourceCopy = [
  "Begin with the outcome you need, not with a tool name. A focused task makes both instruction and evaluation easier.",
  "Include the minimum safe context needed to make the task understandable. Avoid confidential or personally identifying information.",
  "Explain the constraints and the shape of the output. A useful format makes the first response easier to inspect.",
  "Compare the result with your original standard. Verify facts, correct weak reasoning, and approve only work you understand.",
];

const reviewCopy = [
  "Define the purpose, audience, evidence, risks, and approval standard before asking AI for help.",
  "Give a clear, scoped instruction with useful context and an output format. Keep important constraints explicit.",
  "Stay involved during multi-step work. Check assumptions early instead of waiting until the end.",
  "Compare the output against sources, requirements, and the needs of the real audience.",
  "Revise errors and gaps deliberately. A generated result is a draft until it passes review.",
  "A responsible person makes the final decision and remains accountable for how the work is used.",
];
