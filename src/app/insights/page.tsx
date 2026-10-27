import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "AI Insights", description: "A prepared home for practical, source-aware AI updates from AI Skills Academy." };
export default function InsightsPage(){return <><section className="page-hero"><div className="site-container"><p className="eyebrow-label"><span />Insights & updates</p><h1>What changed—and what can you do with it?</h1><p>Our updates will focus on the practical meaning of important AI developments, with sources, publication dates, and review notes.</p></div></section><section className="section-shell"><div className="site-container"><div className="empty-state"><h2>Editorial updates are being prepared.</h2><p>No articles have been published yet. Explore our practical guides in the meantime.</p><Link className="primary-button" href="/resources">Browse resources <ArrowRight size={16}/></Link></div></div></section></>}
