import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div className="footer-lead">
          <Logo />
          <p>Practical AI education for people who want to make useful things, not just learn tool names.</p>
        </div>
        <div className="footer-links">
          <div><h2>Explore</h2><Link href="/learn">Learn AI</Link><Link href="/tools">AI Tools</Link><Link href="/projects">Projects</Link><Link href="/resources">Resources</Link></div>
          <div><h2>Academy</h2><Link href="/training">Live Training</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/insights">Insights</Link></div>
          <div><h2>Policies</h2><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refund policy</Link></div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} AI Skills Academy. Built for practical learners.</p>
        <Link href="/contact">Start a conversation <ArrowUpRight size={16} /></Link>
      </div>
    </footer>
  );
}
