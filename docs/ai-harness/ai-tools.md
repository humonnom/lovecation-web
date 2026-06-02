# AI Tools

## Primary tool: Claude Code

Claude Code (the CLI) is the primary AI tool for this project. Launch it from the repo root:

```bash
claude
```

The harness reads `CLAUDE.md` at startup, which imports `docs/ai-harness/toc.md`. Load any other harness doc on demand by asking Claude to read it.

## Memory system

Claude Code maintains a persistent memory directory at `.claude/` in this project. Memory files capture non-obvious decisions, user preferences, and project context that would otherwise be lost between sessions. Claude manages these automatically — you do not need to edit them by hand.

To explicitly save something: *"Remember that …"*
To retrieve context: *"What do you know about …"*

## Useful skills (slash commands)

| Command | When to use |
|---|---|
| `/run` | Start the dev server and open the app in a browser |
| `/verify` | Confirm a change works end-to-end in the running app |
| `/code-review` | Review staged diff for bugs and cleanup opportunities |
| `/code-review ultra` | Deep multi-agent cloud review of the current branch |
| `/simplify` | Focused pass for reuse, simplification, and efficiency |
| `/security-review` | Security audit of pending changes |
| `/init` | Regenerate `CLAUDE.md` from scratch |

## MCP tools

MCP (Model Context Protocol) tools extend Claude Code with browser control, scheduling, and more. They are available in this session automatically.

Notable tools:

- **Claude in Chrome** — navigate, click, fill forms, screenshot the live app
- **Claude Preview** — start/stop a local preview server and inspect it
- **Scheduled Tasks** — create cron-style routines that run Claude agents on a schedule

## Working with the dev server

```bash
npm run dev     # starts on http://localhost:3000
```

The app routes to `http://localhost:3000/en` (or `/ja`, `/ko`) due to next-intl locale prefixing.
