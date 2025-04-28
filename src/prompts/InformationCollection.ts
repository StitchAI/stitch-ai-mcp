import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerInformationCollectionPrompt(server: McpServer) {
  server.prompt(
    'collect_information',
    'Guide for collecting and organizing information using getAllMemories',
    { 
      topic: z.string().describe('The topic or question you want to explore')
    },
    ({ topic }) => {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: `I want to gather and organize all information about "${topic}" from my memories.

Please help me with this process:

1. Use get_all_memories to retrieve all available memories

2. After gathering the memories:
   a. Extract all information related to "${topic}"
   b. Organize the information chronologically
   c. Identify any contradictions or updated information
   d. Create a comprehensive summary

3. Include in your summary:
   - Key findings about "${topic}"
   - How information has evolved over time
   - Any gaps in information
   - References to specific memories where detailed information can be found

This approach will help us gather and organize relevant information efficiently.`
          }
        }]
      };
    }
  );
}