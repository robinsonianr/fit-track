# Hard rules — non-negotiable, no exceptions

Violating any of these can cause real damage: lost data, broken trust, shipped-broken work. Always follow.

## 1. Ask Before Destructive Commands

Never run irreversible or shared-state-changing commands without explicit permission. State the exact command, why you want to run it, and wait for an OK.

Always require confirmation:

- `git push --force` / `--force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, `git cherry-pick` onto shared branches
- `git branch -D`, deleting remote branches (`git push origin :branch`)
- `git commit --amend` on already-pushed commits
- `git tag -d` / force-pushing tags
- `rm -rf`, dropping DB tables, truncating data, running destructive migrations
- Anything touching production: deploys, infra apply, secrets, DNS
- Publishing packages, posting to GitHub/Slack/email, or anything visible to others

Safe by default: read-only commands (`status`, `diff`, `log`), local builds, tests, lint, typecheck, and edits inside the working tree.

If unsure whether a command is destructive — ask.

## 2. Verify Before Reporting Complete

Before reporting any task as complete, verify it actually works:

- Run the tests, execute the script, check the output yourself.
- For TypeScript: run `tsc --noEmit` and fix every type error.
- For builds: run the build command and confirm it succeeds.
- If you cannot verify (no test exists, can't run the code), say so explicitly. Don't imply success.

Report outcomes faithfully:

- If tests fail, say so with the relevant output. Never claim "all tests pass" when output shows failures.
- Never suppress, simplify, or skip a failing check (test, lint, type error) to manufacture a green result.
- Never characterize incomplete or broken work as done.
- When something did pass or work, state it plainly. Don't hedge confirmed results with disclaimers, and don't re-verify things you already checked.

The goal is an accurate report, not a defensive one.

## 3. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

---

# Medium rules — engineering quality

Apply these by default. Push back if the user asks for something that violates one — but they can override with reason.

## 4. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: *"Would a senior engineer say this is overcomplicated?"* If yes, simplify.

## 5. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

Decision rule: for every change you're about to make, check whether it traces back to what the user actually asked for. If it does, make it. If it doesn't, leave the file alone and surface the observation instead.

## 6. Goal-Driven Execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

- `"Add validation"` → *"Write tests for invalid inputs, then make them pass"*
- `"Fix the bug"` → *"Write a test that reproduces it, then make it pass"*
- `"Refactor X"` → *"Ensure tests pass before and after"*
- For UI testing, use the Puppeteer MCP or the Claude Chrome extension to verify how the UI actually renders — code review alone can't judge visuals.

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 7. Track Features as a Visible Task List

§6 is about *defining* what done looks like. §2 is about *verifying* it. This section is about *making progress legible to the user*.

For any multi-file feature, externalize the task list — use the task tool, not your head. The user should be able to glance at the list and know exactly where you are.

- Create one task per file or concrete unit of work, not one per phase.
- Status changes are how you communicate position: `in_progress` when you start the file, `completed` when you leave it. Update them as you work, not in a batch at the end.
- Only one task should be `in_progress` at a time. If you genuinely paused one to start another, say so.
- Discovered work → a new task in the list, not silent scope creep on the current one.
- Blocked → keep the task `in_progress` and post the blocker. Don't reassign yourself elsewhere without telling the user.
- Stale list = lying. If a task no longer applies, delete it with a reason. No abandoned `pending` items at the end.

If the user can't tell from the list what you've finished and what's left, the list is broken — fix it before continuing.

## 8. Learn From Corrections

Persistent lessons live in [`learnings.md`](./docs/learnings.md)  — read it at the start of every task and follow every rule there.

When the user corrects a mistake you made:

1. Apply the correction.
2. Append a rule to `learnings.md` so the same mistake doesn't recur.
3. Show the user the new rule before continuing.

## 9. Keep `progress.md` Current

[`progress.md`](./docs/progress.md) is the long-lived map of the project — what's built, in flight, blocked, and planned. The visible task list (§7) is your *short-lived* working memory; `progress.md` is the *durable* one.

At the start of every task:

1. Read **Current Focus**, **In Progress**, and **Blocked / Open Questions**.
2. Verify the most recent **Completed** entries still match reality. If they don't, fix the file first.

While working:

- Move items between sections as their status changes — don't batch updates at the end.
- New work discovered mid-task → add to **Backlog** or **In Progress**, don't silently grow the current item (mirrors §7).
- Significant technical choices → append to **Decisions Log** with context, alternatives, and consequences.

When finishing:

- Move the item to **Completed** with the date and what you verified (tests, build, deploy). This pairs with §2 — only mark complete what you actually checked.
- If the task produced a persistent lesson, add the rule to `learnings.md` (§8) and reference it from the completed entry.

A stale `progress.md` is the same failure as a stale task list: it lies to the next person who reads it. Fix it before continuing.

---