# Stitch AI MCP Server

A MCP server for **Stitch AI** memory management. It provides:

- **Save**, **retrieve**, **list**, and **search** memory entries via MCP tools
- **Version management** for memory entries
- Local in-memory datastore with optional syncing to Stitch AI via HTTP API
- **API Key** authentication
- **Server-Sent Events (SSE)** for MCP communication

### Features

- `save_memory`: store or update memory entries
- `get_memory`: retrieve a specific or latest version
- `get_all_memories`: list all stored memories
- `search_memories`: keyword search over memories

### Usage