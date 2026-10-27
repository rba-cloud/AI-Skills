# AI Skills Academy delivery

`AI-Skills-deploy.zip` contains the complete Next.js source project and its verified production `.next` output.

Excluded from the archive are only reproducible or private local state:

- `node_modules/`
- `.git/`
- `.next/cache/`
- `.next/dev/`
- TypeScript incremental cache files

Archive SHA-256:

`dda906d9a8773bb9f1ea0c3c2a6a74fa5768548a5cc47cf8a06bf830527f6116`

For Vercel, either import this Git branch directly or extract the archive and deploy the project root. Vercel will install dependencies from `package-lock.json` and run the Next.js build.
