import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Bot, Clapperboard, Code2, FileSearch, Palette, Sparkles, Workflow, Zap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { projects, resources, tools } from "@/data/content";

const WorkspaceVisual = dynamic(() => import("@/components/WorkspaceVisual").then((m) => m.WorkspaceVisual));

const subjects = [
  { icon: Bot, title: "AI Tools", copy: "Understand useful platforms and where they fit in real work.", href: "/tools" },
  { icon: Clapperboard, title: "AI Video Creation", copy: "Plan scenes, maintain consistency, and assemble complete stories.", href: "/learn#ai-video" },
  { icon: Code2, title: "Build Websites With AI", copy: "Transform clear ideas into accessible, tested websites.", href: "/learn#websites-with-ai" },
  { icon: FileSearch, title: "Research & Learning", copy: "Explore documents, study effectively, and verify sources.", href: "/learn#ai-for-research" },
  { icon: Zap, title: "Productivity & Automation", copy: "Improve repetitive workflows while keeping human approval.", href: "/learn#productivity-automation" },
  { icon: Palette, title: "Content Creation", copy: "Create images, scripts, presentations, and useful digital content.", href: "/learn#ai-for-content" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow-label"><span />Practical AI Education</p>
            <h1>Learn AI by <em>Actually Using It.</em></h1>
            <p className="hero-description">Discover useful AI tools, build real projects, and develop practical skills for work, learning, creativity, and business.</p>
            <div className="hero-actions"><Link className="primary-button" href="/learn">Start Learning <ArrowRight size={18} /></Link><Link className="secondary-button" href="/tools">Explore AI Tools</Link></div>
            <p className="supporting-label">Simple. Practical. Built for real life.</p>
          </div>
          <div className="hero-visual">
            <WorkspaceVisual />
            <div className="visual-label"><span>Idea → assistance → creation</span><span>01 / Workspace</span></div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><i /> Scroll to explore</div>
      </section>

      <section className="section-shell philosophy">
        <div className="site-container">
          <SectionHeading eyebrow="A better way to learn" title="AI Is More Useful When You Know What to Do With It." copy="Learning AI is not about memorizing hundreds of tools. It is about understanding what they can do, knowing when to use them, and developing the judgment to evaluate their results." />
          <div className="process-row" aria-label="Our practical learning process">{["Understand", "Practice", "Build", "Evaluate", "Improve"].map((step) => <div className="process-step" key={step}>{step}</div>)}</div>
        </div>
      </section>

      <section className="section-shell" id="learn">
        <div className="site-container">
          <SectionHeading eyebrow="What you can learn" title="Explore What You Can Do With AI." copy="Choose a useful outcome first. Then learn the tools, decisions, and review habits that help you reach it." />
          <div className="card-grid">{subjects.map(({ icon: Icon, ...subject }, index) => <Link className="feature-card" href={subject.href} key={subject.title}><span className="card-index">0{index + 1}</span><span className="card-icon"><Icon /></span><h3>{subject.title}</h3><p>{subject.copy}</p></Link>)}</div>
        </div>
      </section>

      <section className="section-shell dark-stage">
        <div className="site-container">
          <SectionHeading eyebrow="Real projects" title="We Don’t Just Talk About AI. We Build With It." copy="Explore practical experiments, working project structures, and the lessons that emerge through human review. Early examples are clearly marked until authentic project evidence is available." />
          <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.slug}><div className="project-art" aria-hidden="true"><i /><i /><i /></div><div className="card-topline"><span className="category-label">{project.category}</span><StatusBadge status={project.status} /></div><h3>{project.title}</h3><p>{project.summary}</p><Link className="text-link" href={`/projects/${project.slug}`}>View case study <ArrowRight size={16} /></Link></article>)}</div>
          <div style={{ marginTop: 48 }}><WorkflowDemo /></div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container tools-strip">
          <div><SectionHeading eyebrow="Discover AI tools" title="Find the Right AI Tool for the Job." copy="A small, curated directory organized around real tasks—not a wall of logos. Always verify current features, access, and pricing on the official website." /><Link className="primary-button" href="/tools">Browse the directory <ArrowRight size={18} /></Link></div>
          <div className="tool-browser" aria-label="Featured AI tools">{tools.slice(0, 3).map((tool) => <Link className="tool-row" href={`/tools/${tool.slug}`} key={tool.slug}><span className="tool-initial">{tool.name[0]}</span><span><strong>{tool.name}</strong><span>{tool.category}</span></span><ArrowRight size={17} style={{ marginLeft: "auto" }} /></Link>)}</div>
        </div>
      </section>

      <section className="section-shell philosophy">
        <div className="site-container training-panel">
          <div><SectionHeading eyebrow="Live AI training" title="Learn AI Live, in Urdu." copy="Beginner-friendly online classes for Pakistani learners, focused on practical demonstrations, guided exercises, and useful skills." /><p className="urdu-line" lang="ur" dir="rtl">اے آئی سیکھیں — آسان اردو میں، عملی مشقوں کے ساتھ</p><p className="provisional-note">Course format and fee are preliminary planning details. Registration is not yet open.</p><div className="hero-actions"><Link className="primary-button" href="/training/practical-ai-skills">View course details</Link><Link className="secondary-button" href="/training#register-interest">Register interest</Link></div></div>
          <div className="course-window" aria-label="Illustrative course interface"><div className="course-window-top"><i /><i /><i /></div><div className="lesson-preview"><span>Practical AI Skills · Session 02</span><h3>From vague request to useful instruction.</h3><div className="module-line"><b>01</b> Add context <i /></div><div className="module-line"><b>02</b> Define the output <i /></div><div className="module-line"><b>03</b> Review the result <i /></div></div></div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeading eyebrow="Free resources" title="Keep Learning, One Practical Step at a Time." copy="Short guides, checklists, and workflow templates designed to help you use AI more thoughtfully." />
          <div className="resource-list">{resources.filter((r) => r.published).slice(0, 3).map((resource) => <article className="resource-card" key={resource.slug}><div className="resource-meta"><span>{resource.type}</span><span>{resource.readTime}</span></div><StatusBadge status={resource.status} /><h3 style={{ marginTop: 18 }}>{resource.title}</h3><p>{resource.description}</p><Link className="text-link" href={`/resources/${resource.slug}`}>Read resource <ArrowRight size={16} /></Link></article>)}</div>
        </div>
      </section>

      <section className="final-cta"><div className="site-container"><div className="final-panel"><div><p className="eyebrow-label" style={{ color: "white" }}><span />Your next step</p><h2>The Best Way to Learn AI Is to Start Using It.</h2><p>Start with the tools available to you, learn through practical examples, and build skills that become more useful with practice.</p></div><div className="final-actions"><Link className="primary-button" href="/learn">Explore learning <ArrowRight size={18} /></Link><Link className="secondary-button" href="/training">Join live training</Link><Link className="text-link" style={{ color: "white", justifyContent: "center" }} href="/resources">Free resources</Link></div></div></div></section>
    </>
  );
}
