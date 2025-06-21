import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function AddEvent() {
  const { state, setCurrentView, addScavengerHunt } = useAdminContext();
  const [formData, setFormData] = useState({
    title: '',
    groupNames: ['']
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGroupNameChange = (index: number, value: string) => {
    const newGroupNames = [...formData.groupNames];
    newGroupNames[index] = value;
    setFormData(prev => ({ ...prev, groupNames: newGroupNames }));
  };

  const addGroupName = () => {
    setFormData(prev => ({
      ...prev,
      groupNames: [...prev.groupNames, '']
    }));
  };

  const removeGroupName = (index: number) => {
    if (formData.groupNames.length > 1) {
      const newGroupNames = formData.groupNames.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, groupNames: newGroupNames }));
    }
  };

  const handleSubmit = () => {
    if (formData.title && formData.groupNames.some(name => name.trim())) {
      const webLink = `https://velitt.digital/event/${formData.title.toLowerCase().replace(/\s+/g, '-')}`;
      addScavengerHunt({
        title: formData.title,
        webLink,
        groupNames: formData.groupNames.filter(name => name.trim())
      });
      setCurrentView('scavenger-hunts');
    }
  };

  const isFormValid = formData.title && formData.groupNames.some(name => name.trim());

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Add Outdoor Event</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>FINANCIAL MANAGER</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden max-w-2xl mx-auto"
      >
        {/* Form Header */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-lg font-semibold">Add Outdoor Event</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent"
              placeholder="Enter event title"
            />
          </div>

          {/* Group Names */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Group Name</label>
            <div className="space-y-3">
              {formData.groupNames.map((groupName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => handleGroupNameChange(index, e.target.value)}
                    className="flex-1 p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent"
                    placeholder="Enter group name"
                  />
                  {formData.groupNames.length > 1 && (
                    <button
                      onClick={() => removeGroupName(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addGroupName}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Group
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={() => setCurrentView('scavenger-hunts')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              CLOSE
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isFormValid
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}