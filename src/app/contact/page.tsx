import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, Radio, Users } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Contact AI Skills Academy about practical AI learning, training, or collaboration." };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero"><div className="site-container page-hero-grid"><div><p className="eyebrow-label"><span />Contact</p><h1>Let’s Talk About Useful AI Learning.</h1><p>Choose the right inquiry type and preview the contact experience. Official contact destinations are still being finalized.</p></div><div className="hero-note"><span>Contact status</span><strong>No public email, WhatsApp number, or social profile has been supplied yet.</strong></div></div></section>
      <section className="section-shell"><div className="site-container contact-grid"><div><div className="card-grid" style={{ gridTemplateColumns: "1fr" }}><div className="feature-card"><span className="card-icon"><MessageSquare /></span><h3>General inquiry</h3><p>Questions about the academy, website, or learning resources.</p></div><div className="feature-card"><span className="card-icon"><Users /></span><h3>Training inquiry</h3><p>Interest in proposed live Urdu classes and future batches.</p></div><div className="feature-card"><span className="card-icon"><Radio /></span><h3>Collaboration</h3><p>Relevant teaching, research, content, or project collaborations.</p></div></div></div><ContactForm /></div></section>
      <section className="section-shell compact philosophy"><div className="site-container"><div className="content-inventory"><h3>Prefer live training?</h3><p>Course details remain provisional. You can review the planned curriculum and try the interest form demo without submitting personal data.</p><Link className="text-link" href="/training/practical-ai-skills">View course details <ArrowRight size={16} /></Link></div></div></section>
    </>
  );
}
