"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = require("react");
const diaryStore_1 = require("@/lib/diaryStore");
const use_mobile_1 = require("@/hooks/use-mobile");
const Sidebar_1 = __importDefault(require("@/components/Sidebar"));
const EntryForm_1 = __importDefault(require("@/components/EntryForm"));
const EntriesList_1 = __importDefault(require("@/components/EntriesList"));
const Footer_1 = __importDefault(require("@/components/Footer"));
const framer_motion_1 = require("framer-motion");
function Home({ darkMode, toggleTheme }) {
    const { entries, categories, createEntry, updateEntry, deleteEntry, addCategory } = (0, diaryStore_1.useDiaryStore)();
    const isMobile = (0, use_mobile_1.useIsMobile)();
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    const [editingEntry, setEditingEntry] = (0, react_1.useState)(null);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('all');
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [filteredEntries, setFilteredEntries] = (0, react_1.useState)([]);
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    // Filter entries based on category and search term
    (0, react_1.useEffect)(() => {
        let filtered = [...entries];
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(entry => entry.category === selectedCategory);
        }
        // Filter by search term
        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(entry => entry.title.toLowerCase().includes(searchLower) ||
                entry.content.toLowerCase().includes(searchLower) ||
                entry.category.toLowerCase().includes(searchLower));
        }
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setFilteredEntries(filtered);
    }, [entries, selectedCategory, searchTerm]);
    const handleSaveEntry = (formData) => {
        if (formData.id) {
            // Update existing entry
            updateEntry(formData);
        }
        else {
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
    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setShowForm(true);
        setSidebarOpen(false);
    };
    const handleDeleteEntry = (id) => {
        if (window.confirm('Вы действительно хотите удалить эту запись?')) {
            deleteEntry(id);
        }
    };
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setSidebarOpen(false);
    };
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    // Function to render mobile header
    const renderMobileHeader = () => {
        if (!isMobile)
            return null;
        return (<framer_motion_1.motion.div className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md p-4 flex justify-between items-center z-20" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
        <framer_motion_1.motion.button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </framer_motion_1.motion.button>
        <framer_motion_1.motion.h1 className="text-xl font-bold flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <i className="fas fa-book-open mr-2"></i> Личный дневник
        </framer_motion_1.motion.h1>
        <framer_motion_1.motion.button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}>
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </framer_motion_1.motion.button>
      </framer_motion_1.motion.div>);
    };
    // Backdrop for mobile sidebar
    const renderBackdrop = () => {
        if (!isMobile || !sidebarOpen)
            return null;
        return (<framer_motion_1.motion.div className="fixed inset-0 bg-black/50 z-0 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleSidebar}/>);
    };
    return (<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      {renderMobileHeader()}
      
      {/* Main content wrapper */}
      <div className="flex flex-col md:flex-row flex-grow relative">
        {/* Backdrop for mobile sidebar */}
        <framer_motion_1.AnimatePresence>
          {renderBackdrop()}
        </framer_motion_1.AnimatePresence>
        
        {/* Sidebar */}
        <Sidebar_1.default categories={categories} selectedCategory={selectedCategory} searchTerm={searchTerm} onCategorySelect={handleSelectCategory} onSearch={setSearchTerm} onNewEntry={handleNewEntry} darkMode={darkMode} toggleTheme={toggleTheme} isMobile={isMobile} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        
        {/* Main content area */}
        <div className="flex-grow flex flex-col">  
          {/* Show form or entries list */}
          <framer_motion_1.AnimatePresence mode="wait">
            {showForm ? (<EntryForm_1.default key="entry-form" onSave={handleSaveEntry} onClose={() => setShowForm(false)} editingEntry={editingEntry} categories={categories} onAddCategory={addCategory}/>) : (<EntriesList_1.default key="entries-list" entries={filteredEntries} searchTerm={searchTerm} selectedCategory={selectedCategory} onNewEntry={handleNewEntry} onEditEntry={handleEditEntry} onDeleteEntry={handleDeleteEntry}/>)}
          </framer_motion_1.AnimatePresence>
          
          {/* Footer */}
          <Footer_1.default />
        </div>
      </div>
    </div>);
}
