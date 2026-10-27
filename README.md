# AI Skills Academy

A responsive bilingual education frontend built with React, Vite, TypeScript, React Three Fiber, Drei, and procedural Three.js geometry. No backend, accounts, live AI API, or enrollment is implied.

## Local development

Use Node.js 22.12+ (validated with Node 24) and npm.

```sh
cd /workspace/AI-Skills
npm ci --cache /tmp/ai-skills-npm-cache
npm run dev -- --port 5173
```

For a checkout elsewhere, change the working directory accordingly. Each cloud task already has an isolated checkout; use it directly without creating a worktree unless requested.

```sh
npm run build       # TypeScript and production bundle
npm test            # camera boundaries and content integrity
npm run test:e2e    # Chromium interactions, fallback, six widths, EN/Urdu
npm run preview -- --port 4173
```

Browser tests default to `/usr/bin/chromium` in this cloud environment. On another machine, install Chromium with `npx playwright install chromium`, then set `CHROMIUM_PATH` to its executable. Test screenshots and reports are ignored. The test server starts automatically. Browsers need their normal OS libraries.

## Project map

- `src/App.tsx`: semantic sections, navigation, filters, prompt lesson, accessible dialogs, language switching.
- `src/data.ts`: typed English/Urdu content dictionaries, planned tracks, curated tools, and educational project guides.
- `src/config.ts`: verified destination configuration, motion budgets, and bounded scroll camera keyframes.
- `src/Visual.tsx`: persistent scene container, lazy loading, error boundary, static SVG fallback, reduced motion and tab visibility.
- `src/Scene.tsx`: procedural sphere, orbit rings, nodes, connecting lines, four-cluster transformation, pointer response.
- `src/styles.css`: responsive styles, locally served fonts, RTL and reduced-motion styles.
- `tests/`: content/camera tests and end-to-end browser checks.

## Content and launch configuration

The original Academy logo and verified social/contact URLs were not supplied. The temporary text wordmark is labeled. Configure `site.logoUrl`, `site.facebook`, `site.instagram`, and `site.contactEmail` in `src/config.ts` with verified values. Null social/contact destinations open explanatory notices instead of broken links. The favicon is a text placeholder too.

All five course records are `planned`, with `lessonCount: null`. Their links go to related examples, never fake enrollment. The three-stage prompt lab is one free, prewritten lesson. Project previews are styled concept placeholders and every project opens a real short educational guide. Tool links go to providers' official websites; this directory is manually maintained. Check provider information before launch.

The frontend has no enabled data-collection forms, tracking, accounts, or CMS. Privacy and terms dialogs explain this development scope; replace them with reviewed policies for the actual production services before launch. There are no invented instructors, learner counts, credentials, or testimonials.

English is the default. Content dictionaries contain Urdu prose using “اے آئی”; proper product names remain in Latin script. Switching language changes `lang` and `dir`; URLs, tool names, and technical labels use bidirectional isolation where needed. Language state is in memory only. Additional Urdu editorial review is recommended before public launch.

## Motion and performance

The persistent core uses native scroll, a passive scroll listener coalesced with requestAnimationFrame, and bounded interpolation at 0/16/27/43/56/68/80/90/100%. No scroll hijacking or GSAP dependency is needed. `sceneAt()` is covered by boundary tests. The core moves into four clusters at the Why AI boundary and reunifies for the final section. Desktop text uses the left safe region in the hero; subsequent cards have opaque surfaces and scene opacity is reduced. Mobile confines the scene to the hero below text.

Node counts, rotation, pointer strength, and DPR are configurable. Mobile uses fewer nodes and lower tessellation. The scene stops its continuous render loop in hidden tabs. Reduced-motion and data-saving preferences show the static SVG fallback. Unsupported WebGL, lost contexts, or scene-loading errors also retain usable content and a static sphere. Fonts are self-hosted. Three.js is a separate lazy chunk; the main text and controls do not depend on WebGL. The 3D runtime remains a sizable download, so measure real-device performance before promising a frame rate.

### Optional GLB/GLTF integration

No external model is needed. To add an approved model, put a compressed GLB under `public/models/`, load it with Drei `useGLTF('/models/approved-model.glb')` inside `src/Scene.tsx`, and retain the current procedural core as a Suspense/error fallback. Normalize scale to the current ~2-unit radius, retain the camera frames and content-safe placement, and test its mobile memory cost. Do not preload large assets on data-saving devices. Validate asset licensing and serve required decoder assets locally if compression is used.

## Production deployment

1. Supply the original logo and verified destinations, review translations and policies, and confirm which educational content is approved for release.
2. Set the real production origin and generate sitemap assets:
   ```sh
   SITE_URL=https://your-verified-domain.example npm run sitemap
   ```
   This example domain is illustrative only; replace it. No fake production domain is baked into the build. The site is one page, so the sitemap contains its root, not fragment URLs. Add the canonical link, `og:url`, and an approved social sharing image in `index.html` after the origin and image exist.
3. Run `npm ci`, `npm test`, `npm run test:e2e`, and `npm run build`.
4. Deploy `dist/` to a static host such as Cloudflare Pages, Netlify, or Vercel. Build command: `npm run build`; output: `dist`; Node: 22.12+.
5. Serve over HTTPS. Cache hashed `/assets/` files long-term and serve `index.html` with revalidation. There are no server routes; navigation uses native section anchors.
6. Check production links, keyboard navigation, WebGL fallback, RTL, and mobile Core Web Vitals. No performance score or deployment is claimed by local validation.

For a subdirectory deployment, set Vite's `base` and adjust public asset paths before building. A future authenticated CMS, enrollment system, analytics, or AI integration needs a separately designed backend and privacy/security review.
