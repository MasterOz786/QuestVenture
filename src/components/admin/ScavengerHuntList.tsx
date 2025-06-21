import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Edit, Trash2, Users } from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function ScavengerHuntList() {
  const { state, setCurrentView, deleteScavengerHunt, setSelectedHunt } = useAdminContext();
  const { scavengerHunts } = state;
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredHunts = scavengerHunts.filter(hunt =>
    hunt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, huntId: string) => {
    switch (action) {
      case 'edit':
        // Handle edit logic
        break;
      case 'delete':
        deleteScavengerHunt(huntId);
        break;
      case 'copy-link':
        navigator.clipboard.writeText(scavengerHunts.find(h => h.id === huntId)?.webLink || '');
        break;
      case 'view-participants':
        const selectedHunt = scavengerHunts.find(h => h.id === huntId);
        if (selectedHunt) {
          setSelectedHunt(selectedHunt);
          setCurrentView('participants');
        }
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Scavenger Hunt Events</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>FINANCIAL MANAGER</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add New Event Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <button
          onClick={() => setCurrentView('add-event')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          ADD NEW EVENT
        </button>
      </motion.div>

      {/* Events Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Table Header */}
        <div className="bg-red-500 text-white p-4">
          <h2 className="text-lg font-semibold">All Scavenger Hunt</h2>
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
                <th className="text-left p-4 font-semibold text-gray-900">Web Link</th>
                <th className="text-left p-4 font-semibold text-gray-900">Participants</th>
              </tr>
            </thead>
            <tbody>
              {filteredHunts.slice(0, entriesPerPage).map((hunt, index) => (
                <motion.tr
                  key={hunt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenActionId(openActionId === hunt.id ? null : hunt.id)}
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
                      >
                        ACTION
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {openActionId === hunt.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-[180px]"
                          >
                            <div className="py-2">
                              <button
                                onClick={() => handleAction('view-participants', hunt.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Users className="w-4 h-4" />
                                View Participants
                              </button>
                              <button
                                onClick={() => handleAction('edit', hunt.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleAction('delete', hunt.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-red-500 font-medium">{hunt.title}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 text-sm">{hunt.webLink}</span>
                      <button
                        onClick={() => handleAction('copy-link', hunt.id)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        COPY
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">{hunt.participantCount}</span>
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