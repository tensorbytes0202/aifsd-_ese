import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, X } from 'lucide-react';
import Loader from '../components/Loader';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Development',
    skills: [],
    performanceScore: 75,
    experience: 0,
    position: '',
    salary: '',
  });
  const [skillInput, setSkillInput] = useState('');

  const departments = [
    'Development',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Support',
  ];

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || '/api'}/employees/${id}`
      );
      setFormData(data.data.employee);
    } catch (error) {
      toast.error('Failed to fetch employee');
      navigate('/employees');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL || '/api'}/employees/${id}`,
          formData
        );
        toast.success('Employee updated successfully');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL || '/api'}/employees`,
          formData
        );
        toast.success('Employee created successfully');
      }
      navigate('/employees');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate('/employees')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Employees</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {id ? 'Edit Employee' : 'Add New Employee'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input-field"
              required
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Senior Developer"
            />
          </div>

          <div>
            <label className="label">Performance Score (0-100) *</label>
            <input
              type="number"
              name="performanceScore"
              value={formData.performanceScore}
              onChange={handleChange}
              className="input-field"
              min="0"
              max="100"
              required
            />
          </div>

          <div>
            <label className="label">Experience (years) *</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="input-field"
              min="0"
              max="50"
              step="0.5"
              required
            />
          </div>

          <div>
            <label className="label">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="input-field"
              min="0"
              placeholder="Optional"
            />
          </div>
        </div>

        <div>
          <label className="label">Skills *</label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="input-field flex-1"
              placeholder="Add a skill and press Enter"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn-primary"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full border border-transparent dark:border-primary-800/30"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-primary-900 dark:hover:text-primary-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2 flex-1"
          >
            {loading ? (
              <Loader size="sm" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{id ? 'Update' : 'Create'} Employee</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
