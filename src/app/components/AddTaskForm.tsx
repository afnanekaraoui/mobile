import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useApp, Task } from '../context/AppContext';

interface AddTaskFormProps {
  onClose: () => void;
}

export function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { tasks, setTasks } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      completed: false,
      dueDate: formData.dueDate || undefined,
      priority: formData.priority
    };

    setTasks([...tasks, newTask]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">New Task</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Description *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Prepare cake for Sarah's order"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
              required
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16524a]"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['high', 'medium', 'low'] as const).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({...formData, priority})}
                  className={`py-3 rounded-lg font-medium transition-all ${
                    formData.priority === priority
                      ? priority === 'high' 
                        ? 'bg-red-500 text-white' 
                        : priority === 'medium'
                        ? 'bg-amber-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#16524a] text-white rounded-full font-medium hover:bg-[#1a5d52] active:scale-[0.98] transition-all mt-6"
          >
            Add Task
          </button>
        </form>

        {/* Home Indicator */}
        <div className="pb-6 flex items-center justify-center">
          <div className="w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
