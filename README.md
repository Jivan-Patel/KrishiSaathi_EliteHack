# KrishiSaathi: Empowering Indian Farmers with AI-Driven Agriculture

![KrishiSaathi Logo](frontend/public/logo.svg)

**KrishiSaathi** is a comprehensive digital platform designed to revolutionize agriculture in India by connecting farmers with cutting-edge technology, real-time market intelligence, and a supportive community. Built for the EliteHack hackathon, this solution addresses critical challenges faced by Indian farmers including access to accurate crop information, market prices, logistics, and peer knowledge sharing.

## 🌟 Key Features

### 🧠 Smart Crop Intelligence
- **Comprehensive Crop Library**: Detailed guides for 50+ crops with localized information
- **AI-Powered Recommendations**: Personalized crop suggestions based on soil type, season, and water availability
- **Multilingual Support**: Full Hindi and English language support for accessibility

### 📊 Real-Time Market Intelligence
- **Live Mandi Rates**: Direct integration with 75+ mandis across India
- **Price Tracking**: Historical and current market price data
- **Regional Insights**: Location-specific market intelligence

### 🤝 Community & Networking
- **Farmer Forum**: Active community of 10,000+ farmers sharing knowledge
- **Q&A Platform**: Ask questions, get expert answers, and upvote helpful responses
- **Peer Learning**: Connect with experienced farmers across regions

### 🚛 Verified Logistics Network
- **Transport Requests**: Book verified transportation for crops
- **Driver Network**: Connect with trusted logistics providers
- **Job Management**: Track and manage transportation jobs

### 🛒 Direct Marketplace
- **Verified Buyers**: Connect directly with GST-verified exporters
- **Sell Crops**: List and sell produce to established buyers
- **Input Procurement**: Access to fertilizers and seeds

### 🌱 Agricultural Inputs
- **Fertilizer Database**: Comprehensive fertilizer recommendations by crop
- **Supplier Network**: Direct access to verified input suppliers

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Additional Technologies
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **ESLint** - Code linting

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
# Create .env file with MongoDB connection string
echo "MONGODB_URI=your_mongodb_connection_string" > .env
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/krishisaathi
PORT=5000
```

## 📖 Usage

1. **Start the backend server** on port 5000
2. **Start the frontend** on port 5173 (Vite default)
3. **Access the application** at `http://localhost:5173`
4. **Explore features** through the intuitive dashboard

## 🔌 API Endpoints

### Crop Management
- `GET /api/crops` - Retrieve all crops (supports language parameter)
- `GET /api/crops/:id` - Get specific crop details
- `GET /api/crops/recommendations/filter` - Get filtered crop recommendations

### Fertilizer Information
- `GET /api/fertilizers` - Get all fertilizers
- `GET /api/fertilizers?crop=crop_name` - Get fertilizers for specific crop

### Community Forum
- `GET /api/community/questions` - Get all questions
- `POST /api/community/questions` - Post a new question
- `POST /api/community/questions/:id/reply` - Add reply to question
- `POST /api/community/questions/:id/upvote` - Upvote a question

### Transport Services
- `GET /api/transport` - Get available transport requests
- `POST /api/transport` - Create new transport request
- `PUT /api/transport/accept/:id` - Accept transport job
- `GET /api/transport/my-jobs/:userId` - Get user's accepted jobs

## 🌍 Impact & Innovation

KrishiSaathi addresses India's agricultural challenges:
- **Digital Inclusion**: Brings technology to rural farmers
- **Economic Empowerment**: Direct market access reduces middleman exploitation
- **Knowledge Sharing**: Community-driven learning platform
- **Sustainability**: Data-driven farming reduces resource waste
- **Scalability**: Cloud-deployed solution reaches farmers nationwide

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Jivan patel
- **Backend Developer**: Mayank lumbhani
- **Frontend Developer**: Parv suhagiya
- **UI/UX Designer**: Prathvik mehra

---

**Built with ❤️ for Indian farmers during EliteHack 2024**


