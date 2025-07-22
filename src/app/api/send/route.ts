import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { encryptData, generateTwoDigitCode } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { message, fileName, expiryMinutes = 5 } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Generate unique 2-digit code
    let code: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!isUnique && attempts < maxAttempts) {
      code = generateTwoDigitCode();
      const existingMessage = await Message.findOne({ code });
      if (!existingMessage) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return NextResponse.json(
        { error: 'Unable to generate unique code. Please try again.' },
        { status: 500 }
      );
    }

    // Prepare data to encrypt
    const dataToEncrypt = JSON.stringify({
      message: message.trim(),
      fileName: fileName || null,
      timestamp: new Date().toISOString()
    });

    // Encrypt the data
    const encryptedData = encryptData(dataToEncrypt, code!);

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Save to database
    const newMessage = new Message({
      code: code!,
      encryptedData,
      fileName,
      hasFile: !!fileName,
      expiresAt
    });

    await newMessage.save();

    return NextResponse.json({
      success: true,
      code: code!,
      expiresAt: expiresAt.toISOString(),
      message: 'Message stored successfully'
    });

  } catch (error) {
    console.error('Send API Error:', error);
    return NextResponse.json(
      { error: 'Failed to store message' },
      { status: 500 }
    );
  }
}
