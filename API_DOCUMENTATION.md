# API Documentation

Base URL: `http://localhost:5000/api` (Development)

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "HR"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "HR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "HR"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "HR"
    }
  }
}
```

---

## Employee Endpoints

### Create Employee
**POST** `/employees`

**Access:** Admin, HR

**Request Body:**
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3,
  "position": "Senior Developer",
  "salary": 80000
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "employee": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Aman Verma",
      "email": "aman@gmail.com",
      "department": "Development",
      "skills": ["React", "Node.js", "MongoDB"],
      "performanceScore": 85,
      "experience": 3,
      "position": "Senior Developer",
      "salary": 80000,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Get All Employees
**GET** `/employees?page=1&limit=10&sort=-performanceScore`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sort` (optional): Sort field (default: -createdAt)

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "totalPages": 5,
  "currentPage": 1,
  "data": {
    "employees": [...]
  }
}
```

### Get Single Employee
**GET** `/employees/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "employee": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Aman Verma",
      ...
    }
  }
}
```

### Update Employee
**PUT** `/employees/:id`

**Access:** Admin, HR

**Request Body:**
```json
{
  "performanceScore": 90,
  "position": "Lead Developer"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "employee": {...}
  }
}
```

### Delete Employee
**DELETE** `/employees/:id`

**Access:** Admin, HR

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": {}
}
```

### Search Employees
**GET** `/employees/search?department=Development&minScore=80`

**Query Parameters:**
- `department` (optional): Filter by department
- `minScore` (optional): Minimum performance score
- `maxScore` (optional): Maximum performance score
- `minExperience` (optional): Minimum experience
- `maxExperience` (optional): Maximum experience
- `search` (optional): Text search in name/email

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "data": {
    "employees": [...]
  }
}
```

### Get Employee Statistics
**GET** `/employees/stats`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalEmployees": 50,
    "avgPerformanceScore": "82.50",
    "departmentStats": [
      { "_id": "Development", "count": 15 },
      { "_id": "Marketing", "count": 10 }
    ],
    "topPerformers": [...],
    "promotionEligible": 12
  }
}
```

---

## AI Recommendation Endpoints

### Get AI Recommendation
**POST** `/ai/recommend`

**Request Body:**
```json
{
  "employeeId": "507f1f77bcf86cd799439011",
  "type": "promotion"
}
```

**Types:** `promotion`, `training`, `feedback`, `skillGap`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "employee": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Aman Verma",
      "department": "Development"
    },
    "recommendation": {
      "eligible": true,
      "recommendation": "Based on excellent performance...",
      "suggestedRole": "Team Lead",
      "reasoning": "Strong technical skills and leadership...",
      "areasToImprove": []
    }
  }
}
```

### Rank Employees
**POST** `/ai/rank`

**Access:** Admin, HR

**Request Body:**
```json
{
  "employeeIds": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012"
  ]
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "rankings": {
      "rankings": [
        {
          "rank": 1,
          "employeeId": "507f1f77bcf86cd799439011",
          "name": "Aman Verma",
          "score": 95,
          "reasoning": "..."
        }
      ],
      "topPerformer": {...},
      "insights": "..."
    }
  }
}
```

### Get Performance Summary
**GET** `/ai/summary`

**Access:** Admin, HR

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "summary": {
      "summary": "Overall team performance is strong...",
      "trends": ["Increasing performance scores", "..."],
      "recommendations": ["Focus on training", "..."],
      "concerns": ["High attrition in Sales", "..."],
      "highlights": ["Development team excelling", "..."]
    }
  }
}
```

### Batch Recommendations
**POST** `/ai/batch-recommend`

**Access:** Admin, HR

**Request Body:**
```json
{
  "department": "Development",
  "minScore": 80,
  "maxScore": 100
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "data": {
    "recommendations": [
      {
        "employeeId": "...",
        "name": "Aman Verma",
        "department": "Development",
        "performanceScore": 85,
        "recommendation": {...}
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized, no token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "User role 'Employee' is not authorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server Error"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

---

## Postman Collection

Import this collection to test all endpoints:

```json
{
  "info": {
    "name": "Employee Analytics API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [...]
}
```

---

*API Documentation Complete*
