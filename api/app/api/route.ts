// API Health Check Route
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Subtract API',
    version: '1.0.0',
    phase: 'Phase 1 MVP',
    timestamp: new Date().toISOString(),
  });
}
