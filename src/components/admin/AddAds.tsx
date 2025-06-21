import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Video, FileText } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function AddAds() {
  const { state, setCurrentView, addAdvertisement } = useAdminContext();
  const [formData, setFormData] = useState({
    eventTitle: 'Ian Rossen Birthday',
    statement: '',
    adType: 'banner' as 'banner' | 'video' | 'image' | 'text',
    content: '',
    mediaUrl: '',
    placement: 'before-question' as 'before-question' | 'after-question' | 'between-questions',
    questionNumber: 1
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a cloud service
      const mockUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, mediaUrl: mockUrl }));
    }
  };

  const handleSubmit = () => {
    if (formData.statement && formData.content) {
      addAdvertisement({
        eventId: '1', // Default event ID
        statement: formData.statement,
        adType: formData.adType,
        content: formData.content,
        mediaUrl: formData.mediaUrl || undefined,
        placement: formData.placement,
        questionNumber: formData.questionNumber,
        isActive: true
      });
      setCurrentView('participants');
    }
  };

  const isFormValid = formData.statement && formData.content;

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
            <h1 className="text-2xl font-bold text-white mb-2">Add New Ads</h1>
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
          <h2 className="text-lg font-semibold">Add New Ads for {formData.eventTitle}</h2>
        </div>

        <div className="p-8 space-y-6">
          {/* Ads Statement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ads Statement</label>
            <textarea
              value={formData.statement}
              onChange={(e) => handleInputChange('statement', e.target.value)}
              rows={3}
              className="w-full p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent resize-none"
              placeholder="Enter advertisement statement"
            />
          </div>

          {/* Placement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Place Ads Before Question Number</label>
            <select
              value={formData.questionNumber}
              onChange={(e) => handleInputChange('questionNumber', parseInt(e.target.value))}
              className="w-full p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>Question {num}</option>
              ))}
            </select>
          </div>

          {/* Ad Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Ad Type</label>
            <select
              value={formData.adType}
              onChange={(e) => handleInputChange('adType', e.target.value)}
              className="w-full p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent"
            >
              <option value="">-- Select Ad Type --</option>
              <option value="banner">Banner</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className="w-full p-3 border-b border-gray-300 focus:border-red-500 focus:outline-none transition-colors bg-transparent resize-none"
              placeholder="Enter advertisement content"
            />
          </div>

          {/* Media Upload */}
          {(formData.adType === 'image' || formData.adType === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Upload Media</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept={formData.adType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    {formData.adType === 'image' ? (
                      <Image className="w-12 h-12 text-gray-400 mb-4" />
                    ) : (
                      <Video className="w-12 h-12 text-gray-400 mb-4" />
                    )}
                    <p className="text-gray-600 mb-2">
                      Click to upload {formData.adType}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formData.adType === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV up to 50MB'}
                    </p>
                  </div>
                </label>
                {formData.mediaUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600">File uploaded successfully</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={() => setCurrentView('participants')}
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
