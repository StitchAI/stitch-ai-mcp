import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerMemoryCreationPrompt(server: McpServer) {
  server.prompt(
    'create_memory',
    'Guide for creating a new memory in a space',
    { 
      space_name: z.string().describe('The name of the memory space'),
      information: z.string().describe('Information you want to store as a memory')
    },
    ({ space_name, information }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `I want to store this information in the "${space_name}" space: "${information}".

Please help me format this information as a memory by:
1. Creating a concise commit-style message that describes what this information is about (similar to a Git commit message)
2. Formatting the detailed information with all relevant context and details

Once you've created these, use the upload_memory tool to store this in the "${space_name}" space with:
- space: "${space_name}"
- message: The commit-style message you created (should be brief but descriptive)
- episodic_memory: The detailed information you formatted`
        }
      }]
    })
  );
}