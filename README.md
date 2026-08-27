# ✨ TaxBuddy AI

A modern, highly performant, AI-powered tax calculation and problem-solving application for Indian taxpayers.

## Core Features
- **Smart AI Tax Assistant**: Uses Google Gemini to answer your tax queries instantly.
- **Advanced Tax Computation**: Compare the Old Regime vs. New Regime (AY 2024-25 & AY 2025-26) effortlessly.
- **Premium User Experience**: Lightning-fast, modern dark-mode interface built for speed and clarity.
- **Authentication**: Seamless Login/Signup via Google OAuth.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js, Passport.js (Google OAuth)
- **Database**: MongoDB, Mongoose
- **AI Integration**: Google Generative AI (`gemini-2.0-flash-exp`)
- **Hosting**: Vercel (Serverless Edge)

## Live Preview
[TaxBuddy on Vercel](https://taxbuddy-rho.vercel.app/)

## Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/ARC7666/Tax-Calculator-.git
   cd Tax-Calculator-
   npm install
   ```
2. **Environment Setup**
   Create a `.env` file in the root with:
   ```env
   PORT=3000
   MONGOID=mongodb://localhost:27017/taxbuddy
   API_KEY=your_gemini_api_key
   JWT_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   ```
3. **Run the Application**
   ```bash
   npm run dev
   ```

## Author
- Ankit Ranjan
