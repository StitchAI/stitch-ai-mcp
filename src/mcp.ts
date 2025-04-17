import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createHttpClient } from './utils/httpClient';
import { registerSaveMemory } from './tools/saveMemory';
import { registerGetMemory } from './tools/getMemory';
import { registerGetAllMemories } from './tools/getAllMemories';
import { registerSearchMemories } from './tools/searchMemories';
import { MemoryEntry } from './types/memory';

export function createMcpServer(apiKey: string, baseURL: string): McpServer {
  const server = new McpServer({ name: 'StitchAI Memory MCP Server', version: '0.1.0' });
  const httpClient = createHttpClient(baseURL, apiKey);
  const memoryDB: Record<string, MemoryEntry[]> = {};
  registerSaveMemory(server, memoryDB, httpClient);
  registerGetMemory(server, memoryDB, httpClient);
  registerGetAllMemories(server, memoryDB);
  registerSearchMemories(server, memoryDB);
  return server;
}