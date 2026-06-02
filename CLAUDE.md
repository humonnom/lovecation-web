# Claude Code Instructions

Before working on this project, read:

@docs/ai-harness/toc.md

Core rules:

- Do not make large changes without proposing a plan first.
- Keep diffs small and reviewable.
- After code changes, run the available checks:
    - npm run lint
    - npm run build
    - npm run format:check
- Do not assume test or typecheck scripts exist unless they are added to package.json.
- Read only the relevant harness documents linked from toc.md.