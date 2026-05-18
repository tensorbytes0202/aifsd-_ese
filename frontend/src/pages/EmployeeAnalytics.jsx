import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const EmployeeAnalytics = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  // Department distribution
  const departmentData = employees.reduce((acc, emp) => {
    const existing = acc.find((d) => d.name === emp.department);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: emp.department, value: 1 });
    }
    return acc;
  }, []);

  // Performance distribution
  const performanceRanges = [
    { range: '0-60', count: 0 },
    { range: '60-75', count: 0 },
    { range: '75-90', count: 0 },
    { range: '90-100', count: 0 },
  ];

  employees.forEach((emp) => {
    if (emp.performanceScore < 60) performanceRanges[0].count++;
    else if (emp.performanceScore < 75) performanceRanges[1].count++;
    else if (emp.performanceScore < 90) performanceRanges[2].count++;
    else performanceRanges[3].count++;
  });

  // Experience vs Performance
  const expVsPerf = employees.map((emp) => ({
    name: emp.name,
    experience: emp.experience,
    performance: emp.performanceScore,
  }));

  // Skills analysis
  const skillsCount = {};
  employees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      skillsCount[skill] = (skillsCount[skill] || 0) + 1;
    });
  });

  const topSkills = Object.entries(skillsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Employee Analytics</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Comprehensive performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Experience vs Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">Experience vs Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expVsPerf.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="experience" stroke="#10b981" name="Experience" />
              <Line type="monotone" dataKey="performance" stroke="#0ea5e9" name="Performance" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Skills */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">Top Skills</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSkills} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="skill" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8b5cf6" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnalytics;
