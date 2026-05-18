# AI-Based Employee Performance Analytics & Recommendation System

A production-ready full-stack MERN application for managing employee performance with AI-powered insights and recommendations.

## 🚀 Features

### Authentication & Security
- JWT-based authentication
- Role-based access control (Admin/HR)
- Password encryption with bcryptjs
- Protected routes and API endpoints
- Token expiration handling

### Employee Management
- Complete CRUD operations
- Advanced search and filtering
- Department-wise organization
- Performance score tracking
- Skills management
- Experience tracking

### AI-Powered Features
- **Promotion Recommendations**: AI analyzes employee performance and suggests promotions
- **Training Suggestions**: Personalized training programs based on skill gaps
- **Performance Feedback**: Automated constructive feedback generation
- **Skill Gap Analysis**: Identifies missing skills and learning paths
- **Employee Ranking**: AI-powered employee comparison and ranking
- **Performance Summaries**: Executive-level insights and trends

### Analytics Dashboard
- Real-time statistics
- Department distribution charts
- Performance trend analysis
- Top performers leaderboard
- Interactive data visualizations
- Skill distribution analysis

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Axios** for API calls
- **Recharts** for data visualization
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Morgan** for logging
- **CORS** for cross-origin requests

### AI Integration
- OpenRouter/OpenAI compatible API
- Structured prompt engineering
- JSON response parsing
- Multiple AI recommendation types

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenRouter API key (or OpenAI compatible)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd ai-employee-performance-analytics
```

### 2. Install dependencies
```bash
npm run install-all
```

This will install dependencies for both frontend and backend.

### 3. Environment Setup

#### Backend (.env)
Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/employee-analytics
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
OPENROUTER_API_KEY=your_openrouter_api_key
AI_MODEL=openai/gpt-3.5-turbo
AI_API_URL=https://openrouter.ai/api/v1/chat/completions
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB
```bash
# If using local MongoDB
mongod
```

### 5. Run the application

#### Development Mode (Both servers)
```bash
npm run dev
```

#### Or run separately:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
ai-employee-performance-analytics/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   ├── appError.js
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeCard.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AIRecommendations.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EmployeeAnalytics.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Employees
- `GET /api/employees` - Get all employees (Protected)
- `GET /api/employees/:id` - Get single employee (Protected)
- `POST /api/employees` - Create employee (Admin/HR)
- `PUT /api/employees/:id` - Update employee (Admin/HR)
- `DELETE /api/employees/:id` - Delete employee (Admin/HR)
- `GET /api/employees/search` - Search employees (Protected)
- `GET /api/employees/stats` - Get statistics (Protected)

### AI Recommendations
- `POST /api/ai/recommend` - Get AI recommendation (Protected)
- `POST /api/ai/rank` - Rank employees (Admin/HR)
- `GET /api/ai/summary` - Performance summary (Admin/HR)
- `POST /api/ai/batch-recommend` - Batch recommendations (Admin/HR)

## 🎨 UI Features

- Modern, responsive design
- Dark/light theme support
- Smooth animations
- Loading states
- Toast notifications
- Error handling
- Skeleton loaders
- Mobile-friendly

## 🧪 Testing

### Sample Employee Data
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### Render Deployment

#### Backend
1. Create new Web Service
2. Connect repository
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Add environment variables

#### Frontend
1. Create new Static Site
2. Build command: `cd frontend && npm install && npm run build`
3. Publish directory: `frontend/dist`
4. Add environment variables

## 📊 Features Checklist

- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Employee CRUD Operations
- ✅ Advanced Search & Filtering
- ✅ Performance Analytics
- ✅ AI Recommendations
- ✅ Interactive Charts
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Input Validation
- ✅ MongoDB Integration
- ✅ RESTful API
- ✅ Protected Routes
- ✅ Toast Notifications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

B.Tech AI Driven Full Stack Development Project

## 🙏 Acknowledgments

- OpenRouter for AI API
- MongoDB for database
- React team for amazing framework
- Tailwind CSS for styling utilities
