# EHCC Content MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) server that lets an
AI assistant **read and manage the EHCC website's content**. All site content
lives in [`../lib/data.ts`](../lib/data.ts); this server reads the exported
arrays and appends new, well-formed entries to them — so you can add an event,
project, or team member just by asking your assistant.

## Tools

| Tool            | What it does                                           |
| --------------- | ------------------------------------------------------ |
| `list_events`   | List current events (id, title, type, date)            |
| `add_event`     | Add an event to the `EVENTS` array                     |
| `list_projects` | List current projects (id, name, category)             |
| `add_project`   | Add a project to the `PROJECTS` array                  |
| `list_members`  | List leadership/team members                           |
| `add_member`    | Add a member to the `LEADERSHIP` array                 |

Edits are written straight into `lib/data.ts` in the same single-line object
style the file already uses, so they show up on the site after a rebuild.

## Setup

```bash
cd mcp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run (stdio)

```bash
python server.py
```

## Configure in Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ehcc-content": {
      "command": "/absolute/path/to/EHCC/mcp/.venv/bin/python",
      "args": ["/absolute/path/to/EHCC/mcp/server.py"]
    }
  }
}
```

Restart Claude Desktop, then try: *"Add a Workshop event called 'Intro to Git'
on 2026-11-05 in Room F-105."*

## Configure in Claude Code

```bash
claude mcp add ehcc-content -- /absolute/path/to/EHCC/mcp/.venv/bin/python /absolute/path/to/EHCC/mcp/server.py
```

## Notes

- The server resolves `data.ts` relative to its own location (`../lib/data.ts`),
  so it works regardless of the current working directory.
- IDs are auto-generated: sequential (`e6`, `p8`) for events/projects, and a
  name slug for members — matching the existing conventions.
