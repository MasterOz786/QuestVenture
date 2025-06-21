import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function ParticipantsList() {
  const { state, setCurrentView, deleteParticipant } = useAdminContext();
  const { participants } = state;
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredParticipants = participants.filter(participant =>
    `${participant.firstName} ${participant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, participantId: string) => {
    switch (action) {
      case 'edit':
        // Handle edit logic
        break;
      case 'delete':
        deleteParticipant(participantId);
        break;
    }
    setOpenActionId(null);
  };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Scavenger Hunt</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>FINANCIAL MANAGER</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-6"
      >
        <button
          onClick={() => setCurrentView('add-participant')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD NEW PARTICIPANT
        </button>
        <button
          onClick={() => setCurrentView('add-question')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD NEW QUESTION
        </button>
        <button
          onClick={() => setCurrentView('add-ads')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD NEW ADS
        </button>
        <button
          onClick={() => {/* Handle reset points */}}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          RESET POINTS
        </button>
      </motion.div>

      {/* Participants Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Table Header */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-lg font-semibold">Groups Ian Rossen Birthday</h2>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Action</th>
                <th className="text-left p-4 font-semibold text-gray-900">Title</th>
                <th className="text-left p-4 font-semibold text-gray-900">Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.slice(0, entriesPerPage).map((participant, index) => (
                <motion.tr
                  key={participant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenActionId(openActionId === participant.id ? null : participant.id)}
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
                      >
                        ACTION
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {openActionId === participant.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[150px]"
                          >
                            <div className="py-2">
                              <button
                                onClick={() => handleAction('delete', participant.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                              <button
                                onClick={() => handleAction('edit', participant.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">{participant.firstName} {participant.lastName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">{participant.pointsEarned}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
