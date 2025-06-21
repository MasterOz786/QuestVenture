import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Plus, X, Upload, Image, Video } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function AddQuestion() {
  const { state, setCurrentView, addQuestion } = useAdminContext();
  const [formData, setFormData] = useState({
    eventTitle: 'Ian Rossen Birthday',
    questionType: 'multiple-choice',
    title: '',
    content: '',
    options: ['', ''],
    correctAnswer: '',
    points: 10,
    mediaType: 'none' as 'none' | 'image' | 'video',
    mediaUrl: ''
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

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, options: newOptions }));
    }
  };

  const handleStartOver = () => {
    setFormData({
      eventTitle: 'Ian Rossen Birthday',
      questionType: 'multiple-choice',
      title: '',
      content: '',
      options: ['', ''],
      correctAnswer: '',
      points: 10,
      mediaType: 'none',
      mediaUrl: ''
    });
  };

  const handleNext = () => {
    if (formData.questionType && formData.title) {
      addQuestion({
        eventId: '1', // Default event ID
        type: formData.questionType as any,
        title: formData.title,
        content: formData.content,
        options: formData.questionType === 'multiple-choice' ? formData.options.filter(opt => opt.trim()) : undefined,
        correctAnswer: formData.correctAnswer,
        points: formData.points,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl || undefined
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

          {/* Media Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Add Media (Optional)</label>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleInputChange('mediaType', 'none')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.mediaType === 'none'
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                }`}
              >
                None
              </button>
              <button
                onClick={() => handleInputChange('mediaType', 'image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.mediaType === 'image'
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                }`}
              >
                <Image className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => handleInputChange('mediaType', 'video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.mediaType === 'video'
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                }`}
              >
                <Video className="w-4 h-4" />
                Video
              </button>
            </div>

            {/* Media URL Input */}
            {formData.mediaType !== 'none' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.mediaType === 'image' ? 'Image URL' : 'Video URL'}
                </label>
                <input
                  type="url"
                  value={formData.mediaUrl}
                  onChange={(e) => handleInputChange('mediaUrl', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder={`Enter ${formData.mediaType} URL`}
                />
              </div>
            )}
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
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder={`Option ${index + 1}`}
                    />
                    {formData.options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
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