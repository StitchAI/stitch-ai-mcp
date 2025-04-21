import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerSystemInfoResource(server: McpServer) {
  server.resource(
    'system-info',
    'stitchai://system-info',
    async (uri) => {
      const info = {
        name: 'StitchAI Memory MCP Server',
        version: '0.1.2',
        description: 'Decentralized Knowledge Hub for AI',
        availableTools: [
          'create_space - Creates a new memory space',
          'delete_space - Deletes a memory space',
          'get_all_spaces - Gets a list of all memory spaces',
          'upload_memory - Uploads a new memory to a memory space',
          'get_memory - Retrieves a specific memory from a space',
          'get_all_memories - Retrieves all memories from a space'
        ],
        availablePrompts: [
          'create_memory - Guide for creating a new memory',
          'collect_information - Guide for collecting and organizing information across memory spaces',
          'analyze_memories - Guide for analyzing memories from a space'
        ],
        documentation: 'https://x.com/StitchAI_hq'
      };
      
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(info, null, 2)
        }]
      };
    }
  );
}