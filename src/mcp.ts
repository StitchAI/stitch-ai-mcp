import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createHttpClient } from './utils/httpClient';
import { registerCreateSpace } from './tools/createSpace';
import { registerDeleteSpace } from './tools/deleteSpace';
import { registerGetAllSpaces } from './tools/getAllSpaces';
import { registerGetMemory } from './tools/getMemory';
import { registerGetAllMemories } from './tools/getAllMemories';
import { registerUploadMemory } from './tools/uploadMemory';
import { registerAllPrompts } from './prompts';

export function createMcpServer(apiKey: string, baseURL: string): McpServer {
  const server = new McpServer({ name: 'StitchAI Memory MCP Server', version: '0.1.1' });
  const httpClient = createHttpClient(baseURL, apiKey);
  registerCreateSpace(server, httpClient);
  registerDeleteSpace(server, httpClient);
  registerGetAllSpaces(server, httpClient);
  registerUploadMemory(server, httpClient);
  registerGetMemory(server, httpClient);
  registerGetAllMemories(server, httpClient);

  registerAllPrompts(server);
  return server;
}