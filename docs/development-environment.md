# Development And Testing Environment

This document records the working environment choices for this Astro static website, so future development does not waste time retrying tools that are known to fail in this Codex desktop setup.

## Project Stack

- Framework: Astro static site
- Package manager state: `pnpm-lock.yaml` is present, and `node_modules` uses `.pnpm`
- Runtime dependency in `package.json`: `astro`
- Main source files:
  - `src/data/site.ts`
  - `src/layouts/BaseLayout.astro`
  - `src/pages/[lang]/index.astro`
  - `src/pages/[lang]/[slug].astro`
  - `src/styles/global.css`
- Static assets: `public/assets/site`

There is no `.openai/hosting.json` in this project at the time this note was written.

## Recommended Commands

Use the project scripts in `tools` first. They already set the environment flags needed in this Windows sandbox.

Build:

```bat
tools\build-site.cmd
```

Local development server:

```bat
tools\dev-site.cmd
```

The dev script starts Astro on:

```text
http://127.0.0.1:4321/
```

If the port is left open by a previous run, identify it with:

```bat
netstat -ano -p TCP
```

Then stop only the PID listening on `127.0.0.1:4321`.

## Why Not Run `npm run dev` Directly

Directly running:

```bat
npm run dev -- --port 4321
```

can fail in this environment because Astro telemetry tries to write to:

```text
C:\Users\Lenovo\AppData\Roaming\astro\Config
```

Known error:

```text
EPERM: operation not permitted, mkdir 'C:\Users\Lenovo\AppData\Roaming\astro\Config'
```

Use `tools\dev-site.cmd` instead. It sets:

```bat
set ASTRO_TELEMETRY_DISABLED=1
```

## Visual Testing

Default validation should be:

```bat
tools\build-site.cmd
```

Use browser screenshots only when a visual change truly needs rendered verification, such as navigation layout, responsive behavior, image cropping, or overlap checks.

Known limits in this environment:

- The Browser plugin is not currently available in this project session.
- The bundled Codex runtime does not currently provide a complete Playwright setup for this project:
  - `@playwright/test` was not resolvable
  - `playwright` existed but failed to resolve `playwright-core`
- `npx playwright` may try to write to the default npm cache:

```text
C:\Users\Lenovo\AppData\Local\npm-cache
```

That can fail with `EPERM`.

If Playwright CLI is really needed, set temporary cache paths first:

```bat
set npm_config_cache=%TEMP%\npm-cache-codex
set PLAYWRIGHT_BROWSERS_PATH=%TEMP%\ms-playwright-codex
npx playwright --version
```

Only download browsers when necessary:

```bat
set npm_config_cache=%TEMP%\npm-cache-codex
set PLAYWRIGHT_BROWSERS_PATH=%TEMP%\ms-playwright-codex
npx playwright install chromium
```

Do not start this browser download during small copy or CSS-only changes unless screenshot verification is explicitly needed.

## Shell Choice

Prefer `cmd` for this project.

PowerShell / `pwsh` can fail in this Codex desktop environment with `CreateProcessAsUserW failed: 5` access errors. Use PowerShell only when a specific command needs it and `cmd` cannot do the job.

Avoid complex `node -e "..."` commands in `cmd`, because quoting can be passed through incorrectly. If a Node script becomes complex, use an existing project script or a temporary script outside the repo.

## GitHub Commands

See [github-workflow.md](github-workflow.md).

Short version:

- Local Git commands can run normally.
- GitHub network commands should run in normal desktop user context / escalated execution:

```bat
git fetch
git push
git ls-remote origin HEAD
```

This avoids repeated Schannel credential failures in the managed sandbox.

## Do Not Retry These Paths

Do not repeatedly retry the following unless there is new information:

- `npm run dev` without `ASTRO_TELEMETRY_DISABLED=1`
- `npx` without setting `npm_config_cache` to a writable temp path
- Playwright screenshot commands before confirming a browser binary exists
- Codex bundled `playwright` imports without checking `playwright-core`
- PowerShell commands after `CreateProcessAsUserW failed: 5`
- sandboxed GitHub HTTPS commands after Schannel credential errors

## Practical Workflow

For copy, layout, CSS, or data edits:

```bat
git status --short --branch
tools\build-site.cmd
git diff --stat
```

For visual layout edits:

1. Run `tools\build-site.cmd`.
2. Run `tools\dev-site.cmd`.
3. Use an already available browser if possible.
4. Use Playwright only if screenshots are required and the temp cache/browser path is prepared.
5. Stop the dev server when finished.

For GitHub push:

1. Commit locally.
2. Use escalated desktop-context `git push`.
3. Verify with escalated `git ls-remote origin HEAD`.
