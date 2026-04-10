// Magic Link Auth API - POST send magic link
import { NextRequest, NextResponse } from 'next/server';

// In production: Use a real email service like Resend or SendGrid
// For MVP: Simulate magic link generation

interface MagicLinkRequest {
  email: string;
}

interface MagicLinkRecord {
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
}

// In-memory store for demo (use Redis/DB in production)
const magicLinks: MagicLinkRecord[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: MagicLinkRequest = await request.json();
    const { email } = body;
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Generate magic link token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    magicLinks.push({ email, token, expiresAt, used: false });
    
    // In production: Send email with magic link
    // For MVP: Return the token directly (demo mode)
    console.log(`[DEMO] Magic link for ${email}: /auth/verify?token=${token}`);
    
    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
      // In production: Remove this - only for demo
      demoToken: token,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
