import axios from 'axios';

/**
 * AI Service for OpenRouter/OpenAI Integration
 */
class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.apiUrl =
      process.env.AI_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    this.model = process.env.AI_MODEL || 'openai/gpt-3.5-turbo';
  }

  /**
   * Make AI API call
   */
  async makeRequest(messages, temperature = 0.7) {
    try {
      // Validate API key
      if (!this.apiKey) {
        console.warn('⚠️  OpenRouter API key is not configured. Using mock responses.');
        return this.getMockResponse(messages);
      }

      console.log('Making AI request with model:', this.model);

      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages,
          temperature,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
            'X-Title': 'AI Employee Analytics',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI API Error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.warn('⚠️  Invalid API key. Using mock responses for demonstration.');
        return this.getMockResponse(messages);
      }
      throw new Error('AI service temporarily unavailable');
    }
  }

  /**
   * Get mock response for testing without API key
   */
  getMockResponse(messages) {
    const userMessage = messages[messages.length - 1].content.toLowerCase();
    
    if (userMessage.includes('promotion')) {
      return JSON.stringify({
        eligible: true,
        recommendation: "Based on the employee's strong performance score and experience, they are eligible for promotion. They have consistently demonstrated technical excellence and leadership qualities.",
        suggestedRole: "Senior Developer / Team Lead",
        reasoning: "The employee has exceeded performance expectations with a score above 80 and has sufficient experience. They show strong technical skills and potential for leadership roles.",
        areasToImprove: ["Mentoring junior developers", "Project management skills"]
      });
    } else if (userMessage.includes('training')) {
      return JSON.stringify({
        trainings: [
          {
            title: "Advanced Technical Skills",
            description: "Enhance expertise in current technology stack",
            priority: "High",
            duration: "3 months"
          },
          {
            title: "Leadership Development",
            description: "Develop team management and communication skills",
            priority: "Medium",
            duration: "2 months"
          }
        ],
        skillGaps: ["Cloud Architecture", "DevOps", "System Design"],
        careerPath: "Progress from current role to senior position, then to technical lead or architect role"
      });
    } else if (userMessage.includes('feedback')) {
      return JSON.stringify({
        strengths: [
          "Strong technical skills and problem-solving abilities",
          "Consistent high performance and reliability",
          "Good collaboration with team members",
          "Quick learner and adaptable to new technologies"
        ],
        improvements: [
          "Could improve documentation practices",
          "More proactive communication with stakeholders",
          "Time management for multiple projects"
        ],
        feedback: "Overall excellent performance with strong technical capabilities. Focus on developing soft skills and leadership qualities for career advancement.",
        goals: [
          "Lead a major project independently",
          "Mentor 2-3 junior developers",
          "Improve code review participation",
          "Learn advanced system design patterns"
        ]
      });
    } else if (userMessage.includes('skill')) {
      return JSON.stringify({
        missingSkills: ["Cloud Computing (AWS/Azure)", "Microservices Architecture", "CI/CD Pipelines"],
        emergingSkills: ["AI/ML Integration", "Kubernetes", "GraphQL"],
        recommendations: [
          {
            skill: "Cloud Computing",
            priority: "High",
            reason: "Essential for modern application development"
          },
          {
            skill: "System Design",
            priority: "High",
            reason: "Critical for senior-level positions"
          }
        ],
        learningPath: "Start with cloud fundamentals, then move to advanced architecture patterns, and finally explore emerging technologies"
      });
    }
    
    return JSON.stringify({
      message: "AI analysis completed successfully",
      recommendation: "Continue current performance trajectory"
    });
  }

  /**
   * Generate promotion recommendations
   */
  async generatePromotionRecommendation(employee) {
    const prompt = `Analyze this employee profile and provide promotion recommendation:

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years
- Skills: ${employee.skills.join(', ')}

Provide a JSON response with:
1. eligible: boolean (true if performance >= 80 and experience >= 2)
2. recommendation: string (detailed recommendation)
3. suggestedRole: string (next role suggestion)
4. reasoning: string (why they should/shouldn't be promoted)
5. areasToImprove: array of strings (if not eligible)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR analytics AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Generate training suggestions
   */
  async generateTrainingSuggestions(employee) {
    const prompt = `Analyze this employee and suggest training programs:

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Current Skills: ${employee.skills.join(', ')}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years

Provide a JSON response with:
1. trainings: array of objects with {title, description, priority, duration}
2. skillGaps: array of strings (missing important skills)
3. careerPath: string (suggested career progression)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR training and development AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Rank multiple employees
   */
  async rankEmployees(employees) {
    const employeeList = employees
      .map(
        (emp, idx) =>
          `${idx + 1}. ${emp.name} - ${emp.department} - Score: ${emp.performanceScore} - Experience: ${emp.experience}y`
      )
      .join('\n');

    const prompt = `Rank these employees based on overall performance, experience, and potential:

${employeeList}

Provide a JSON response with:
1. rankings: array of objects with {rank, employeeId, name, score, reasoning}
2. topPerformer: object with employee details
3. insights: string (overall team insights)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR analytics AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Generate AI feedback
   */
  async generateFeedback(employee) {
    const performanceCategory =
      employee.performanceScore >= 90
        ? 'Excellent'
        : employee.performanceScore >= 75
        ? 'Good'
        : employee.performanceScore >= 60
        ? 'Average'
        : 'Needs Improvement';

    const prompt = `Generate constructive feedback for this employee:

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Performance Score: ${employee.performanceScore}/100 (${performanceCategory})
- Experience: ${employee.experience} years
- Skills: ${employee.skills.join(', ')}

Provide a JSON response with:
1. strengths: array of strings (3-5 strengths)
2. improvements: array of strings (3-5 areas to improve)
3. feedback: string (detailed constructive feedback)
4. goals: array of strings (3-5 suggested goals)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR performance review AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Analyze skill gaps
   */
  async analyzeSkillGaps(employee, departmentSkills = []) {
    const prompt = `Analyze skill gaps for this employee:

Employee Details:
- Name: ${employee.name}
- Department: ${employee.department}
- Current Skills: ${employee.skills.join(', ')}
- Experience: ${employee.experience} years

Common ${employee.department} skills: ${departmentSkills.join(', ') || 'Not specified'}

Provide a JSON response with:
1. missingSkills: array of strings (important missing skills)
2. emergingSkills: array of strings (trending skills to learn)
3. recommendations: array of objects with {skill, priority, reason}
4. learningPath: string (suggested learning roadmap)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR skill development AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Generate performance summary
   */
  async generatePerformanceSummary(employees) {
    const stats = {
      total: employees.length,
      avgScore:
        employees.reduce((sum, emp) => sum + emp.performanceScore, 0) /
        employees.length,
      avgExperience:
        employees.reduce((sum, emp) => sum + emp.experience, 0) /
        employees.length,
      departments: [...new Set(employees.map((emp) => emp.department))],
    };

    const prompt = `Generate a performance summary report:

Team Statistics:
- Total Employees: ${stats.total}
- Average Performance Score: ${stats.avgScore.toFixed(1)}/100
- Average Experience: ${stats.avgExperience.toFixed(1)} years
- Departments: ${stats.departments.join(', ')}

Top Performers:
${employees
  .sort((a, b) => b.performanceScore - a.performanceScore)
  .slice(0, 3)
  .map((emp) => `- ${emp.name}: ${emp.performanceScore}/100`)
  .join('\n')}

Provide a JSON response with:
1. summary: string (executive summary)
2. trends: array of strings (key trends)
3. recommendations: array of strings (strategic recommendations)
4. concerns: array of strings (areas of concern)
5. highlights: array of strings (positive highlights)

Format as valid JSON only.`;

    const messages = [
      {
        role: 'system',
        content:
          'You are an HR analytics AI assistant. Provide structured JSON responses.',
      },
      { role: 'user', content: prompt },
    ];

    const response = await this.makeRequest(messages);
    return this.parseJSONResponse(response);
  }

  /**
   * Parse JSON response from AI
   */
  parseJSONResponse(response) {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Try to parse directly
      return JSON.parse(response);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      // Return a fallback response
      return {
        error: 'Failed to parse AI response',
        rawResponse: response,
      };
    }
  }
}

export default new AIService();
