import { useState, useEffect } from 'react';
import { useDiaryStore } from '@/lib/diaryStore';
import { DiaryEntry } from '@/types/diary';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import EntryForm from '@/components/EntryForm';
import EntriesList from '@/components/EntriesList';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Home({ darkMode, toggleTheme }: HomeProps) {
  const { entries, categories, createEntry, updateEntry, deleteEntry, addCategory } = useDiaryStore();
  const isMobile = useIsMobile();
  
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filter entries based on category and search term
  useEffect(() => {
    let filtered = [...entries];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchLower) ||
        entry.content.toLowerCase().includes(searchLower) ||
        entry.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredEntries(filtered);
  }, [entries, selectedCategory, searchTerm]);
  
  const handleSaveEntry = (formData: Omit<DiaryEntry, 'id'> & { id?: number }) => {
    if (formData.id) {
      // Update existing entry
      updateEntry(formData as DiaryEntry);
    } else {
      // Create new entry
      createEntry(formData);
    }
    
    setShowForm(false);
    setEditingEntry(null);
  };
  
  const handleNewEntry = () => {
    setEditingEntry(null);
    setShowForm(true);
    setSidebarOpen(false);
  };
  
  const handleEditEntry = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
    setSidebarOpen(false);
  };
  
  const handleDeleteEntry = (id: number) => {
    if (window.confirm('Вы действительно хотите удалить эту запись?')) {
      deleteEntry(id);
    }
  };
  
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Function to render mobile header
  const renderMobileHeader = () => {
    if (!isMobile) return null;
    
    return (
      <motion.div 
        className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md p-4 flex justify-between items-center z-20"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </motion.button>
        <motion.h1 
          className="text-xl font-bold flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <i className="fas fa-book-open mr-2"></i> Личный дневник
        </motion.h1>
        <motion.button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </motion.button>
      </motion.div>
    );
  };
  
  // Backdrop for mobile sidebar
  const renderBackdrop = () => {
    if (!isMobile || !sidebarOpen) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 bg-black/50 z-0 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleSidebar}
      />
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      {renderMobileHeader()}
      
      {/* Main content wrapper */}
      <div className="flex flex-col md:flex-row flex-grow relative">
        {/* Backdrop for mobile sidebar */}
        <AnimatePresence>
          {renderBackdrop()}
        </AnimatePresence>
        
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onCategorySelect={handleSelectCategory}
          onSearch={setSearchTerm}
          onNewEntry={handleNewEntry}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col">  
          {/* Show form or entries list */}
          <AnimatePresence mode="wait">
            {showForm ? (
              <EntryForm
                key="entry-form"
                onSave={handleSaveEntry}
                onClose={() => setShowForm(false)}
                editingEntry={editingEntry}
                categories={categories}
                onAddCategory={addCategory}
              />
            ) : (
              <EntriesList
                key="entries-list"
                entries={filteredEntries}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onNewEntry={handleNewEntry}
                onEditEntry={handleEditEntry}
                onDeleteEntry={handleDeleteEntry}
              />
            )}
          </AnimatePresence>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
