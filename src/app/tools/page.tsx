import type { Metadata } from "next";
import { ToolsDirectory } from "./ToolsDirectory";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Explore a small, practical directory of AI tools for research, design, video, coding, and productivity—with honest limitations and human-led workflows.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="site-container page-hero-grid">
          <div>
            <p className="eyebrow-label"><span />Curated, not crowded</p>
            <h1>Find the Right AI Tool for the Job.</h1>
            <p>
              Start with the task, understand the tradeoffs, and keep a person responsible for the final result.
              This launch directory is intentionally small and editable.
            </p>
          </div>
          <aside className="hero-note">
            <span>Before you choose</span>
            <strong>Features, availability, and pricing can change. Confirm important details on each tool&apos;s official website.</strong>
          </aside>
        </div>
      </section>
      <ToolsDirectory />
    </>
  );
}
