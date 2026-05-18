import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Brain, TrendingUp, BookOpen, MessageSquare, Target } from 'lucide-react';
import Loader from '../components/Loader';

const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [recommendationType, setRecommendationType] = useState('promotion');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || '/api'}/employees`
      );
      setEmployees(data.data.employees);
    } catch (error) {
      toast.error('Failed to fetch employees');
    }
  };

  const handleGetRecommendation = async () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    setLoading(true);
    setRecommendation(null);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || '/api'}/ai/recommend`,
        {
          employeeId: selectedEmployee,
          type: recommendationType,
        }
      );
      setRecommendation(data.data.recommendation);
      toast.success('AI recommendation generated!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate recommendation');
    } finally {
      setLoading(false);
    }
  };

  const recommendationTypes = [
    { value: 'promotion', label: 'Promotion Analysis', icon: TrendingUp },
    { value: 'training', label: 'Training Suggestions', icon: BookOpen },
    { value: 'feedback', label: 'Performance Feedback', icon: MessageSquare },
    { value: 'skillGap', label: 'Skill Gap Analysis', icon: Target },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">AI Recommendations</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Get AI-powered insights for your employees</p>
      </div>

      {/* Selection Panel */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Select Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="input-field"
            >
              <option value="">Choose an employee...</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} - {emp.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Recommendation Type</label>
            <select
              value={recommendationType}
              onChange={(e) => setRecommendationType(e.target.value)}
              className="input-field"
            >
              {recommendationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGetRecommendation}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader size="sm" />
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Recommendation Display */}
      {recommendation && (
        <div className="card animate-slide-up">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Brain className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">AI Analysis</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recommendationTypes.find((t) => t.value === recommendationType)?.label}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendationType === 'promotion' && (
              <>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-transparent dark:border-blue-800/30">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Eligibility</h3>
                  <p className="text-blue-800 dark:text-blue-200">
                    {recommendation.eligible ? '✅ Eligible for Promotion' : '❌ Not Eligible Yet'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Recommendation</h3>
                  <p className="text-gray-700 dark:text-gray-300">{recommendation.recommendation}</p>
                </div>
                {recommendation.suggestedRole && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Suggested Role</h3>
                    <p className="text-gray-700 dark:text-gray-300">{recommendation.suggestedRole}</p>
                  </div>
                )}
              </>
            )}

            {recommendationType === 'training' && (
              <>
                {recommendation.trainings && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">Recommended Trainings</h3>
                    <div className="space-y-3">
                      {recommendation.trainings.map((training, idx) => (
                        <div key={idx} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-transparent dark:border-green-800/30">
                          <h4 className="font-semibold text-green-900 dark:text-green-300">{training.title}</h4>
                          <p className="text-sm text-green-800 dark:text-green-200 mt-1">{training.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-green-700 dark:text-green-300">
                            <span>Priority: {training.priority}</span>
                            <span>Duration: {training.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {recommendationType === 'feedback' && (
              <>
                {recommendation.strengths && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Strengths</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {recommendation.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendation.improvements && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Areas to Improve</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {recommendation.improvements.map((improvement, idx) => (
                        <li key={idx}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {recommendationType === 'skillGap' && (
              <>
                {recommendation.missingSkills && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.missingSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm border border-transparent dark:border-red-800/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
