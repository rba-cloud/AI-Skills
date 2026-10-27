export type Locale = "en" | "ur";
export type Copy = { en: string; ur: string };
export const copy = (en: string, ur: string): Copy => ({ en, ur });
export type Course = {
  id: string;
  title: Copy;
  description: Copy;
  category: "basics" | "work" | "creative";
  difficulty: Copy;
  lessonCount: number | null;
  status: "planned";
  destination: string;
};
export const courses: Course[] = [
  {
    id: "chatgpt",
    title: copy("ChatGPT Essentials", "ChatGPT کی بنیادی مہارتیں"),
    description: copy(
      "Turn a blank chat into a useful everyday assistant.",
      "روزمرہ کاموں کے لیے چیٹ کو ایک مفید معاون بنائیں۔",
    ),
    category: "basics",
    difficulty: copy("Beginner", "ابتدائی"),
    lessonCount: null,
    status: "planned",
    destination: "#demo",
  },
  {
    id: "prompts",
    title: copy("Prompt Engineering", "مؤثر پرامپٹ لکھنا"),
    description: copy(
      "Ask better questions. Get more useful answers.",
      "بہتر سوالات پوچھیں اور زیادہ مفید جوابات حاصل کریں۔",
    ),
    category: "basics",
    difficulty: copy("Beginner", "ابتدائی"),
    lessonCount: null,
    status: "planned",
    destination: "#demo",
  },
  {
    id: "productivity",
    title: copy("AI Productivity", "اے آئی سے بہتر کارکردگی"),
    description: copy(
      "Make more room for the work that matters.",
      "اہم کاموں کے لیے زیادہ وقت نکالیں۔",
    ),
    category: "work",
    difficulty: copy("Beginner", "ابتدائی"),
    lessonCount: null,
    status: "planned",
    destination: "#demo",
  },
  {
    id: "content",
    title: copy("AI Content Creation", "اے آئی سے مواد بنانا"),
    description: copy(
      "Bring your ideas to life with a creative workflow.",
      "تخلیقی طریقۂ کار سے اپنے خیالات کو عملی شکل دیں۔",
    ),
    category: "creative",
    difficulty: copy("Beginner", "ابتدائی"),
    lessonCount: null,
    status: "planned",
    destination: "#projects",
  },
  {
    id: "websites",
    title: copy("AI Website Building", "اے آئی سے ویب سائٹ بنانا"),
    description: copy(
      "Go from an idea to your first working website.",
      "ایک خیال سے اپنی پہلی فعال ویب سائٹ تک پہنچیں۔",
    ),
    category: "creative",
    difficulty: copy("Intermediate", "درمیانی"),
    lessonCount: null,
    status: "planned",
    destination: "#projects",
  },
];
export const toolCategories = [
  "Writing",
  "Research",
  "Image Creation",
  "Video Production",
  "Voice",
  "Coding",
  "Productivity",
] as const;
export const categoryUr: Record<string, string> = {
  Writing: "تحریر",
  Research: "تحقیق",
  "Image Creation": "تصاویر",
  "Video Production": "ویڈیو",
  Voice: "آواز",
  Coding: "کوڈنگ",
  Productivity: "کارکردگی",
};
export const tools = [
  {
    name: "ChatGPT",
    category: "Writing",
    initials: "Cg",
    description: copy(
      "Explore ideas and develop a first draft.",
      "خیالات دریافت کریں اور ابتدائی مسودہ تیار کریں۔",
    ),
    url: "https://chatgpt.com/",
  },
  {
    name: "Perplexity",
    category: "Research",
    initials: "Px",
    description: copy(
      "Explore questions with source-linked answers.",
      "حوالوں کے ساتھ سوالات کے جوابات تلاش کریں۔",
    ),
    url: "https://www.perplexity.ai/",
  },
  {
    name: "Adobe Firefly",
    category: "Image Creation",
    initials: "Af",
    description: copy(
      "Experiment with text-to-image creation.",
      "تحریر سے تصاویر بنانے کا تجربہ کریں۔",
    ),
    url: "https://firefly.adobe.com/",
  },
  {
    name: "Runway",
    category: "Video Production",
    initials: "Rw",
    description: copy(
      "Explore AI-assisted video creation.",
      "اے آئی کی مدد سے ویڈیو بنانا سیکھیں۔",
    ),
    url: "https://runwayml.com/",
  },
  {
    name: "ElevenLabs",
    category: "Voice",
    initials: "El",
    description: copy(
      "Explore text-to-speech audio tools.",
      "تحریر کو آواز میں بدلنے کے ٹولز دریافت کریں۔",
    ),
    url: "https://elevenlabs.io/",
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    initials: "Gc",
    description: copy(
      "Explore assistance inside your coding workflow.",
      "کوڈ لکھنے کے دوران معاونت دریافت کریں۔",
    ),
    url: "https://github.com/features/copilot",
  },
  {
    name: "Notion AI",
    category: "Productivity",
    initials: "Na",
    description: copy(
      "Work with writing and information in Notion.",
      "Notion میں تحریر اور معلومات پر کام کریں۔",
    ),
    url: "https://www.notion.com/product/ai",
  },
];
export const projects = [
  {
    title: copy(
      "Your idea. Your first website.",
      "آپ کا خیال۔ آپ کی پہلی ویب سائٹ۔",
    ),
    goal: copy(
      "Build a professional one-page website with AI assistance.",
      "اے آئی کی مدد سے ایک پیشہ ورانہ یک صفحاتی ویب سائٹ بنائیں۔",
    ),
    tools: "ChatGPT · GitHub Copilot",
    art: "website",
    steps: [
      copy(
        "Define your audience, page sections, and one clear call to action.",
        "اپنے قارئین، صفحے کے حصوں اور ایک واضح مقصد کا تعین کریں۔",
      ),
      copy(
        "Ask for a semantic HTML and CSS draft. Review every generated file.",
        "HTML اور CSS کا مسودہ مانگیں اور ہر فائل کا جائزہ لیں۔",
      ),
      copy(
        "Replace placeholders, test keyboard navigation and mobile layouts, then deploy.",
        "عارضی مواد بدلیں، کی بورڈ اور موبائل لے آؤٹ آزمائیں، پھر شائع کریں۔",
      ),
    ],
  },
  {
    title: copy(
      "Make an idea worth noticing.",
      "اپنے خیال کو توجہ کے قابل بنائیں۔",
    ),
    goal: copy(
      "Create a concept advertisement for a fictional product.",
      "ایک فرضی پروڈکٹ کے لیے اشتہار کا تصور تیار کریں۔",
    ),
    tools: "Adobe Firefly · ChatGPT",
    art: "ad",
    steps: [
      copy(
        "Choose a fictional product and write a truthful creative brief.",
        "فرضی پروڈکٹ منتخب کریں اور واضح تخلیقی ہدایات لکھیں۔",
      ),
      copy(
        "Draft headline options and generate a supporting visual.",
        "سرخیوں کے مسودے اور متعلقہ تصویر تیار کریں۔",
      ),
      copy(
        "Check usage rights, label synthetic content where needed, and review claims.",
        "استعمال کے حقوق دیکھیں، ضرورت پر مصنوعی مواد کی نشاندہی کریں اور دعوے جانچیں۔",
      ),
    ],
  },
  {
    title: copy("A smarter content workflow.", "مواد بنانے کا بہتر طریقہ۔"),
    goal: copy(
      "Plan a reusable weekly business content process.",
      "کاروباری مواد کے لیے ہفتہ وار قابلِ تکرار طریقہ بنائیں۔",
    ),
    tools: "Notion AI · ChatGPT",
    art: "workflow",
    steps: [
      copy(
        "List your audience questions without entering private customer data.",
        "نجی معلومات شامل کیے بغیر صارفین کے سوالات لکھیں۔",
      ),
      copy(
        "Group ideas into themes and draft a weekly calendar.",
        "خیالات کو موضوعات میں بانٹیں اور ہفتہ وار منصوبہ بنائیں۔",
      ),
      copy(
        "Add a human review step for accuracy, tone, and publication.",
        "درستگی، لہجے اور اشاعت کے لیے انسانی جائزہ شامل کریں۔",
      ),
    ],
  },
  {
    title: copy("Turn a topic into a lesson.", "ایک موضوع کو سبق میں بدلیں۔"),
    goal: copy(
      "Create engaging educational content for a beginner.",
      "ابتدائی سیکھنے والوں کے لیے دلچسپ تعلیمی مواد بنائیں۔",
    ),
    tools: "ChatGPT · Adobe Firefly",
    art: "lesson",
    steps: [
      copy(
        "Pick one learning objective and specify the learner’s level.",
        "ایک تعلیمی مقصد اور طالب علم کی سطح منتخب کریں۔",
      ),
      copy(
        "Draft an explanation, a worked example, and a practice question.",
        "وضاحت، حل شدہ مثال اور مشق کا سوال تیار کریں۔",
      ),
      copy(
        "Verify facts and accessibility; test the lesson with a real learner.",
        "حقائق اور رسائی جانچیں؛ کسی طالب علم کے ساتھ سبق آزمائیں۔",
      ),
    ],
  },
];
export const demoStages = [
  {
    label: copy("A vague prompt", "غیر واضح پرامپٹ"),
    title: copy(
      "A little context goes a long way.",
      "تھوڑی سی وضاحت بہت مدد کرتی ہے۔",
    ),
    prompt: copy("Help me study.", "پڑھائی میں میری مدد کریں۔"),
    note: copy(
      "The goal is unclear. The AI has to guess the subject, your level, and the kind of help you need.",
      "مقصد واضح نہیں۔ اے آئی کو مضمون، آپ کی سطح اور مطلوبہ مدد کا اندازہ لگانا پڑتا ہے۔",
    ),
  },
  {
    label: copy("An improved prompt", "بہتر پرامپٹ"),
    title: copy("Give your prompt a purpose.", "اپنے پرامپٹ کو ایک مقصد دیں۔"),
    prompt: copy(
      "Act as a patient biology tutor. Explain photosynthesis to a grade 8 student in 3 simple steps. Use an everyday analogy, then ask one practice question. Keep it under 150 words.",
      "ایک صابر حیاتیات کے استاد کی طرح جواب دیں۔ آٹھویں جماعت کے طالب علم کو ضیائی تالیف تین آسان مراحل میں سمجھائیں۔ روزمرہ کی مثال دیں، پھر مشق کا ایک سوال پوچھیں۔ جواب ۱۵۰ الفاظ سے کم رکھیں۔",
    ),
    note: copy(
      "Role + audience + task + format. These details give the response direction and make it easier to check.",
      "کردار + قارئین + کام + انداز۔ یہ تفصیلات جواب کو سمت دیتی ہیں اور اسے جانچنا آسان بناتی ہیں۔",
    ),
  },
  {
    label: copy("A sample result", "جواب کی مثال"),
    title: copy(
      "Now you have something to work with.",
      "اب آپ کے پاس ایک مفید آغاز ہے۔",
    ),
    prompt: copy(
      "Think of a leaf as a tiny solar-powered kitchen.\n\n1. Leaves capture sunlight using chlorophyll.\n2. The plant takes in water through its roots and carbon dioxide through its leaves.\n3. Using light energy, it turns these into sugar for energy and growth, releasing oxygen.\n\nYour turn: Why does a plant need light?",
      "پتے کو شمسی توانائی سے چلنے والا چھوٹا باورچی خانہ سمجھیں۔\n\n۱۔ پتے کلوروفل کی مدد سے سورج کی روشنی جذب کرتے ہیں۔\n۲۔ پودا جڑوں سے پانی اور پتوں سے کاربن ڈائی آکسائیڈ لیتا ہے۔\n۳۔ روشنی کی توانائی سے انہیں شکر میں بدلتا ہے اور آکسیجن خارج کرتا ہے۔\n\nآپ کی باری: پودے کو روشنی کی ضرورت کیوں ہے؟",
    ),
    note: copy(
      "This is a prewritten illustration, not a live AI response. Always verify AI-generated facts against reliable sources.",
      "یہ پہلے سے لکھی ہوئی مثال ہے، اے آئی کا براہِ راست جواب نہیں۔ اے آئی کی فراہم کردہ معلومات معتبر ذرائع سے ضرور جانچیں۔",
    ),
  },
];
