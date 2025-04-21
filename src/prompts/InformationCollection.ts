import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerInformationCollectionPrompt(server: McpServer) {
  server.prompt(
    'collect_information',
    'Guide for collecting and organizing information across memory spaces',
    { 
      topic: z.string().describe('The topic or question you want to explore')
    },
    ({ topic }) => {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: `I want to gather and organize all information about "${topic}" from across my memory spaces.

Please help me with this process:

1. First, use get_all_spaces to list all available memory spaces
2. For each potentially relevant space:
   a. Use get_all_memories to get the list of memory IDs and their commit messages
   b. Identify which memories might contain information about "${topic}" based on their commit messages
   c. For each relevant memory ID, use get_memory to retrieve the full detailed content
   
3. After gathering all the detailed memory contents:
   a. Extract all information related to "${topic}"
   b. Organize the information chronologically or by subtopic
   c. Identify any contradictions or updated information across different memories
   d. Create a comprehensive summary that presents a unified view

4. Include in your summary:
   - Key findings about "${topic}"
   - How information about the topic has evolved or been updated over time
   - Any gaps in information that might exist
   - References to specific memory IDs where detailed information can be found
   
This structured approach will ensure we gather all relevant information from the memory system.`
          }
        }]
      };
    }
  );
}