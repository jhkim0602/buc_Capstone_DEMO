# AGENTS HANDBOOK

**PROTOCOL VERSION**: 1.2.0 (AI-Managed)
**LANGUAGE**: ko

## 🧠 THE CORE PHILOSOPHY
**Humans Lead, AI Works.**
- **Human Role**: Defines goals, Reviews Kanban, Merges PRs.
- **AI Role**: Writes Specs, Updates Tasks, Writes Code, Maintains `.good-partner/`.

## 📂 DIRECTORY MAP (YOUR TERRITORY)
All context lives in **`.good-partner/`**. You must maintain this folder.

| Directory | Purpose | AI Action |
| :--- | :--- | :--- |
| `kanban.md` | **Single Source of Truth** | **READ** first. **UPDATE** status to reflect reality. |
| `specs/` | Requirements/Specs | **READ** context. **WRITE** clarifications. |
| `work/` | task tickets | **CREATE** T-xxxx. **UPDATE** constantly. |
| `logs/` | logs/handoffs | **APPEND** every session. |
| `team.yaml` | Team | Read-only. |

## 🛠️ MERGE & CONFLICT PROTOCOL
If you encounter git merge conflicts in `.good-partner/`:
1. **Analyze**: Read both versions.
2. **Synthesize**: Combine the "Todo" items from both.
3. **Resolve**: Rewrite the file with the unified state.
*Do not ask the human to resolve documentation conflicts. That is your job.*

## 🚀 YOUR WORK LOOP
1. **Read Kanban**: Find what is assigned.
2. **Plan**: Create/Update `work/T-xxxx.md`.
3. **Act**: Write code.
4. **Report**: Update `kanban.md` (Done/Progress) before stopping.
