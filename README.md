# AI-Based Employee Performance Analytics & Recommendation System
**B.Tech AI Driven Full Stack Development (AI308B) - ESE Examination**

## 🎯 Project Overview
Full-stack MERN application with AI-powered employee performance analytics and recommendations.

## 🔗 Live URLs
- **Frontend**: https://ai-fsd.netlify.app
- **Backend API**: https://ai-based-employee-performance-analytics-zunw.onrender.com
- **GitHub Repository**: https://github.com/aditya3012singh/ai-fsd-ese

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **AI Integration**: OpenRouter API (Llama 3.2 3B Free)
- **Deployment**: Netlify (Frontend), Render (Backend)

## 📋 Features Implemented

### Q1: Frontend Components ✅
- Employee Registration Form
- Employee List Page with Search & Filter
- AI Recommendation Display Page
- Responsive UI with Dark/Light Mode

### Q2: Backend APIs ✅
```
POST /api/employees          - Add Employee
GET /api/employees           - Get All Employees  
GET /api/employees/search    - Search Employees
POST /api/ai/recommend       - AI Recommendations
```

### Q3: Database (MongoDB) ✅
- Employee Schema with validation
- CRUD operations
- Query filtering by department
- Data validation middleware

### Q4: MERN Integration ✅
- React ↔ Express API integration
- MongoDB data fetching
- Dynamic rendering
- Real-time updates

### Q5: AI Integration ✅
- Promotion recommendations
- Training suggestions  
- Performance feedback
- Employee ranking
- Skill gap analysis

### Q6: Authentication & Security ✅
- JWT token authentication
- bcrypt password hashing
- Protected routes
- Login/Signup APIs

### Q7: Git & GitHub ✅
- Clean commit history
- Proper repository structure
- Comprehensive documentation

### Q8: Deployment ✅
- Frontend deployed on Netlify
- Backend deployed on Render
- MongoDB Atlas connection

### Q9: Code Quality ✅
- Organized folder structure
- Proper naming conventions
- Comprehensive comments
- Reusable components

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm run install-all

# Start development servers
npm run dev
```

### Environment Variables
```env
# Backend (.env)
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_api_key
AI_MODEL=meta-llama/llama-3.2-3b-instruct:free

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
```

## 📊 Test Cases Covered

### Employee Management
- ✅ Add valid employee → Success
- ✅ Duplicate email → Error message
- ✅ Missing fields → Validation error
- ✅ Search by department → Filtered results

### Authentication
- ✅ Valid login → JWT token
- ✅ Invalid password → Unauthorized
- ✅ Protected routes → Access control
- ✅ Password encryption → bcrypt hash

### AI Features
- ✅ High performer → Promotion suggestion
- ✅ Low score → Improvement feedback
- ✅ Missing skills → Training recommendations
- ✅ Multiple employees → Ranking system

## 📁 Project Structure
```
ai-employee-performance/
├── backend/
│   ├── controllers/     # API logic
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   └── services/       # AI integration
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Application pages
│   │   └── context/    # State management
└── docs/              # Documentation
```

## 🔧 API Endpoints

### Employee APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Add employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/search` | Search employees |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Authentication APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### AI APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/recommend` | Get AI recommendations |
| POST | `/api/ai/rank` | Rank employees |
| GET | `/api/ai/summary` | Performance summary |

## 📸 Screenshots Required for PDF
1. **Frontend UI** - Dashboard, Employee List, Forms
2. **Postman/Thunder Client** - All API endpoints testing
3. **MongoDB Atlas** - Database collections and documents
4. **Render Deployment** - Successful deployment logs
5. **Live Testing** - Working application URLs

## 🎓 Exam Submission Checklist
- ✅ All 9 questions implemented
- ✅ Live frontend and backend URLs
- ✅ GitHub repository with clean commits
- ✅ Complete documentation
- ✅ Screenshots for PDF report
- ✅ Working AI integration
- ✅ Secure authentication system

---
**Student**: Aditya Singh
**Registration No**: 202401100300020
**Roll No**: 2400291520021
**Course**: AI Driven Full Stack Development (AI308B)  
**Semester**: 4th Semester, Even Sem 2025-26