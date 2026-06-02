# Workflow

## Branching

- Branch off `main` for every change.
- Branch names: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.
- Keep branches short-lived; merge or delete after landing.

## Commits

- Conventional Commits style: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- One logical change per commit — avoid mixing unrelated edits.
- Keep messages under 72 characters on the subject line.

## Before finishing a task

Run all three checks in order:

```bash
npm run lint          # must pass with no errors
npm run build         # must produce a successful build
npm run format:check  # must report no formatting issues
```

Fix any failures before marking a task complete. To auto-fix formatting: `npm run format`.

## Pull requests

- Open PRs against `main`.
- PR title follows the same Conventional Commits prefix as the branch.
- Summarize *what* changed and *why* in the PR body — not a list of files.
- Keep PRs focused: one feature or fix per PR.

## File hygiene

- Delete unused files rather than commenting them out.
- Do not leave `console.log` debug statements in committed code.
- Prefer editing existing files over creating new ones.
