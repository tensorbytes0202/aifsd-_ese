import { Mail, Briefcase, Award, Calendar } from 'lucide-react';

const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{employee.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position || 'Employee'}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getPerformanceColor(
            employee.performanceScore
          )}`}
        >
          {employee.performanceScore}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Mail className="w-4 h-4 mr-2" />
          <span className="text-sm">{employee.email}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Briefcase className="w-4 h-4 mr-2" />
          <span className="text-sm">{employee.department}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Award className="w-4 h-4 mr-2" />
          <span className="text-sm">{employee.experience} years exp</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {employee.skills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full border border-transparent dark:border-primary-800/30"
          >
            {skill}
          </span>
        ))}
        {employee.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
            +{employee.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(employee)}
          className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(employee._id)}
          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
