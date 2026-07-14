# Deployment — insurancestudyguide

Vite + React app. Deploys to Vercel with **Git auto-deploy** (push to `main` → Vercel rebuilds + republishes automatically).

## Live URLs
- Production (clean alias): https://insurancestudyguide-repo.vercel.app
- Vercel project: `insurancestudyguide-repo` (id `prj_KbpyOTrwnPXtrbVuFsfLRAzCL26F`, team `team_sWGvzy35VqWNfalSBdMUb0JN`)
- GitHub: `adeola4/insurancestudyguide`

## Build
```bash
npm ci && npm run build      # outputs to dist/
```
Vercel runs the same (`tsc -b && vite build`). `package-lock.json` MUST stay committed (Vercel uses `npm ci`).

## CRITICAL: what broke before (don't repeat)
The build failed with:
```
error TS5083: Cannot read file '/vercel/path0/tsconfig.json'
```
Root cause: someone **wiped `.gitignore` down to one line** (just `.vercel`) and **committed the entire `node_modules/` and `dist/` into git**. Vercel clones that polluted tree, `tsc -b` can't find config files, deploy goes `● Error` in ~7s.

**Current state (fixed, keep it this way):**
- `node_modules/` and `dist/` are **git-ignored and untracked** (verify: `git check-ignore node_modules dist`).
- `.gitignore` ignores node_modules, dist, dist-ssr, *.tsbuildinfo, .vercel.
- If this ever regresses: `git rm -r --cached node_modules dist`, restore `.gitignore`, `npm ci && npm run build`, commit, push.

## Git auto-deploy setup (required)
Auto-deploy does NOT work just by "connecting" in the dashboard. Two things must both be true:
1. **The Vercel GitHub App must be installed** on the GitHub account that owns the repo:
   https://github.com/apps/vercel  →  Install  →  grant `adeola4/insurancestudyguide` (or All repositories).
2. The repo must be **linked** to this Vercel project (dashboard → Settings → Git).

If `gitRepository` shows `None` on the project (Vercel API `GET /v9/projects/<id>`), the GitHub App is NOT installed — pushes will not auto-deploy. Symptom: `vercel ls` shows no new deployment after a `git push`.

Verify auto-deploy works: push a commit, then `vercel ls` should show a new deployment whose URL contains `-git-main-`. The production alias should return HTTP 200:
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://insurancestudyguide-repo.vercel.app/
```

## Manual deploy (fallback, if Git link is down)
```bash
vercel deploy --prod --scope team_sWGvzy35VqWNfalSBdMUb0JN
```
Local `npm run build` passes even when the committed-tree is broken, because `npm ci` cleans `node_modules` — so a passing local build does NOT prove the Vercel build will pass. Always check the real Vercel build log (`vercel inspect <url> --logs`) when debugging.
