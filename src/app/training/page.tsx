import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarClock, Languages, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredCourse } from "@/data/content";
import { InterestForm } from "./InterestForm";

export const metadata: Metadata = {
  title: "Live AI Training in Urdu",
  description: "Explore proposed beginner-friendly live AI training in Urdu, built around guided practice and useful workflows.",
};

export default function TrainingPage() {
  return (
    <>
      <section className="page-hero course-hero">
        <div className="site-container page-hero-grid">
          <div><p className="eyebrow-label"><span />Live online learning</p><h1>Learn AI Live, in Urdu.</h1><p>Beginner-friendly sessions for Pakistani learners, focused on practical demonstrations, guided exercises, and skills you can put to use.</p></div>
          <div className="hero-note"><span>Current status</span><strong>Course planning is in progress. Registration is not yet open.</strong></div>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container">
          <SectionHeading eyebrow="Featured course" title={featuredCourse.title} copy={featuredCourse.valueProposition} />
          <p className="urdu-line" lang="ur" dir="rtl">{featuredCourse.urduTitle}</p>
          <div className="course-facts">
            <div className="course-fact"><CalendarClock /><span>Proposed length</span><strong>{featuredCourse.format.weeks} weeks · {featuredCourse.format.sessions} sessions</strong></div>
            <div className="course-fact"><BookOpen /><span>Session length</span><strong>{featuredCourse.format.sessionLength}</strong></div>
            <div className="course-fact"><Languages /><span>Teaching language</span><strong>{featuredCourse.language}</strong></div>
            <div className="course-fact"><Users /><span>Target batch</span><strong>{featuredCourse.format.targetBatchSize}</strong></div>
          </div>
          <p className="provisional-note" style={{ marginTop: 22 }}>All format, batch-size, and fee details are provisional and are not public commitments.</p>
          <div className="hero-actions"><Link className="primary-button" href="/training/practical-ai-skills">View course details <ArrowRight size={17} /></Link><a className="secondary-button" href="#register-interest">Try interest form demo</a></div>
        </div>
      </section>
      <section className="section-shell philosophy">
        <div className="site-container registration-grid" id="register-interest">
          <div><SectionHeading eyebrow="Register interest" title="Tell Us What You Want to Learn." copy="Use the form to preview the planned registration experience. A secure destination is still needed before submissions can be accepted." /><div className="content-inventory"><h3>What happens now?</h3><p>No enrollment, payment, or seat reservation happens through this demo. Confirmed schedules, policy details, and a secure submission route will be published before registration opens.</p></div></div>
          <InterestForm />
        </div>
      </section>
    </>
  );
}
