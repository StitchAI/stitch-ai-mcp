import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerMemoryRetrievalPrompt(server: McpServer) {
  server.prompt(
    'analyze_memories',
    'Guide for retrieving and analyzing memories from a space as version history',
    { 
      space_name: z.string().describe('The name of the memory space to analyze')
    },
    ({ space_name }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `I want to analyze the memory history in the "${space_name}" space, treating it like a version control system.

Please follow these steps:
1. First, retrieve all memories from the "${space_name}" space using the get_all_memories tool
2. Analyze the memory history like a commit log, focusing on:
   - The chronological evolution of information
   - Key changes or additions over time
   - Patterns in how the information has been updated
   - Important milestones or significant changes in the history
3. Create a changelog-style summary of how the information has evolved
4. If there are specific memory entries that represent important changes, use the get_memory tool to retrieve the full details

This analysis will help me understand how the information in this space has developed over time and track the key changes that have occurred.`
        }
      }]
    })
  );
}