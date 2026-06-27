"""EHCC content MCP server.

A Model Context Protocol server that lets an AI assistant read and manage the
static content of the EHCC website. All site content lives in ``lib/data.ts``
as exported TypeScript arrays of single-line object literals; this server reads
those arrays and appends new, well-formed entries to them.

Run directly for stdio transport:

    python server.py

Configure in an MCP client (e.g. Claude Desktop) — see README.md.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

# data.ts lives one level up from this file, in ../lib/data.ts
DATA_FILE = (Path(__file__).resolve().parent.parent / "lib" / "data.ts").resolve()

mcp = FastMCP("ehcc-content")


# --------------------------------------------------------------------------- #
# Low-level helpers for reading & editing lib/data.ts
# --------------------------------------------------------------------------- #
def _read() -> str:
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Could not find data file at {DATA_FILE}")
    return DATA_FILE.read_text(encoding="utf-8")


def _write(text: str) -> None:
    DATA_FILE.write_text(text, encoding="utf-8")


def _find_array_bounds(lines: list[str], export_name: str) -> tuple[int, int]:
    """Return (start_index, close_index) line indices for ``export const NAME``.

    ``close_index`` is the line that contains the closing ``];`` of the array.
    """
    start = None
    for i, line in enumerate(lines):
        if re.match(rf"\s*export const {re.escape(export_name)}\b", line):
            start = i
            break
    if start is None:
        raise ValueError(f"Could not find `export const {export_name}` in data.ts")
    for j in range(start, len(lines)):
        if lines[j].rstrip().endswith("];") or lines[j].strip() == "];":
            return start, j
    raise ValueError(f"Could not find closing `];` for {export_name}")


def _entry_lines(export_name: str) -> list[str]:
    """Return the raw object-literal lines inside the named export array."""
    text = _read()
    lines = text.splitlines()
    start, close = _find_array_bounds(lines, export_name)
    body = lines[start + 1 : close]
    # Each content entry begins with "{" (single-line object literals).
    return [ln for ln in body if ln.strip().startswith("{")]


def _next_id(export_name: str, prefix: str) -> str:
    """Compute the next sequential id like e6, p8 for an array of entries."""
    nums = []
    for ln in _entry_lines(export_name):
        m = re.search(rf'id:\s*"{re.escape(prefix)}(\d+)"', ln)
        if m:
            nums.append(int(m.group(1)))
    nxt = (max(nums) + 1) if nums else 1
    return f"{prefix}{nxt}"


def _esc(value: str) -> str:
    """Escape a string for embedding inside a TS double-quoted literal."""
    return value.replace("\\", "\\\\").replace('"', '\\"')


def _ts_value(value: Any) -> str:
    """Serialize a Python value to its TS literal form."""
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        return "[" + ", ".join(f'"{_esc(str(v))}"' for v in value) + "]"
    return f'"{_esc(str(value))}"'


def _ts_object(fields: list[tuple[str, Any]]) -> str:
    """Build a single-line TS object literal from ordered (key, value) pairs.

    ``None`` values are skipped so optional fields are simply omitted.
    """
    parts = [f"{k}: {_ts_value(v)}" for k, v in fields if v is not None]
    return "  { " + ", ".join(parts) + " },"


def _append_entry(export_name: str, entry_line: str) -> None:
    """Insert a new object-literal line just before the array's closing `];`."""
    text = _read()
    lines = text.splitlines(keepends=False)
    start, close = _find_array_bounds(lines, export_name)
    lines.insert(close, entry_line)
    trailing = "\n" if text.endswith("\n") else ""
    _write("\n".join(lines) + trailing)


# --------------------------------------------------------------------------- #
# Events
# --------------------------------------------------------------------------- #
_EVENT_TYPES = {"Hackathon", "Workshop", "Guest Speaker", "Competition", "Social"}


@mcp.tool()
def list_events() -> list[dict[str, str]]:
    """List the club events currently on the site (id, title, type, date)."""
    out = []
    for ln in _entry_lines("EVENTS"):
        out.append(
            {
                "id": _grab(ln, "id"),
                "title": _grab(ln, "title"),
                "type": _grab(ln, "type"),
                "date": _grab(ln, "date"),
            }
        )
    return out


