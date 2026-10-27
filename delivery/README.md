# Download and deploy AI Skills Academy

`AI-Skills-production-2026-10-27.zip` contains the freshly built production website, with `index.html` at the archive root and all bundled scripts, styles, and fonts in `assets/`.

## Download

Open this ZIP file on GitHub and click **Download raw file**. Sign in to the GitHub account with repository access if required. To retrieve the complete editable project, open this branch and choose **Code → Download ZIP**.

## Deploy manually

Extract the production ZIP. Upload the extracted folder containing `index.html` and `assets/` to Netlify Drop or another static host configured to serve it at the domain root. No Node server or build step is needed for these prebuilt files. Opening index.html directly with file:// is not supported; serve it over HTTP(S).

The existing source was preserved. This package was built with `npm run build -- --outDir /tmp/ai-skills-production-20261027` and verified for ZIP integrity. Unit tests passed. See the project README for local development, source builds, and deployment configuration.

The original logo, verified social/contact URLs, and production legal copy remain the existing development placeholders. No new content was invented. Three.js triggers a non-fatal large-chunk build warning; its scene is lazy loaded.

SHA256SUMS.txt provides the archive SHA-256 checksum.
