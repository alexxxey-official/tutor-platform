# Reports Directory

This directory contains detailed reports of all development work, deployments, and significant changes made to the tutor platform.

## Structure

Each report is organized by date in the format `YYYY-MM-DD/`:

```
reports/
├── 2026-04-17/
│   └── log.md
├── 2026-04-18/
│   └── log.md
├── 2026-04-19/
│   └── log.md
├── 2026-04-20/
│   ├── log.md
│   └── conversation_log.md
├── 2026-05-10/
│   └── log.md
└── README.md (this file)
```

## Report Template

Each `log.md` should include:

1. **Date and Time** — When the work was done
2. **Tasks Completed** — What was implemented/fixed
3. **Files Changed** — List of modified files
4. **Testing** — What was tested and results
5. **Deployment** — Git commit hash, push status
6. **Next Steps** — What needs to be done next
7. **Known Issues** — Any problems discovered
8. **Notes** — Additional observations

## Purpose

These reports serve as:
- **Historical record** of platform development
- **Documentation** for future reference
- **Debugging aid** when issues arise
- **Progress tracking** for the project
- **Knowledge base** for understanding past decisions

## Mandatory Reporting

**CRITICAL:** Every deployment to GitHub/Vercel MUST have a corresponding report.

This is enforced in `AGENTS.md` workflow rules.

---

**Last Updated:** 2026-05-10
