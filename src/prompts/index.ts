// src/prompts/index.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerMemoryCreationPrompt } from './memoryCreation';
import { registerMemoryRetrievalPrompt } from './memoryRetrieval';
import { registerInformationCollectionPrompt } from './InformationCollection';

export function registerAllPrompts(server: McpServer) {
  registerMemoryCreationPrompt(server);
  registerMemoryRetrievalPrompt(server);
  registerInformationCollectionPrompt(server);
}