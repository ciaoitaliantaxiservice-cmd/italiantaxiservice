<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Branches and deploys

- All daily work happens on the `dev` branch.
- `main` is the live branch: every push to it redeploys the site. Merge `dev`
  into `main` at most once per day, and only after `npm run audit` passes, so
  the live site stays clean and is not redeployed many times a day.
- Do not push to `main` unless the owner asks for the daily merge.
