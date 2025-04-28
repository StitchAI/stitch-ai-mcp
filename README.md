![image](https://github.com/user-attachments/assets/6533769e-dc98-4e64-a4ae-bfacc72f75fc)
[![StitchAI](https://img.shields.io/twitter/follow/StitchAI_hq?style=social&logo=twitter)](https://x.com/StitchAI_hq)
[![version](https://img.shields.io/badge/version-0.1.0-yellow.svg)](https://semver.org)

# Stitch AI's MCP Server

> Decentralized Knowledge Hub for AI

> This repository contains a Model Context Protocol (MCP) server implementation for Stitch AI's memory management system. The server provides tools for creating, retrieving, and managing AI agent memories.

---

## Available Tools

The MCP server provides the following tools:

### `create_space`
Creates a new memory space with the specified name.
- Parameters:
  - `space_name`: The name of the memory space to create
  - `type`: The type of memory space to create

### `delete_space`
Deletes a memory space with the specified name.
- Parameters:
  - `space_name`: The name of the memory space to delete

### `get_all_spaces`
Gets a list of all available memory spaces.
- Parameters: None

### `upload_memory`
Uploads a new memory to a specified memory space.
- Parameters:
  - `space`: The name of the memory space to upload to
  - `message`: The memory message to upload
  - `memory`: The memory content to upload

### `get_memory`
Retrieves a specific memory by ID from a memory space.
- Parameters:
  - `space`: The name of the memory space
  - `memory_id`: The ID of the memory to retrieve

### `get_all_memories`
Retrieves all memories from a specified memory space.
- Parameters:
  - `space`: The name of the memory space to retrieve memories from
  - Optional Parameters:
    - `memory_names`: Comma-separated list of memory names to filter
    - `limit`: Maximum number of memories to return (default: 50)
    - `offset`: Number of memories to skip (default: 0)

---

### Run the server

```bash
npm run start
```

---

### Using with Claude Desktop

To use this MCP server with Claude Desktop, modify your `claude_desktop_config.json` file as shown below:

```json
{
    "mcpServers": {
        "stitchai": {
            "command": "npx",
            "args": [
                "ts-node",
                "<YOUR_REPO_PATH>/src/server.ts"
            ],
            "env": {
                "API_KEY": "<STITCH_AI_API_KEY>",
                "BASE_URL": "https://api-demo.stitch-ai.co"
            }
        }
    }
}
```

---

### Contact

https://x.com/StitchAI_hq
