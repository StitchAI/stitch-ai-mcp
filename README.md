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
  - `episodic_memory`: The episodic memory content

### `get_memory`
Retrieves a specific memory by ID from a memory space.
- Parameters:
  - `space`: The name of the memory space
  - `memory_id`: The ID of the memory to retrieve

### `get_all_memories`
Retrieves all memories from a specified memory space.
- Parameters:
  - `space`: The name of the memory space to retrieve memories from

---


### Run the server

```bash
npm run start
```

---


### Using with Claude Desktop
1. **Clone the repository**
   ```bash
   git clone https://github.com/StitchAI/stitch-ai-mcp.git
   ```
2. **Install dependencies**
   ```bash
   npm install @modelcontextprotocol/sdk zod
   npm install -D @types/node typescript
   ```
3. **Install Claude for Desktop**
   - Download and install the latest version from Claude's website

4. **Configure Claude for Desktop**
   - Locate your Claude for Desktop configuration file:
     - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - **Windows**: `%AppData%\Claude\claude_desktop_config.json`
   - Create the file if it doesn't exist

5. **Edit Configuration File**
   - Open the configuration file in a text editor:
     - **macOS**: `code ~/Library/Application\ Support/Claude/claude_desktop_config.json`
     - **Windows**: `code $env:AppData\Claude\claude_desktop_config.json`
   - Add your MCP server configuration:   
```json
{
    "mcpServers": {
        "stitchai": {
            "command": "npx",
            "args": [
                "ts-node",
                "/path/to/cloned/stitch-ai-mcp/src/server.ts"
            ],
            "env": {
                "API_KEY": "<STITCH_AI_API_KEY>",
                "BASE_URL": "https://api-devnet.stitch-ai.co"
            }
        }
    }
}
```
6. **Restart Claude for Desktop**
   - After saving the configuration file, restart Claude for Desktop
   - The MCP UI elements will appear in Claude for Desktop once at least one server is properly configured


---

### Contact

https://x.com/StitchAI_hq