@mcp.tool()
def add_event(
    title: str,
    type: str,
    date: str,
    location: str,
    description: str,
    time: str | None = None,
    upcoming: bool = True,
    featured: bool = False,
) -> str:
    """Add a new event to the site.

    Args:
        title: Event name.
        type: One of Hackathon, Workshop, Guest Speaker, Competition, Social.
        date: ISO date, e.g. "2026-10-09".
        location: Where it happens, e.g. "Room F-105".
        description: A sentence or two describing the event.
        time: Optional human-readable schedule, e.g. "Weekly · Access Period".
        upcoming: Whether the event is upcoming (default True).
        featured: Whether to feature it prominently (default False).
    """
    if type not in _EVENT_TYPES:
        return f"Invalid type '{type}'. Must be one of: {', '.join(sorted(_EVENT_TYPES))}."
    new_id = _next_id("EVENTS", "e")
    entry = _ts_object(
        [
            ("id", new_id),
            ("title", title),
            ("type", type),
            ("date", date),
            ("time", time),
            ("location", location),
            ("description", description),
            ("upcoming", upcoming),
            ("featured", featured if featured else None),
        ]
    )
    _append_entry("EVENTS", entry)
    return f"Added event '{title}' with id {new_id}."


# --------------------------------------------------------------------------- #
# Projects
# --------------------------------------------------------------------------- #
_PROJECT_CATEGORIES = {"AI/ML", "Web Dev", "Cybersecurity", "Data Science", "Other"}


@mcp.tool()
def list_projects() -> list[dict[str, str]]:
    """List the projects currently on the site (id, name, category)."""
    out = []
    for ln in _entry_lines("PROJECTS"):
        out.append(
            {
                "id": _grab(ln, "id"),
                "name": _grab(ln, "name"),
                "category": _grab(ln, "category"),
            }
        )
    return out


@mcp.tool()
def add_project(
    name: str,
    description: str,
    category: str,
    members: list[str],
    tech: list[str],
    github: str | None = None,
    demo: str | None = None,
    featured: bool = False,
) -> str:
    """Add a new project to the site.

    Args:
        name: Project name.
        description: What the project does.
        category: One of AI/ML, Web Dev, Cybersecurity, Data Science, Other.
        members: Contributors or owning branch, e.g. ["Hackathon Branch"].
        tech: Tech stack, e.g. ["React", "Firebase"].
        github: Optional repo URL.
        demo: Optional live demo URL.
        featured: Whether to pin/feature the project (default False).
    """
    if category not in _PROJECT_CATEGORIES:
        return (
            f"Invalid category '{category}'. Must be one of: "
            f"{', '.join(sorted(_PROJECT_CATEGORIES))}."
        )
    new_id = _next_id("PROJECTS", "p")
    entry = _ts_object(
        [
            ("id", new_id),
            ("name", name),
            ("description", description),
            ("category", category),
            ("members", members),
            ("tech", tech),
            ("github", github),
            ("demo", demo),
            ("featured", featured if featured else None),
        ]
    )
    _append_entry("PROJECTS", entry)
    return f"Added project '{name}' with id {new_id}."


# --------------------------------------------------------------------------- #
# Team members (LEADERSHIP)
# --------------------------------------------------------------------------- #
@mcp.tool()
def list_members() -> list[dict[str, str]]:
    """List the leadership/team members on the site (id, name, role, grade)."""
    out = []
    for ln in _entry_lines("LEADERSHIP"):
        out.append(
            {
                "id": _grab(ln, "id"),
                "name": _grab(ln, "name"),
                "role": _grab(ln, "role"),
                "grade": _grab(ln, "grade"),
            }
        )
    return out


@mcp.tool()
def add_member(
    name: str,
    role: str,
    grade: str,
    interests: list[str],
    bio: str | None = None,
    is_leadership: bool = True,
) -> str:
    """Add a new team member to the LEADERSHIP roster.

    Args:
        name: Member's full name.
        role: Their role, e.g. "Co-Founder", "Secretary".
        grade: Grade or branch label, e.g. "Leadership", "Data Science".
        interests: Short tags, e.g. ["Python", "ML"].
        bio: Optional one-line bio.
        is_leadership: Whether they appear in the leadership section (default True).
    """
    # id is a kebab-case slug of the first name, matching existing entries.
    slug = re.sub(r"[^a-z0-9]+", "-", name.strip().lower().split(" ")[0]).strip("-")
    entry = _ts_object(
        [
            ("id", slug),
            ("name", name),
            ("role", role),
            ("grade", grade),
            ("bio", bio),
            ("interests", interests),
            ("isLeadership", is_leadership),
        ]
    )
    _append_entry("LEADERSHIP", entry)
    return f"Added member '{name}' with id {slug}."


# --------------------------------------------------------------------------- #
# Shared parsing helper
# --------------------------------------------------------------------------- #
def _grab(line: str, key: str) -> str:
    """Extract a string field value from a single-line TS object literal."""
    m = re.search(rf'\b{re.escape(key)}:\s*"((?:[^"\\]|\\.)*)"', line)
    return m.group(1) if m else ""


if __name__ == "__main__":
    mcp.run()
