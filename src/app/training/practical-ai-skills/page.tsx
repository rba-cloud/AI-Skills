import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, CircleAlert } from "lucide-react";
import { featuredCourse } from "@/data/content";
import { CourseAccordion } from "../CourseAccordion";
import { InterestForm } from "../InterestForm";

export const metadata: Metadata = {
  title: "Practical AI Skills for Beginners — Live Urdu Course",
  description: "A proposed four-week beginner AI course taught live in Urdu, with guided exercises and practical examples. Registration is not yet open.",
};

export default function CoursePage() {
  return (
    <>
      <section className="page-hero course-hero">
        <div className="site-container">
          <div className="breadcrumb"><Link href="/training"><ArrowLeft size={15} /> Training</Link><span>/</span><span>Practical AI Skills</span></div>
          <div className="page-hero-grid">
            <div><p className="eyebrow-label"><span />Proposed live course</p><h1>{featuredCourse.title}</h1><p>{featuredCourse.valueProposition}</p><p className="urdu-line" lang="ur" dir="rtl">{featuredCourse.urduTitle}</p></div>
            <div className="hero-note"><span>Registration status</span><strong>Interest form demo only. Enrollment is not open.</strong></div>
          </div>
          <div className="course-facts">
            <div className="course-fact"><span>Duration</span><strong>{featuredCourse.format.weeks} weeks</strong></div><div className="course-fact"><span>Live sessions</span><strong>{featuredCourse.format.sessions}</strong></div><div className="course-fact"><span>Session length</span><strong>{featuredCourse.format.sessionLength}</strong></div><div className="course-fact"><span>Proposed fee</span><strong>{featuredCourse.price.amount}</strong></div>
          </div>
        </div>
      </section>

      <section className="section-shell compact"><div className="site-container detail-layout"><article className="prose"><h2>Who this is for</h2><p>{featuredCourse.audience}</p><h3>Prerequisites</h3><ul>{featuredCourse.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul><h2>What you will practice</h2><ul>{featuredCourse.inclusions.map((item) => <li key={item}><Check size={16} aria-hidden="true" style={{ color: "#1363df", marginRight: 7 }} />{item}</li>)}</ul></article><aside className="detail-aside"><span className="status-badge status-coming-soon">Planning stage</span><dl><dt>Language</dt><dd>{featuredCourse.language}</dd><dt>Delivery</dt><dd>{featuredCourse.format.delivery}</dd><dt>Target batch</dt><dd>{featuredCourse.format.targetBatchSize}</dd><dt>Price status</dt><dd>Provisional; not yet published</dd></dl><a className="primary-button" href="#register-interest">Preview interest form</a></aside></div></section>

      <section className="section-shell philosophy"><div className="site-container detail-layout"><div><p className="eyebrow-label"><span />Course curriculum</p><h2 style={{ fontSize: "clamp(2.5rem,5vw,4.6rem)" }}>Eight Sessions. One Practical Progression.</h2><p style={{ color: "#60708a" }}>Open each session to explore the proposed topics.</p></div><CourseAccordion items={featuredCourse.modules} /></div></section>

      <section className="section-shell"><div className="site-container detail-layout"><div className="prose"><h2>Format, schedule, and policies</h2><p>The course is planned as live online teaching in Urdu. Exact dates, class platform, timetable, and batch availability have not been confirmed.</p><div className="provisional-note"><CircleAlert size={18} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: 8 }} />The proposed founding fee is {featuredCourse.price.amount}. It is not yet a published offer, and no payment is accepted here.</div><h2>Instructor information</h2><div className="placeholder-frame" style={{ height: 220 }}><div><strong>Instructor details pending</strong><br />A verified name, biography, photo, and qualifications will appear here when supplied.</div></div></div><aside className="content-inventory"><h3>Not yet confirmed</h3><ul>{featuredCourse.unconfirmedInclusions.map((item) => <li key={item}>{item}</li>)}<li>Batch dates and timetable</li><li>Payment method</li><li>Missed-session policy</li><li>Final refund policy</li></ul></aside></div></section>

      <section className="section-shell philosophy"><div className="site-container"><div style={{ maxWidth: 820 }}><p className="eyebrow-label"><span />Questions</p><h2 style={{ fontSize: "clamp(2.5rem,5vw,4.6rem)" }}>Course FAQ</h2><p style={{ color: "#60708a", marginBottom: 36 }}>Answers distinguish current plans from confirmed policies.</p><CourseAccordion kind="faq" items={featuredCourse.faqs} /></div></div></section>

      <section className="section-shell" id="register-interest"><div className="site-container registration-grid"><div><p className="eyebrow-label"><span />Interest form demo</p><h2 style={{ fontSize: "clamp(2.5rem,5vw,4.6rem)" }}>Interested in the First Batch?</h2><p style={{ color: "#60708a" }}>Preview the information a future registration form will request. Your details will not be transmitted or stored.</p></div><InterestForm /></div></section>
    </>
  );
}
