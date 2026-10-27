import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  BriefcaseBusiness,
  School,
  Building2,
  Sparkles,
  Command,
  Layers,
  Globe2,
  PenTool,
  Check,
  X,
  Menu,
  ChevronDown,
  Play,
  ExternalLink,
  Compass,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  categoryUr,
  courses,
  demoStages,
  projects,
  tools,
  toolCategories,
} from "./data";
import type { Locale } from "./data";
import { site } from "./config";
import Visual from "./Visual";

type Modal = { title: string; content: ReactNode } | null;
function Dialog({
  modal,
  close,
}: {
  modal: NonNullable<Modal>;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef(document.activeElement as HTMLElement | null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      dialog?.close();
      returnFocus.current?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dialog-inner">
        <button
          className="icon-btn dialog-close"
          onClick={close}
          aria-label="Close / بند کریں"
        >
          <X />
        </button>
        <span className="eyebrow">AI SKILLS ACADEMY</span>
        <h2 id="dialog-title">{modal.title}</h2>
        {modal.content}
      </div>
    </dialog>
  );
}
export default function App() {
  const [lang, setLang] = useState<Locale>("en"),
    [menu, setMenu] = useState(false),
    [courseFilter, setCourseFilter] = useState("all"),
    [toolFilter, setToolFilter] = useState("all"),
    [query, setQuery] = useState(""),
    [step, setStep] = useState(0),
    [modal, setModal] = useState<Modal>(null);
  const t = (en: string, ur: string) => (lang === "en" ? en : ur);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.title = t(
      "AI Skills Academy — Practical AI Education",
      "اے آئی اسکلز اکیڈمی — عملی تعلیم",
    );
  }, [lang]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.07 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  const social = () =>
    setModal({
      title: t("Find your learning community", "اپنی تعلیمی کمیونٹی تلاش کریں"),
      content: (
        <>
          <p>
            {t(
              "AI Skills Academy is building its community across Facebook and Instagram. Verified profile URLs have not been supplied for this development preview.",
              "اے آئی اسکلز اکیڈمی Facebook اور Instagram پر اپنی کمیونٹی بنا رہی ہے۔ اس ترقیاتی پیش منظر کے لیے تصدیق شدہ پروفائل لنکس فراہم نہیں کیے گئے۔",
            )}
          </p>
          <div className="social-links">
            {(["facebook", "instagram"] as const).map((key) =>
              site[key] ? (
                <a
                  className="button"
                  key={key}
                  href={site[key]!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key}
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className="status" key={key}>
                  {key} · {t("URL pending", "لنک درکار ہے")}
                </span>
              ),
            )}
          </div>
        </>
      ),
    });
  const nav = [
    ["tracks", t("Learning Tracks", "تعلیمی راستے")],
    ["tools", t("AI Tools", "اے آئی ٹولز")],
    ["projects", t("Projects", "پروجیکٹس")],
    ["about", t("About", "تعارف")],
  ];
  const icons = [Command, Layers, BriefcaseBusiness, PenTool, Globe2];
  return (
    <>
      <a className="skip-link" href="#main">
        {t("Skip to content", "مواد پر جائیں")}
      </a>
      <Visual />
      <header className="header">
        <a
          className="brand"
          href="#home"
          aria-label={t("AI Skills Academy home", "اے آئی اسکلز اکیڈمی ہوم")}
        >
          {site.logoUrl ? (
            <img src={site.logoUrl} alt="AI Skills Academy" />
          ) : (
            <>
              <span className="brand-name">
                AI SKILLS
                <span>
                  ACADEMY<span className="brand-dot">.</span>
                </span>
              </span>
              <span className="placeholder-label">
                {t("TEMPORARY WORDMARK", "عارضی نام")}
              </span>
            </>
          )}
        </a>
        <nav
          className="desktop-nav"
          aria-label={t("Main navigation", "مرکزی نیویگیشن")}
        >
          {nav.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={() => {
              setLang(lang === "en" ? "ur" : "en");
              setMenu(false);
              setModal(null);
            }}
            aria-label={t("Switch to Urdu", "Switch to English")}
          >
            <Globe2 size={15} />
            {lang === "en" ? "اردو" : "EN"}
          </button>
          <a className="button small header-cta" href="#demo">
            {t("Start Learning", "سیکھنا شروع کریں")}
            <ArrowUpRight size={15} />
          </a>
          <button
            id="menu-toggle"
            className="icon-btn mobile-toggle"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={t("Toggle menu", "مینو کھولیں یا بند کریں")}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label={t("Mobile navigation", "موبائل نیویگیشن")}
          >
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" />
              {t("PRACTICAL AI EDUCATION", "عملی اے آئی تعلیم")}
            </div>
            <h1>
              {t("Learn AI Skills", "اے آئی کی وہ مہارتیں")}
              <br />
              {t("That", "سیکھیں جو")}{" "}
              <span className="gradient-text">{t("Matter.", "اہم ہیں۔")}</span>
            </h1>
            <p className="hero-description">
              {t(
                "Discover practical AI tools, master smarter workflows, and turn new skills into real-world results.",
                "عملی اے آئی ٹولز دریافت کریں، بہتر طریقۂ کار سیکھیں اور نئی مہارتوں کو حقیقی کاموں میں استعمال کریں۔",
              )}
            </p>
            <div className="hero-buttons">
              <a className="button" href="#demo">
                {t("Start Learning", "سیکھنا شروع کریں")}
                <ArrowUpRight size={18} />
              </a>
              <a className="button ghost" href="#projects">
                <Play size={14} />
                {t("Explore Projects", "پروجیکٹس دیکھیں")}
              </a>
            </div>
            <div className="hero-note">
              <span className="mini-icon">
                <Sparkles size={15} />
              </span>
              <span>
                {t(
                  "Big possibilities. No experience required.",
                  "بڑے امکانات۔ سابقہ تجربہ ضروری نہیں۔",
                )}
              </span>
            </div>
          </div>
          <div className="hero-orbit-label orbit-top">
            <span className="tiny-square" />
            {t(
              "YOUR NEXT CHAPTER STARTS HERE",
              "آپ کا نیا سفر یہاں سے شروع ہوتا ہے",
            )}
          </div>
          <div className="hero-orbit-label orbit-bottom">
            <span className="crosshair">+</span>
            <div>
              {t("THE KNOWLEDGE CORE", "علم کا مرکز")}
              <small>{t("Curiosity, connected.", "تجسس سے تعلق تک۔")}</small>
            </div>
            <span className="coordinate">01 / ∞</span>
          </div>
          <div className="hero-bottom">
            <a href="#why">
              <span className="scroll-indicator">
                <ChevronDown size={15} />
              </span>
              {t("SCROLL TO DISCOVER", "مزید دریافت کریں")}
            </a>
            <span>
              {t(
                "Learn AI. Work Smarter. Grow Faster.",
                "اے آئی سیکھیں۔ بہتر کام کریں۔ تیزی سے آگے بڑھیں۔",
              )}
            </span>
          </div>
        </section>
        <div className="topic-bar">
          <div className="shell">
            <span>
              {t("IDEAS INTO EVERYDAY SKILLS", "خیالات سے روزمرہ مہارتوں تک")}
            </span>
            {[
              "ChatGPT",
              "Prompt Engineering",
              "AI Productivity",
              "Creative AI",
            ].map((label, i) => (
              <span key={label}>
                <span className="topic-star">✳</span>
                {lang === "ur"
                  ? [
                      "ChatGPT",
                      "پرامپٹ لکھنا",
                      "اے آئی سے کارکردگی",
                      "تخلیقی اے آئی",
                    ][i]
                  : label}
              </span>
            ))}
          </div>
        </div>
        <section id="why" className="section shell reveal">
          <div className="section-top">
            <span className="eyebrow">
              01 — {t("BUILT FOR YOUR NEXT STEP", "آپ کے اگلے قدم کے لیے")}
            </span>
            <span className="section-index">WHY AI</span>
          </div>
          <div className="split-heading">
            <h2>
              {t("The Future Belongs to People", "مستقبل ان لوگوں کا ہے")}
              <br />
              <span className="muted">
                {t("Who Keep Learning.", "جو سیکھتے رہتے ہیں۔")}
              </span>
            </h2>
            <p>
              {t(
                "You don’t need to be a tech expert. Just bring your curiosity. There’s a practical place for AI in what you already do.",
                "آپ کو ٹیکنالوجی کا ماہر ہونے کی ضرورت نہیں۔ بس تجسس ساتھ لائیں۔ آپ کے موجودہ کام میں بھی اے آئی کی جگہ ہے۔",
              )}
            </p>
          </div>
          <div className="audience-grid">
            {[
              [
                GraduationCap,
                t("Students", "طلبہ"),
                t(
                  "Improve research, learning, and study workflows.",
                  "تحقیق، سیکھنے اور مطالعے کے طریقے بہتر بنائیں۔",
                ),
              ],
              [
                School,
                t("Teachers", "اساتذہ"),
                t(
                  "Prepare lessons and educational resources.",
                  "اسباق اور تعلیمی وسائل تیار کریں۔",
                ),
              ],
              [
                BriefcaseBusiness,
                t("Professionals", "پیشہ ور افراد"),
                t(
                  "Work more efficiently with AI tools.",
                  "اے آئی ٹولز سے زیادہ مؤثر انداز میں کام کریں۔",
                ),
              ],
              [
                Building2,
                t("Businesses", "کاروبار"),
                t(
                  "Discover automation and content workflows.",
                  "خودکاری اور مواد بنانے کے طریقے دریافت کریں۔",
                ),
              ],
            ].map(([Icon, title, description], i) => {
              const I = Icon as typeof GraduationCap;
              return (
                <article className="audience-card" key={i}>
                  <I size={25} strokeWidth={1.4} />
                  <span className="card-no">0{i + 1}</span>
                  <h3>{title as string}</h3>
                  <p>{description as string}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section id="tracks" className="section section-tinted">
          <div className="shell reveal">
            <div className="section-top">
              <span className="eyebrow">
                02 —{" "}
                {t("FIND YOUR LEARNING PATH", "اپنا تعلیمی راستہ تلاش کریں")}
              </span>
              <span className="section-index">LEARNING TRACKS</span>
            </div>
            <div className="split-heading">
              <h2>
                {t("From Your First Prompt", "آپ کے پہلے پرامپٹ سے")}
                <br />
                <span className="muted">
                  {t("to Real AI Projects.", "عملی اے آئی پروجیکٹس تک۔")}
                </span>
              </h2>
              <p>
                {t(
                  "Small steps. Useful skills. Explore the learning tracks we’re building, and try a free guided example today.",
                  "چھوٹے قدم۔ مفید مہارتیں۔ ہمارے زیرِ تیاری تعلیمی راستے دیکھیں اور آج ہی مفت رہنمائی والی مثال آزمائیں۔",
                )}
              </p>
            </div>
            <div
              className="filters"
              aria-label={t(
                "Filter learning tracks",
                "تعلیمی راستے منتخب کریں",
              )}
            >
              {[
                ["all", t("All tracks", "تمام راستے")],
                ["basics", t("The essentials", "بنیادی مہارتیں")],
                ["work", t("Work smarter", "بہتر کام")],
                ["creative", t("Create & build", "تخلیق و تعمیر")],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-pressed={courseFilter === id}
                  onClick={() => setCourseFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="course-grid" aria-live="polite">
              {courses
                .filter(
                  (c) => courseFilter === "all" || c.category === courseFilter,
                )
                .map((c) => {
                  const Icon = icons[courses.indexOf(c)];
                  return (
                    <article className="course-card" key={c.id}>
                      <div className={`course-art art-${c.id}`}>
                        <div className="art-orbit" />
                        <Icon size={49} strokeWidth={1.1} />
                        <span className="art-grid" />
                        <span className="status">
                          {t("PLANNED", "منصوبہ بندی")}
                        </span>
                      </div>
                      <div className="course-body">
                        <div className="course-meta">
                          <span>{c.difficulty[lang]}</span>
                          <span>·</span>
                          <span>{t("Learning track", "تعلیمی راستہ")}</span>
                        </div>
                        <h3>{c.title[lang]}</h3>
                        <p>{c.description[lang]}</p>
                        <a href={c.destination}>
                          {t("Try a related example", "متعلقہ مثال آزمائیں")}
                          <ArrowUpRight size={17} />
                        </a>
                      </div>
                    </article>
                  );
                })}
            </div>
            <p className="section-note">
              <span className="live-dot" />
              {t(
                "Tracks are in development. No enrollment or certificates are currently offered.",
                "تعلیمی راستے تیاری کے مراحل میں ہیں۔ فی الحال داخلہ یا اسناد دستیاب نہیں۔",
              )}
            </p>
          </div>
        </section>
        <section id="demo" className="section shell reveal">
          <div className="section-top">
            <span className="eyebrow">
              03 —{" "}
              {t("LESS SCROLLING. MORE DOING.", "دیکھنے سے آگے، عمل کی طرف۔")}
            </span>
            <span className="section-index">THE PROMPT LAB</span>
          </div>
          <div className="demo-layout">
            <div className="demo-intro">
              <h2>
                {t("Don’t Just Watch AI.", "اے آئی کو صرف دیکھیں نہیں۔")}
                <br />
                <span className="gradient-text">
                  {t("Use It.", "استعمال کریں۔")}
                </span>
              </h2>
              <p>
                {t(
                  "A better answer starts with a better question. See how a few thoughtful details transform a prompt.",
                  "بہتر جواب ایک بہتر سوال سے شروع ہوتا ہے۔ دیکھیں کہ چند واضح تفصیلات پرامپٹ کو کیسے بدلتی ہیں۔",
                )}
              </p>
              <div
                className="demo-steps"
                aria-label={t(
                  "Prompt example stages",
                  "پرامپٹ کی مثال کے مراحل",
                )}
              >
                {demoStages.map((s, i) => (
                  <button
                    key={i}
                    aria-pressed={step === i}
                    onClick={() => setStep(i)}
                  >
                    <span>{step > i ? <Check size={15} /> : `0${i + 1}`}</span>
                    {s.label[lang]}
                    {step === i && <ArrowRight size={16} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="prompt-panel">
              <div className="panel-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>{t("A GUIDED EXAMPLE", "رہنمائی والی مثال")}</span>
                <span className="status">
                  {t("NOT LIVE AI", "براہِ راست اے آئی نہیں")}
                </span>
              </div>
              <div className="prompt-content" aria-live="polite">
                <div className="prompt-person">
                  <span>
                    <Command size={17} />
                  </span>
                  {step === 2
                    ? t("SAMPLE RESPONSE", "جواب کی مثال")
                    : t("YOUR PROMPT", "آپ کا پرامپٹ")}
                  <span className="step-count">0{step + 1} / 03</span>
                </div>
                <h3>{demoStages[step].title[lang]}</h3>
                <div className="prompt-text">
                  {demoStages[step].prompt[lang]}
                </div>
                <div className="prompt-explanation">
                  <Sparkles size={18} />
                  <p>{demoStages[step].note[lang]}</p>
                </div>
              </div>
              <div className="panel-controls">
                <button
                  className="text-button"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={17} />
                  {t("Previous", "پچھلا")}
                </button>
                <button
                  className="button small"
                  onClick={() => setStep((step + 1) % 3)}
                >
                  {step === 2
                    ? t("Try again", "دوبارہ آزمائیں")
                    : t("Next step", "اگلا مرحلہ")}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="tools" className="section section-tinted">
          <div className="shell reveal">
            <div className="section-top">
              <span className="eyebrow">
                04 — {t("YOUR PRACTICAL AI TOOLKIT", "آپ کے عملی اے آئی ٹولز")}
              </span>
              <span className="section-index">TOOL EXPLORER</span>
            </div>
            <div className="split-heading">
              <h2>
                {t("Find the Right AI Tool", "درست اے آئی ٹول تلاش کریں")}
                <br />
                <span className="muted">
                  {t("for Every Task.", "ہر کام کے لیے۔")}
                </span>
              </h2>
              <p>
                {t(
                  "Find the right AI tool for every task. A curated starting point, with links straight to the source.",
                  "ہر کام کے لیے درست اے آئی ٹول تلاش کریں۔ منتخب وسائل سے آغاز کریں اور براہِ راست اصل ویب سائٹس پر جائیں۔",
                )}
              </p>
            </div>
            <div
              className="filters tool-filters"
              aria-label={t("Filter AI tools", "اے آئی ٹولز منتخب کریں")}
            >
              {["all", ...toolCategories].map((cat) => (
                <button
                  key={cat}
                  aria-pressed={toolFilter === cat}
                  onClick={() => setToolFilter(cat)}
                >
                  {cat === "all"
                    ? t("All tools", "تمام ٹولز")
                    : lang === "ur"
                      ? categoryUr[cat]
                      : cat}
                </button>
              ))}
            </div>
            <label className="search-label">
              {t("Search tools", "ٹولز تلاش کریں")}
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Search by name…", "نام سے تلاش کریں…")}
              />
            </label>
            <div className="tools-grid" aria-live="polite">
              {!tools.some(
                (tool) =>
                  (toolFilter === "all" || tool.category === toolFilter) &&
                  tool.name.toLowerCase().includes(query.toLowerCase()),
              ) && (
                <p className="empty-state">
                  {t(
                    "No matching tools. Try another search or category.",
                    "کوئی ٹول نہیں ملا۔ دوسرا نام یا زمرہ آزمائیں۔",
                  )}
                </p>
              )}
              {tools
                .filter(
                  (tool) =>
                    (toolFilter === "all" || tool.category === toolFilter) &&
                    tool.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map((tool) => (
                  <a
                    key={tool.name}
                    className="tool-card"
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tool.name} — ${t("opens official website in a new tab", "اصل ویب سائٹ نئے ٹیب میں کھولیں")}`}
                  >
                    <div className="tool-icon" dir="ltr">
                      {tool.initials}
                    </div>
                    <div>
                      <span className="tool-category">
                        {lang === "ur"
                          ? categoryUr[tool.category]
                          : tool.category}
                      </span>
                      <h3 dir="ltr">{tool.name}</h3>
                      <p>{tool.description[lang]}</p>
                    </div>
                    <ArrowUpRight size={19} />
                  </a>
                ))}
            </div>
            <p className="section-note">
              {t(
                "A manually curated directory. Tool features and availability may change; check each provider’s current terms.",
                "یہ دستی طور پر منتخب فہرست ہے۔ خصوصیات اور دستیابی بدل سکتی ہیں؛ ہر فراہم کنندہ کی تازہ شرائط دیکھیں۔",
              )}
            </p>
          </div>
        </section>
        <section id="projects" className="section shell reveal">
          <div className="section-top">
            <span className="eyebrow">
              05 — {t("MAKE SOMETHING REAL", "کچھ عملی بنائیں")}
            </span>
            <span className="section-index">PROJECT PLAYGROUND</span>
          </div>
          <div className="split-heading">
            <h2>
              {t("Small Skills.", "چھوٹی مہارتیں۔")}
              <br />
              <span className="muted">
                {t("Real Possibilities.", "حقیقی امکانات۔")}
              </span>
            </h2>
            <p>
              {t(
                "Put your curiosity to work. These educational project examples give your next idea a place to start.",
                "اپنے تجسس کو کام میں لائیں۔ یہ تعلیمی پروجیکٹ مثالیں آپ کے اگلے خیال کا نقطۂ آغاز ہیں۔",
              )}
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <article className="project-card" key={project.art}>
                <div
                  className={`project-art project-${project.art}`}
                  aria-hidden="true"
                >
                  <span className="project-tag">
                    {t("CONCEPT PREVIEW", "تصوراتی پیش منظر")}
                  </span>
                  {i === 0 ? (
                    <div className="mock-browser">
                      <div>
                        ● ● ●<span>your-next-idea.site</span>
                      </div>
                      <section>
                        <small>MADE OF POSSIBILITIES</small>
                        <strong>
                          Ideas deserve
                          <br />a place to live.
                        </strong>
                        <span className="mock-button">
                          Explore the possibilities ↗
                        </span>
                        <div className="mock-shape" />
                      </section>
                    </div>
                  ) : i === 1 ? (
                    <div className="mock-ad">
                      <small>THE EVERYDAY, REIMAGINED.</small>
                      <strong>
                        Make
                        <br />a little
                        <br />
                        <em>wonder.</em>
                      </strong>
                      <div className="ad-sphere" />
                    </div>
                  ) : i === 2 ? (
                    <div className="mock-workflow">
                      <span>01 &nbsp; IDEATE</span>
                      <span>↓</span>
                      <span>02 &nbsp; CREATE</span>
                      <span>↓</span>
                      <span>03 &nbsp; REVIEW</span>
                    </div>
                  ) : (
                    <div className="mock-lesson">
                      <BookOpen size={43} strokeWidth={1} />
                      <span>
                        ONE IDEA.
                        <br />
                        <strong>A NEW PERSPECTIVE.</strong>
                      </span>
                      <div>UNDERSTAND → PRACTICE → REFLECT</div>
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <span className="course-meta">
                    {t("EDUCATIONAL EXAMPLE", "تعلیمی مثال")} · 0{i + 1}
                  </span>
                  <h3>{project.title[lang]}</h3>
                  <p>{project.goal[lang]}</p>
                  <span className="project-tools" dir="ltr">
                    {project.tools}
                  </span>
                  <button
                    className="text-button"
                    onClick={() =>
                      setModal({
                        title: project.title[lang],
                        content: (
                          <>
                            <p>{project.goal[lang]}</p>
                            <p className="guide-label">
                              {t("Suggested tools", "تجویز کردہ ٹولز")}:{" "}
                              <bdi>{project.tools}</bdi>
                            </p>
                            <ol className="guide-steps">
                              {project.steps.map((s, j) => (
                                <li key={j}>{s[lang]}</li>
                              ))}
                            </ol>
                            <p className="notice">
                              {t(
                                "An educational project guide, not a verified student outcome. The visual is a concept placeholder. Review all generated content before publishing.",
                                "یہ تعلیمی رہنمائی ہے، کسی طالب علم کی تصدیق شدہ کامیابی نہیں۔ تصویر ایک عارضی تصور ہے۔ اشاعت سے پہلے تیار کردہ مواد کا جائزہ لیں۔",
                              )}
                            </p>
                          </>
                        ),
                      })
                    }
                  >
                    {t("Read the project guide", "پروجیکٹ کی رہنمائی پڑھیں")}
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="section about-section section-tinted">
          <div className="shell about-grid reveal">
            <div>
              <span className="eyebrow">
                06 — {t("A LITTLE ABOUT US", "ہمارا مختصر تعارف")}
              </span>
              <h2>
                {t("Making AI Simple", "اے آئی کو سب کے لیے")}
                <br />
                <span className="gradient-text">
                  {t("for Everyone.", "آسان بنانا۔")}
                </span>
              </h2>
              <p>
                {t(
                  "AI Skills Academy makes AI simple, practical, and useful through approachable explanations, hands-on examples, actionable prompts, and practical workflows.",
                  "اے آئی اسکلز اکیڈمی آسان وضاحتوں، عملی مثالوں، مفید پرامپٹس اور قابلِ عمل طریقوں سے اے آئی کو سادہ اور مفید بناتی ہے۔",
                )}
              </p>
              <button className="text-button" onClick={social}>
                {t(
                  "Meet your learning community",
                  "اپنی تعلیمی کمیونٹی سے ملیں",
                )}
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="values">
              {[
                [
                  Compass,
                  t("Clarity over complexity", "پیچیدگی کے بجائے وضاحت"),
                  t(
                    "Simple explanations. No unnecessary jargon.",
                    "آسان وضاحتیں۔ غیر ضروری اصطلاحات سے پاک۔",
                  ),
                ],
                [
                  Command,
                  t("Practice over passive learning", "عملی مشق سے سیکھنا"),
                  t(
                    "Useful prompts and hands-on examples.",
                    "مفید پرامپٹس اور عملی مثالیں۔",
                  ),
                ],
                [
                  Globe2,
                  t("A starting point for everyone", "ہر ایک کے لیے آغاز"),
                  t(
                    "Approachable learning in English and Urdu.",
                    "انگریزی اور اردو میں آسان تعلیم۔",
                  ),
                ],
              ].map(([Icon, title, desc], i) => {
                const I = Icon as typeof Compass;
                return (
                  <div key={i}>
                    <span>
                      <I size={23} strokeWidth={1.4} />
                    </span>
                    <div>
                      <h3>{title as string}</h3>
                      <p>{desc as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="start" className="final-section shell reveal">
          <span className="eyebrow">
            <span className="live-dot" />
            {t("CURIOSITY IS ALL YOU NEED", "آپ کو بس تجسس چاہیے")}
          </span>
          <h2>
            {t("Start Building Your", "اپنا اے آئی مستقبل")}
            <br />
            <span className="gradient-text">
              {t("AI Future Today.", "آج ہی بنانا شروع کریں۔")}
            </span>
          </h2>
          <p>
            {t(
              "One prompt. One project. One new possibility at a time.",
              "ایک پرامپٹ۔ ایک پروجیکٹ۔ ہر بار ایک نیا امکان۔",
            )}
          </p>
          <div className="hero-buttons">
            <a className="button" href="#demo">
              {t("Explore Free Lessons", "مفت اسباق دیکھیں")}
              <ArrowUpRight size={18} />
            </a>
            <button className="button ghost" onClick={social}>
              {t(
                "Follow AI Skills Academy",
                "اے آئی اسکلز اکیڈمی کو فالو کریں",
              )}
              <ArrowUpRight size={17} />
            </button>
          </div>
          <p className="section-note">
            {t(
              "Start with our free three-step prompt lesson above. More lessons are planned.",
              "اوپر موجود تین مراحل کے مفت پرامپٹ سبق سے شروع کریں۔ مزید اسباق منصوبہ بندی میں ہیں۔",
            )}
          </p>
        </section>
      </main>
      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div>
              <a className="footer-brand" href="#home">
                AI SKILLS ACADEMY<span>.</span>
              </a>
              <p>
                {t(
                  "Learn AI. Work Smarter. Grow Faster.",
                  "اے آئی سیکھیں۔ بہتر کام کریں۔ تیزی سے آگے بڑھیں۔",
                )}
              </p>
            </div>
            <nav aria-label={t("Footer navigation", "آخری نیویگیشن")}>
              {[
                ["home", t("Home", "ہوم")],
                ["tracks", t("Courses", "کورسز")],
                ["tools", t("AI Tools", "اے آئی ٹولز")],
                ["projects", t("Projects", "پروجیکٹس")],
                ["about", t("About", "تعارف")],
              ].map(([id, label]) => (
                <a href={`#${id}`} key={id}>
                  {label}
                </a>
              ))}
              <button
                onClick={() =>
                  setModal({
                    title: t("Contact the Academy", "اکیڈمی سے رابطہ"),
                    content: site.contactEmail ? (
                      <a href={`mailto:${site.contactEmail}`}>
                        {site.contactEmail}
                      </a>
                    ) : (
                      <p>
                        {t(
                          "Development placeholder: a verified contact email has not been supplied. Contact details will appear here once configured. No form submissions are collected.",
                          "ترقیاتی عارضی جگہ: تصدیق شدہ ای میل فراہم نہیں کی گئی۔ ترتیب کے بعد رابطے کی معلومات یہاں ظاہر ہوں گی۔ کوئی فارم جمع نہیں کیا جاتا۔",
                        )}
                      </p>
                    ),
                  })
                }
              >
                {t("Contact", "رابطہ")}
              </button>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} AI Skills Academy</span>
            <div>
              <button onClick={social}>
                Facebook <ArrowUpRight size={12} />
              </button>
              <button onClick={social}>
                Instagram <ArrowUpRight size={12} />
              </button>
              <button
                onClick={() =>
                  setModal({
                    title: t(
                      "Privacy — development preview",
                      "رازداری — ترقیاتی پیش منظر",
                    ),
                    content: (
                      <p>
                        {t(
                          "This frontend does not include accounts, analytics, forms, or a backend. Language selection stays in memory for this visit. External links open third-party sites with their own policies. A production privacy policy must reflect the deployed hosting and services before launch.",
                          "اس فرنٹ اینڈ میں اکاؤنٹس، تجزیاتی ٹولز، فارم یا بیک اینڈ شامل نہیں۔ زبان کا انتخاب اس دورے تک محدود ہے۔ بیرونی ویب سائٹس کی اپنی پالیسیاں ہیں۔ اشاعت سے پہلے میزبانی اور خدمات کے مطابق رازداری کی پالیسی تیار کریں۔",
                        )}
                      </p>
                    ),
                  })
                }
              >
                {t("Privacy", "رازداری")}
              </button>
              <button
                onClick={() =>
                  setModal({
                    title: t(
                      "Terms — development preview",
                      "شرائط — ترقیاتی پیش منظر",
                    ),
                    content: (
                      <p>
                        {t(
                          "Examples are educational and should be reviewed for accuracy and suitability. Planned tracks are not open for enrollment. Third-party tools are governed by their providers’ terms. Publish reviewed Academy terms before offering accounts, paid courses, or other services.",
                          "مثالیں تعلیمی ہیں؛ ان کی درستگی اور موزونیت کا جائزہ لیں۔ منصوبہ بندی والے کورسز میں داخلے دستیاب نہیں۔ بیرونی ٹولز پر ان کے فراہم کنندگان کی شرائط لاگو ہیں۔ دیگر خدمات سے پہلے اکیڈمی کی نظرثانی شدہ شرائط شائع کریں۔",
                        )}
                      </p>
                    ),
                  })
                }
              >
                {t("Terms", "شرائط")}
              </button>
            </div>
          </div>
        </div>
      </footer>
      {modal && <Dialog modal={modal} close={() => setModal(null)} />}
    </>
  );
}
