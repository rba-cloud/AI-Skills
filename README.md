# AI Skills Academy

A responsive, content-driven educational website for practical AI learning. The site uses Next.js, TypeScript, React Three Fiber, and a lightweight procedural workstation scene—no external 3D models are required.

## Local development

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For production verification:

```bash
npm run typecheck
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin so canonical metadata and the sitemap use the correct domain.

## Content editing

Structured content lives in `src/data/content.ts`. It includes learning paths, tools, project case studies, resources, course information, navigation, publication flags, and asset-status labels.

Content and assets use four states:

- `REAL`: approved material ready to present.
- `DEMO`: illustrative material that must not be treated as evidence.
- `PLACEHOLDER`: a required input has not been supplied.
- `COMING_SOON`: the item is planned but not yet complete.

Keep claims honest. Do not publish unverified dates, prices, instructor credentials, testimonials, outcomes, phone numbers, social links, or external service features.

## Forms

The interest and contact forms are deliberately in demonstration mode. They validate in the browser but do not transmit or retain personal data, and they never show a false success message. Before enabling submissions, add a secure server-side endpoint, protected persistence, spam controls, rate limits, a completed privacy policy, and clear error handling.

## Deployment

The app is compatible with standard Next.js hosts. Build with `npm run build`; deploy the repository using the host's supported Next.js integration. No secret is required for the current demo. A custom domain can be connected later by changing `NEXT_PUBLIC_SITE_URL` and the hosting configuration.

## Content still needed

- Final logo and brand assets
- Official contact email and WhatsApp number
- Instructor identity, photo, and biography
- Approved course fee, dates, schedule, and policies
- Recording, missed-session, refund, and payment policies
- Authentic project screenshots and videos
- Confirmed social profile URLs
- Secure form submission service
