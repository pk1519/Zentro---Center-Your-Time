import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import { decryptData, isValidCode } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { code } = await request.json();

    if (!code || !isValidCode(code)) {
      return NextResponse.json(
        { error: 'Invalid code format. Please enter a 2-digit code.' },
        { status: 400 }
      );
    }

    // Find message by code
    const message = await Message.findOne({ code });

    if (!message) {
      return NextResponse.json(
        { error: 'Access Denied. Invalid code or message has expired.' },
        { status: 404 }
      );
    }

    // Check if message has expired
    if (new Date() > message.expiresAt) {
      // Clean up expired message
      await Message.deleteOne({ _id: message._id });
      return NextResponse.json(
        { error: 'Access Denied. Message has expired.' },
        { status: 410 }
      );
    }

    try {
      // Decrypt the data
      const decryptedData = decryptData(message.encryptedData, code);
      const parsedData = JSON.parse(decryptedData);

      // Increment access count
      message.accessCount += 1;
      await message.save();

      // Delete the message after successful access (one-time access)
      await Message.deleteOne({ _id: message._id });

      return NextResponse.json({
        success: true,
        data: {
          message: parsedData.message,
          fileName: parsedData.fileName,
          timestamp: parsedData.timestamp,
          hasFile: message.hasFile
        }
      });

    } catch (decryptionError) {
      console.error('Decryption error:', decryptionError);
      return NextResponse.json(
        { error: 'Access Denied. Invalid code or corrupted data.' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Receive API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve message' },
      { status: 500 }
    );
  }
}
