# Legacy Revival Studio Specification (v0.1)

## Goal

Restore legacy software systems safely and reproducibly.

---

# 1. Project Structure

    /raw/
        original source snapshots

    /runtime/
        dockerized execution environments

    /analysis/
        dependency reports
        compatibility checks

    /migration/
        modernization patches

    /docs/
        recovery notes

---

# 2. Preservation Rules

Always preserve:

- original source code
- original database dumps
- original configuration
- original file structure

Never overwrite originals.

---

# 3. Recovery Workflow

Step 1:

Collect all original artifacts.

Step 2:

Make system runnable locally.

Step 3:

Document current behavior.

Step 4:

Apply minimal compatibility fixes.

Step 5:

Optional modernization.

---

# 4. Tooling

- Git
- Docker
- Python
- SQL tools
- static analyzers

---

# 5. Success Definition

A system is considered revived when:

- it starts successfully
- core functions work
- data is intact
- behavior is documented
