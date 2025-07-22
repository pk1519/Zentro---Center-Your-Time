# SecureShare - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download and install MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  ```bash
  # Windows (as Administrator)
  net start MongoDB
  
  # macOS/Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/secure-share
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-share

# Encryption Secret (Change this to a random string in production!)
ENCRYPTION_SECRET=your-super-secret-encryption-key-min-32-characters-long

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Install Dependencies and Run

```bash
# Install packages
npm install

# Start development server
npm run dev
```

### 4. Open Your Browser

Visit [http://localhost:3000](http://localhost:3000) and start using SecureShare!

## 📝 How to Use

### Sending a Message:
1. Click **"Send Message"**
2. Enter your confidential text or upload a text file
3. Choose expiration time (default: 5 minutes)
4. Click **"Send Secure Message"**
5. Share the generated 2-digit code with your recipient

### Receiving a Message:
1. Click **"Receive Message"**
2. Enter the 2-digit access code
3. Click **"Unlock Message"**
4. View, copy, or download the decrypted content

## 🔒 Security Features

- **AES-256 Encryption**: All messages are encrypted before storage
- **One-Time Access**: Messages are deleted after being read once
- **Auto-Expiration**: Messages automatically delete after the specified time
- **Zero Knowledge**: Your data is never stored in plain text

## 🛠 Troubleshooting

**MongoDB Connection Issues:**
- Make sure MongoDB is running locally, or
- Check your Atlas connection string in `.env.local`

**Port Already in Use:**
- Change the port: `npm run dev -- -p 3001`

**Build Errors:**
- Clear cache: `rm -rf .next && npm run build`

## 🚀 Production Deployment

1. **Environment Variables** (set in your hosting platform):
   ```env
   MONGODB_URI=your-production-mongodb-uri
   ENCRYPTION_SECRET=your-production-secret-key
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

2. **Deploy to Vercel** (Recommended):
   - Push to GitHub
   - Connect to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy!

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Create an issue on GitHub if you encounter problems
- Make sure to follow security best practices in production

---

🎉 **You're all set!** Start sharing confidential messages securely.
