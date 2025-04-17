import * as dotenv from 'dotenv';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from './mcp';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Load env vars
const API_KEY = process.env.API_KEY!;
const BASE_URL = process.env.BASE_URL!;

// Create MCP server with Stitch AI API integration
const mcpServer = createMcpServer(API_KEY, BASE_URL);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("🔗 StitchAI MCP Server running...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});