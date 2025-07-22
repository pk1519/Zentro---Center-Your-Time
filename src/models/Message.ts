import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
  code: string;
  encryptedData: string;
  fileName?: string;
  hasFile: boolean;
  createdAt: Date;
  expiresAt: Date;
  accessCount: number;
}

const MessageSchema = new Schema<IMessage>({
  code: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 2,
    match: /^[0-9]{2}$/
  },
  encryptedData: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: false
  },
  hasFile: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  accessCount: {
    type: Number,
    default: 0
  }
});

// TTL index - automatically delete documents when expiresAt is reached
MessageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Ensure code uniqueness
MessageSchema.index({ code: 1 });

// Pre-save middleware to set expiration
MessageSchema.pre('save', function(next) {
  if (this.isNew && !this.expiresAt) {
    // Default expiration: 5 minutes from creation
    this.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  }
  next();
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
