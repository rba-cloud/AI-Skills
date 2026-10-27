export type AssetStatus = "REAL" | "DEMO" | "PLACEHOLDER" | "COMING_SOON";

export type NavItem = {
  label: string;
  href: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  audience: string;
  description: string;
  practice: string;
  difficulty: "Beginner" | "Beginner–intermediate";
  state: "Available" | "Coming Soon" | "In Development";
  resourceHref?: string;
};

export type Tool = {
  slug: string;
  name: string;
  officialURL: string;
  category: string;
  description: string;
  bestFor: string[];
  audience: string[];
  supportedTasks: string[];
  freePaidStatus: string;
  strengths: string[];
  limitations: string[];
  exampleWorkflow: string[];
  tutorialURL: string | null;
  lastReviewedAt: string | null;
  isPublished: boolean;
  status: AssetStatus;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  objective: string;
  tools: string[];
  steps: { title: string; description: string }[];
  result: string;
  problems: string[];
  corrections: string[];
  humanDecisions: string[];
  lessons: string[];
  status: AssetStatus;
  published: boolean;
};

export type Resource = {
  slug: string;
  title: string;
  type: string;
  description: string;
  readTime: string;
  status: AssetStatus;
  published: boolean;
  takeaways: string[];
};

export const siteConfig = {
  name: "AI Skills Academy",
  tagline: "Learn AI by Actually Using It.",
  description:
    "Practical AI education for work, learning, creativity, and business — built for learners in Pakistan and beyond.",
  logoPath: null,
  locale: "en",
  futureLocales: ["en", "ur"],
  theme: {
    canvas: "#FAFBFD",
    white: "#FFFFFF",
    ink: "#06152E",
    brand: "#1363DF",
    cyan: "#28DFFF",
    warm: "#F4B544",
  },
  primaryCTA: { label: "Start Learning", href: "/learn" },
  secondaryCTA: { label: "Explore AI Tools", href: "/tools" },
  contact: {
    email: null,
    whatsapp: null,
  },
  socials: {
    facebook: null,
    instagram: null,
    tiktok: null,
    youtube: null,
  },
  registration: {
    mode: "demo" as const,
    endpoint: null,
    note: "The interest form is in demonstration mode until a secure submission service is connected.",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Learn AI", href: "/learn" },
  { label: "AI Tools", href: "/tools" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const learningPaths: LearningPath[] = [
  {
    slug: "getting-started",
    title: "Getting Started With AI",
    audience: "Anyone who wants a clear, jargon-free introduction",
    description: "Understand what modern AI can and cannot do, then learn a safe process for trying it yourself.",
    practice: "Break a real task into instructions, review the response, and improve it.",
    difficulty: "Beginner",
    state: "Available",
    resourceHref: "/resources/first-useful-ai-workflow",
  },
  {
    slug: "better-prompting",
    title: "Better Prompting",
    audience: "Learners who want more useful, reliable responses",
    description: "Give clear context, constraints, examples, and evaluation criteria without relying on prompt tricks.",
    practice: "Rewrite a vague request as a testable brief and compare the results.",
    difficulty: "Beginner",
    state: "Available",
    resourceHref: "/resources/practical-prompt-checklist",
  },
  {
    slug: "ai-for-students",
    title: "AI for Students",
    audience: "Students who want support without outsourcing their learning",
    description: "Use AI for explanations, study planning, practice questions, and source-aware research.",
    practice: "Create a study guide and verify its claims against course material.",
    difficulty: "Beginner",
    state: "In Development",
  },
  {
    slug: "ai-for-office-work",
    title: "AI for Office Work",
    audience: "Office workers and professionals",
    description: "Plan drafts, summarize approved material, structure reports, and improve everyday communication.",
    practice: "Turn a set of notes into a reviewed email and action list.",
    difficulty: "Beginner",
    state: "In Development",
  },
  {
    slug: "ai-for-research",
    title: "AI for Research",
    audience: "Students, teachers, and researchers",
    description: "Explore documents, frame questions, and build a verification habit for AI-assisted research.",
    practice: "Compare an AI summary with its cited source and mark unsupported statements.",
    difficulty: "Beginner–intermediate",
    state: "Coming Soon",
  },
  {
    slug: "ai-for-content",
    title: "AI for Content Creation",
    audience: "Creators, educators, and small teams",
    description: "Move from audience and idea to scripts, visuals, edits, and responsible publishing.",
    practice: "Create and critique a short content brief before producing anything.",
    difficulty: "Beginner",
    state: "In Development",
  },
  {
    slug: "ai-video",
    title: "AI Video Creation",
    audience: "Creators who want a structured production workflow",
    description: "Plan scenes, maintain visual continuity, generate clips, and assemble them with human review.",
    practice: "Build a shot list and continuity sheet for a 20-second concept.",
    difficulty: "Beginner–intermediate",
    state: "Coming Soon",
  },
  {
    slug: "websites-with-ai",
    title: "Build Websites With AI",
    audience: "Beginners, designers, and web developers",
    description: "Turn a clear brief into an accessible site through design, code generation, testing, and correction.",
    practice: "Create a one-page prototype, test it at mobile widths, and correct accessibility issues.",
    difficulty: "Beginner–intermediate",
    state: "In Development",
  },
  {
    slug: "productivity-automation",
    title: "Productivity & Automation",
    audience: "Professionals, freelancers, and business owners",
    description: "Identify repetitive work, choose appropriate tools, and retain human approval at important steps.",
    practice: "Map one recurring task before deciding whether automation is useful.",
    difficulty: "Beginner–intermediate",
    state: "Coming Soon",
  },
];

export const toolCategories = [
  "All",
  "Writing & Research",
  "Images & Design",
  "Video Creation",
  "Coding & Websites",
  "Productivity",
  "Business",
] as const;

export const tools: Tool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    officialURL: "https://chatgpt.com/",
    category: "Writing & Research",
    description: "A general-purpose AI assistant that can help explore ideas, draft material, explain concepts, and work through multi-step tasks.",
    bestFor: ["Idea development", "Drafting", "Explanations"],
    audience: ["Beginners", "Students", "Professionals", "Creators"],
    supportedTasks: ["Brainstorming", "Rewriting", "Planning", "Document discussion"],
    freePaidStatus: "Availability and plan limits can change; confirm on the official website.",
    strengths: ["Broad range of conversational tasks", "Useful for iterative instruction", "Can support step-by-step workflows"],
    limitations: ["Can produce incorrect information", "Outputs still require source checks and human judgment", "Capabilities vary by plan and mode"],
    exampleWorkflow: ["Define the outcome", "Provide relevant context", "Request a structured first draft", "Check facts and revise", "Approve the final version yourself"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    officialURL: "https://www.perplexity.ai/",
    category: "Writing & Research",
    description: "An AI-assisted search and research interface designed to answer questions with links to sources for further checking.",
    bestFor: ["Starting research", "Finding sources", "Topic exploration"],
    audience: ["Students", "Researchers", "Professionals"],
    supportedTasks: ["Source discovery", "Question exploration", "Research summaries"],
    freePaidStatus: "Availability and plan limits can change; confirm on the official website.",
    strengths: ["Surfaces source links", "Supports follow-up questions", "Useful for an initial research map"],
    limitations: ["Citations do not guarantee that a claim is supported", "Primary sources still need to be read", "Coverage and access can vary"],
    exampleWorkflow: ["Ask a focused research question", "Open the cited sources", "Compare claims with the original material", "Record verified findings", "Note remaining uncertainty"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
  {
    slug: "canva",
    name: "Canva",
    officialURL: "https://www.canva.com/",
    category: "Images & Design",
    description: "A visual design platform with AI-assisted features alongside templates and conventional editing tools.",
    bestFor: ["Presentations", "Social graphics", "Quick visual drafts"],
    audience: ["Beginners", "Teachers", "Creators", "Small businesses"],
    supportedTasks: ["Layout", "Presentation planning", "Visual editing"],
    freePaidStatus: "Features and plan access change over time; check the official website before choosing a workflow.",
    strengths: ["Approachable visual editor", "Combines manual and assisted workflows", "Supports common communication formats"],
    limitations: ["Template output can feel generic", "Generated visuals need rights and quality review", "Some features may be plan-dependent"],
    exampleWorkflow: ["Choose the communication goal", "Draft a visual hierarchy", "Create or adapt a layout", "Check readability and accuracy", "Export for the intended channel"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
  {
    slug: "runway",
    name: "Runway",
    officialURL: "https://runwayml.com/",
    category: "Video Creation",
    description: "A creative video platform that includes generative and AI-assisted production tools.",
    bestFor: ["Video experiments", "Concept shots", "Assisted editing"],
    audience: ["Creators", "Designers", "Video teams"],
    supportedTasks: ["Shot exploration", "Video generation", "Post-production experiments"],
    freePaidStatus: "Current models, credits, and plans should be confirmed on the official website.",
    strengths: ["Multiple creative video workflows", "Useful for visual prototyping", "Fits into a broader editing process"],
    limitations: ["Continuity can require repeated correction", "Generated footage needs editorial review", "Usage terms and costs should be checked per project"],
    exampleWorkflow: ["Write a shot goal", "Prepare a visual reference", "Generate short controlled options", "Review continuity and artifacts", "Edit selected clips in a complete timeline"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    officialURL: "https://github.com/features/copilot",
    category: "Coding & Websites",
    description: "An AI coding assistant that can help propose code, explain a codebase, and support development tasks inside supported tools.",
    bestFor: ["Code suggestions", "Development support", "Explaining code"],
    audience: ["Developers", "Technical learners"],
    supportedTasks: ["Drafting code", "Test ideas", "Code explanation", "Refactoring support"],
    freePaidStatus: "Eligibility, features, and plans can change; verify them on the official website.",
    strengths: ["Works close to a development workflow", "Can reduce repetitive drafting", "Supports iterative code conversations"],
    limitations: ["Suggestions can be insecure or incorrect", "Does not replace testing or review", "Repository context must be handled carefully"],
    exampleWorkflow: ["Describe a small testable change", "Inspect the proposed diff", "Run types and tests", "Review security and edge cases", "Accept only verified code"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    officialURL: "https://www.notion.com/product/ai",
    category: "Productivity",
    description: "AI-assisted features integrated into a workspace for notes, documents, and team knowledge.",
    bestFor: ["Working with notes", "Document drafts", "Workspace search"],
    audience: ["Professionals", "Teams", "Students"],
    supportedTasks: ["Summarizing", "Drafting", "Finding workspace information"],
    freePaidStatus: "Workspace requirements and plan access should be checked on the official website.",
    strengths: ["AI tools sit alongside working documents", "Useful for structured notes", "Can support recurring document workflows"],
    limitations: ["Output quality depends on source material", "Workspace permissions still matter", "Important summaries need verification"],
    exampleWorkflow: ["Organize trusted source notes", "Ask for a scoped summary", "Compare the summary to the source", "Correct omissions", "Share the reviewed document"],
    tutorialURL: null,
    lastReviewedAt: null,
    isPublished: true,
    status: "DEMO",
  },
];

export const projects: Project[] = [
  {
    slug: "building-a-website-with-ai",
    title: "Building a Website With AI",
    category: "Coding & Websites",
    summary: "A transparent case-study framework for moving from a brief to a tested website with an AI coding assistant.",
    objective: "Demonstrate the decisions and checks required to turn an idea into a usable, accessible website.",
    tools: ["AI coding assistant", "Browser developer tools", "Accessibility checks"],
    steps: [
      { title: "Idea", description: "Define the audience, the job the site must do, and the evidence it needs." },
      { title: "First result", description: "Build a small, content-complete version before adding visual effects." },
      { title: "Problems", description: "Inspect responsive layout, keyboard access, content accuracy, and performance." },
      { title: "Improved result", description: "Correct verified issues and document what still needs real content." },
    ],
    result: "Demo case-study structure only. An approved project and authentic screenshots are still needed.",
    problems: ["Real project evidence has not yet been supplied", "No before-and-after assets are available"],
    corrections: ["Keep demo visuals clearly labeled", "Replace this framework when an approved project is documented"],
    humanDecisions: ["Define the audience and success criteria", "Approve content and design", "Review accessibility and factual accuracy"],
    lessons: ["A precise brief improves generated work", "A working first version still needs testing", "Human approval remains the final step"],
    status: "DEMO",
    published: true,
  },
  {
    slug: "creating-videos-with-ai",
    title: "Creating Videos With AI",
    category: "Video Creation",
    summary: "A prepared case-study format for planning scenes, testing visual consistency, and assembling clips into a coherent edit.",
    objective: "Show how short generated clips can fit into a deliberate human-led production workflow.",
    tools: ["Storyboarding tools", "AI video tool", "Video editor"],
    steps: [
      { title: "Idea", description: "Write the story purpose, audience, tone, and visual constraints." },
      { title: "First result", description: "Test one representative shot before producing a complete sequence." },
      { title: "Problems", description: "Record continuity, motion, framing, and artifact issues honestly." },
      { title: "Improved result", description: "Revise prompts, select usable clips, and complete the edit manually." },
    ],
    result: "Coming soon. No finished production outcome is claimed.",
    problems: ["Authentic project footage has not yet been supplied"],
    corrections: ["Publish only after the complete process and permissions are documented"],
    humanDecisions: ["Direct the story", "Select takes", "Check rights and accuracy", "Approve the final edit"],
    lessons: ["Continuity needs planning", "Short tests reduce wasted effort", "Editing creates coherence"],
    status: "COMING_SOON",
    published: true,
  },
  {
    slug: "designing-with-ai",
    title: "Designing With AI",
    category: "Images & Design",
    summary: "A prepared experiment format for comparing an initial visual idea with a deliberately revised design.",
    objective: "Explain where AI can accelerate exploration and where design judgment is still essential.",
    tools: ["AI image tool", "Design editor", "Accessibility contrast checker"],
    steps: [
      { title: "Idea", description: "Translate a communication goal into a visual brief." },
      { title: "First result", description: "Generate a few focused directions instead of many random images." },
      { title: "Problems", description: "Review hierarchy, legibility, originality, accuracy, and fit for purpose." },
      { title: "Improved result", description: "Refine composition and typography in a design tool." },
    ],
    result: "Coming soon. Authentic comparison assets are required before publication as a completed case study.",
    problems: ["No approved before-and-after artwork is available"],
    corrections: ["Keep the current presentation conceptual", "Add provenance and rights notes with future assets"],
    humanDecisions: ["Set the concept", "Choose a direction", "Correct composition and type", "Approve usage"],
    lessons: ["More output is not the same as better output", "Typography needs careful manual control", "Context determines whether a design works"],
    status: "COMING_SOON",
    published: true,
  },
];

export const resources: Resource[] = [
  {
    slug: "first-useful-ai-workflow",
    title: "Your First Useful AI Workflow",
    type: "Beginner guide",
    description: "A simple, repeatable process for using an AI assistant without handing over your judgment.",
    readTime: "5 min",
    status: "REAL",
    published: true,
    takeaways: ["Start with a real outcome", "Give only the context you can safely share", "Review facts and assumptions", "Correct the work before using it"],
  },
  {
    slug: "practical-prompt-checklist",
    title: "A Practical Prompt Checklist",
    type: "Checklist",
    description: "Five questions to ask before and after you give an AI tool an instruction.",
    readTime: "4 min",
    status: "REAL",
    published: true,
    takeaways: ["Name the task", "Describe the audience", "Add useful constraints", "Request a clear format", "Define how you will judge the result"],
  },
  {
    slug: "human-review-loop",
    title: "The Human Review Loop",
    type: "Workflow template",
    description: "Use Plan → Instruct → Supervise → Evaluate → Correct → Approve for important AI-assisted work.",
    readTime: "6 min",
    status: "REAL",
    published: true,
    takeaways: ["Plan before prompting", "Watch the process", "Evaluate against a standard", "Keep final approval human"],
  },
  {
    slug: "choosing-an-ai-tool",
    title: "How to Choose an AI Tool",
    type: "Decision guide",
    description: "A compact framework for matching the tool to the task, risk, budget, and review effort.",
    readTime: "7 min",
    status: "COMING_SOON",
    published: false,
    takeaways: ["Define the job first", "Check data sensitivity", "Test a representative task", "Include review cost in your decision"],
  },
];

export const featuredCourse = {
  slug: "practical-ai-skills",
  title: "Practical AI Skills for Beginners",
  urduTitle: "اے آئی سیکھیں — آسان اردو میں، عملی مشقوں کے ساتھ",
  valueProposition: "Learn to use modern AI tools confidently through live Urdu instruction, guided exercises, and practical examples.",
  language: "Urdu",
  audience: "Pakistani learners with little or no previous experience using AI professionally.",
  prerequisites: ["No previous AI experience required", "Comfort using a web browser", "A laptop is recommended for practice"],
  format: {
    weeks: 4,
    sessions: 8,
    sessionLength: "Approximately 90 minutes",
    targetBatchSize: "12–15 learners",
    delivery: "Live online classes in Urdu",
    status: "Provisional planning details",
  },
  price: {
    amount: "PKR 3,999",
    label: "Proposed founding fee",
    isPublished: false,
  },
  enrollmentOpen: false,
  instructor: {
    name: null,
    bio: null,
    photo: null,
    status: "PLACEHOLDER" as AssetStatus,
  },
  inclusions: ["Live teaching", "Practical demonstrations", "Guided exercises", "Assignments", "Learning notes", "Mini project"],
  unconfirmedInclusions: ["Session recordings", "Certificate"],
  modules: [
    { number: "01", title: "Introduction to Practical AI", topics: ["What modern AI is", "AI assistants", "Strengths and limitations", "Common use cases", "Responsible use"] },
    { number: "02", title: "Effective Prompting", topics: ["Clear instructions", "Context", "Examples", "Iteration", "Evaluating outputs"] },
    { number: "03", title: "AI for Study and Research", topics: ["Explaining topics", "Working with documents", "Research assistance", "Checking sources"] },
    { number: "04", title: "Writing and Office Productivity", topics: ["Emails", "Summaries", "Reports", "Documents", "Everyday work"] },
    { number: "05", title: "Images and Presentations", topics: ["Visual prompting", "Useful illustrations", "Presentation planning", "Iteration and quality checking"] },
    { number: "06", title: "Content Creation", topics: ["Social media workflows", "Scripts", "Planning", "Editing assistance", "Responsible publishing"] },
    { number: "07", title: "Combining Tools Into Workflows", topics: ["Multi-step tasks", "Automation concepts", "Tool selection", "Human review"] },
    { number: "08", title: "Practical Final Project", topics: ["Project planning", "AI implementation", "Checking quality", "Presenting results", "Next learning steps"] },
  ],
  faqs: [
    { question: "Do I need previous AI experience?", answer: "No. The proposed course is designed for beginners." },
    { question: "Will the classes be in Urdu?", answer: "Yes. The proposed live instruction is planned in Urdu, with common technical terms explained clearly." },
    { question: "Do I need a laptop?", answer: "A laptop is recommended for completing practical exercises comfortably. Final device requirements will be confirmed before registration opens." },
    { question: "Are the sessions live?", answer: "The current plan is live online delivery. Dates and the class platform have not yet been confirmed." },
    { question: "Will practice exercises be included?", answer: "Guided exercises and assignments are part of the proposed course structure." },
    { question: "Will recordings be provided?", answer: "The recording policy has not been confirmed. It will be published before registration opens." },
    { question: "How do I pay?", answer: "Payment instructions are not yet available. No payment is requested through this website." },
    { question: "What happens if I miss a session?", answer: "The missed-session policy has not yet been confirmed." },
  ],
} as const;

export const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Learn AI", href: "/learn" },
      { label: "AI Tools", href: "/tools" },
      { label: "Projects", href: "/projects" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Live Training", href: "/training" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export const missingContent = [
  "Final logo file",
  "Official contact email",
  "WhatsApp number",
  "Instructor name, photo, and biography",
  "Final course fee and publication approval",
  "Confirmed batch dates and class schedule",
  "Recording, missed-session, and refund policies",
  "Payment destination",
  "Authentic project screenshots and videos",
  "Published tutorials",
  "Confirmed social profile URLs",
] as const;
