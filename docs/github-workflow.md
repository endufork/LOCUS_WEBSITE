# GitHub Workflow Notes

This project is pushed to:

- Remote: `https://github.com/endufork/LOCUS_WEBSITE.git`
- Branch: `main`
- First verified commit: `0df935b initial-locus-website`

## Important Rule For Codex

When Codex needs to run GitHub network commands in this project, use the normal desktop user context / escalated command execution.

Use normal local execution for local Git commands:

```bash
git status --short --branch
git diff --stat
git add .
git commit -m docs-github-workflow
```

Use escalated execution for GitHub network commands:

```bash
git fetch
git push
git ls-remote origin HEAD
```

## Why

Inside the managed sandbox, GitHub HTTPS commands may fail with Windows credential / Schannel errors, including:

```text
schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS
```

In one troubleshooting attempt, changing the HTTPS backend path also caused `git-remote-https.exe` to crash. The push succeeded only after running GitHub network commands in the normal desktop user context.

## Do Not Do This First

Do not spend time repeatedly trying these changes unless there is a separate confirmed reason:

- Do not switch `http.sslBackend` to `openssl`.
- Do not change `http.schannelCheckRevoke`.
- Do not change `http.schannelUseSSLCAInfo`.
- Do not keep retrying sandboxed `git push` after the Schannel credential error appears.

## Practical Checklist

Before pushing:

```bash
git status --short --branch
git log -1 --oneline
git remote -v
```

Then run network operations with escalated execution:

```bash
git push
git ls-remote origin HEAD
```

If `git ls-remote origin HEAD` returns the same commit hash as the latest local commit, the remote has received the push.
