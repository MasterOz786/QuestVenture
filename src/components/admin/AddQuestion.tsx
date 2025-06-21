import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function AddQuestion() {
  const { state, setCurrentView, addQuestion } = useAdminContext();
  const [formData, setFormData] = useState({
    eventTitle: 'Ian Rossen Birthday',
    questionType: 'multiple-choice',
    title: '',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10
  });

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'question-to-answer', label: 'Question to answer' },
    { value: 'code', label: 'Code' },
    { value: 'url', label: 'URL' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartOver = () => {
    setFormData({
      eventTitle: 'Ian Rossen Birthday',
      questionType: 'multiple-choice',
      title: '',
      content: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10
    });
  };

  const handleNext = () => {
    if (formData.questionType && formData.title) {
      addQuestion({
        eventId: '1', // Default event ID
        type: formData.questionType as any,
        title: formData.title,
        content: formData.content,
        options: formData.questionType === 'multiple-choice' ? formData.options : undefined,
        correctAnswer: formData.correctAnswer,
        points: formData.points
      });
      setCurrentView('participants');
    }
  };

  const isFormValid = formData.questionType && formData.title;

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Question</h1>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Add New Question for Ian Rossen Birthday</h2>
              <p className="text-red-100 text-sm">Follow the steps to create a new question</p>
            </div>
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              START OVER
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Question Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Select Question Type</label>
            <div className="space-y-3">
              {questionTypes.map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="questionType"
                    value={type.value}
                    checked={formData.questionType === type.value}
                    onChange={(e) => handleInputChange('questionType', e.target.value)}
                    className="mr-3 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter question title"
            />
          </div>

          {/* Question Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter question content"
            />
          </div>

          {/* Multiple Choice Options (only show for multiple choice) */}
          {formData.questionType === 'multiple-choice' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.options];
                      newOptions[index] = e.target.value;
                      setFormData(prev => ({ ...prev, options: newOptions }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
            <input
              type="text"
              value={formData.correctAnswer}
              onChange={(e) => handleInputChange('correctAnswer', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter correct answer"
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => handleInputChange('points', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="1"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`px-8 py-3 rounded-lg transition-colors ${
                isFormValid
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
