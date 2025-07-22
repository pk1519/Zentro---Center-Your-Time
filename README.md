# Zentro - Center Your Time

A secure, professional full-stack web application for sharing text or data confidentially using two-digit codes. Messages are encrypted with AES encryption and automatically deleted after access or expiration.

## ✨ Features

### 🌐 Frontend
- **Modern UI**: Built with Next.js, React, and TailwindCSS
- **Professional Design**: Glass-morphism effects and smooth animations
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Framer Motion**: Smooth animations and transitions

### 🔒 Backend
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: Database with TTL (Time To Live) auto-deletion
- **AES Encryption**: Military-grade symmetric encryption
- **Auto-Expiry**: Messages self-destruct after timeout or access

### 🔐 Security Features
- **AES Encryption**: All data encrypted before storage
- **Never Plain Text**: Data is never stored in plain text
- **One-Time Access**: Messages deleted after successful retrieval
- **Auto-Expiration**: TTL-based automatic cleanup
- **Secure Key Derivation**: SHA-256 hashing for encryption keys

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Environment Setup**:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/secure-share
# For production, use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secure-share

ENCRYPTION_SECRET=your-super-secret-key-here-change-this-in-production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

2. **Install dependencies**:
```bash
npm install
```

3. **Database Setup**:
- **Local MongoDB**: Install and start MongoDB locally
- **MongoDB Atlas**: Create a free cluster and get connection string

4. **Start Development Server**:
```bash
npm run dev
```

5. **Access the Application**:
Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧰 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 18**: Component library
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS framework  
- **Framer Motion**: Animation library
- **Lucide React**: Modern icon library

### Backend
- **Next.js API Routes**: Server-side endpoints
- **Mongoose**: MongoDB ODM
- **crypto-js**: AES encryption library

### Database
- **MongoDB**: Document-based NoSQL database
- **TTL Indexes**: Automatic document expiration

## 📱 Usage

### Sending a Message
1. Navigate to **Send Message**
2. Enter your confidential text or upload a text file
3. Choose expiration time (5 min to 24 hours)
4. Click **Send Secure Message**
5. Share the generated 2-digit code with recipient

### Receiving a Message
1. Navigate to **Receive Message**
2. Enter the 2-digit access code
3. Click **Unlock Message**
4. View, copy, or download the decrypted content

## 🔒 Security Implementation

### Encryption Process
1. **Key Generation**: SHA-256 hash of (2-digit code + secret)
2. **AES Encryption**: Data encrypted using generated key
3. **Secure Storage**: Only encrypted data stored in database
4. **One-Time Access**: Message deleted after successful decryption

### Auto-Deletion
- **TTL Index**: MongoDB automatically deletes expired documents
- **Access-Based**: Messages deleted immediately after retrieval
- **No Recovery**: Once deleted, messages cannot be recovered

## 📂 Project Structure

```
secure-share/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── send/route.ts      # Send message API
│   │   │   └── receive/route.ts   # Receive message API
│   │   ├── send/page.tsx          # Send message page
│   │   ├── receive/page.tsx       # Receive message page
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── lib/
│   │   ├── mongodb.ts             # Database connection
│   │   └── encryption.ts          # Encryption utilities
│   └── models/
│       └── Message.ts             # MongoDB message model
├── .env.local                     # Environment variables
├── package.json
└── README.md
```

## 🚀 Deployment

### Environment Variables (Production)
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secure-share
ENCRYPTION_SECRET=your-production-secret-key-min-32-chars
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## ⚙️ Configuration

### Message Expiration Options
- 5 minutes (default)
- 15 minutes  
- 30 minutes
- 1 hour
- 24 hours

### File Upload Support
- **Formats**: .txt, .json, .csv, .xml, .md
- **Size Limit**: 1MB maximum
- **Processing**: Text content extracted and encrypted

### Security Settings
- **Encryption**: AES-256 symmetric encryption
- **Key Derivation**: SHA-256 hashing
- **Code Length**: Fixed 2-digit (10-99)
- **Auto-Cleanup**: TTL + access-based deletion

## 🛡️ Security Best Practices

1. **Strong Secrets**: Use random 32+ character encryption secrets
2. **HTTPS Only**: Always use HTTPS in production
3. **Database Security**: Secure MongoDB with authentication
4. **Environment Variables**: Never commit secrets to version control
5. **Regular Updates**: Keep dependencies updated

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**:
```bash
# Check if MongoDB is running locally
mongosh --eval "db.runCommand('ping')"

# For Atlas, verify connection string
```

**Build Errors**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Environment Variables Not Loading**:
- Ensure `.env.local` is in root directory
- Restart development server after changes
- Check variable names match exactly

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**⚠️ Security Notice**: This application handles sensitive data. Always use strong encryption secrets, HTTPS, and follow security best practices in production environments.
