"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntriesList;
const button_1 = require("@/components/ui/button");
const EntryCard_1 = __importDefault(require("./EntryCard"));
const framer_motion_1 = require("framer-motion");
function EntriesList({ entries, searchTerm, selectedCategory, onNewEntry, onEditEntry, onDeleteEntry }) {
    // Get title for entries list
    const getListTitle = () => {
        if (searchTerm) {
            return `Результаты поиска: "${searchTerm}"`;
        }
        else if (selectedCategory !== 'all') {
            return `Категория: ${selectedCategory}`;
        }
        else {
            return 'Все записи';
        }
    };
    // Get icon for category
    const getCategoryIcon = () => {
        const icons = {
            'Работа': 'fa-briefcase',
            'Путешествия': 'fa-plane',
            'Личные': 'fa-heart',
            'Здоровье': 'fa-heartbeat',
            'Учёба': 'fa-graduation-cap'
        };
        if (selectedCategory !== 'all' && icons[selectedCategory]) {
            return icons[selectedCategory];
        }
        return searchTerm ? 'fa-search' : 'fa-book';
    };
    return (<framer_motion_1.motion.div className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="max-w-3xl mx-auto">
        
        {/* Empty state */}
        {entries.length === 0 && (<framer_motion_1.motion.div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: "spring" }}>
            <framer_motion_1.motion.div className="text-gray-500 dark:text-gray-400 mb-6" animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
            }} transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
            }}>
              <i className="fas fa-book-open text-6xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"></i>
            </framer_motion_1.motion.div>
            
            <framer_motion_1.motion.h3 className="text-xl font-medium bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-3" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Записей не найдено
            </framer_motion_1.motion.h3>
            
            <framer_motion_1.motion.p className="text-gray-600 dark:text-gray-400 mb-6" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {searchTerm
                ? 'Нет записей, соответствующих вашему поиску.'
                : 'Начните вести свой дневник прямо сейчас!'}
            </framer_motion_1.motion.p>
            
            <framer_motion_1.motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <button_1.Button onClick={onNewEntry} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <i className="fas fa-plus mr-2"></i> Создать новую запись
              </button_1.Button>
            </framer_motion_1.motion.div>
          </framer_motion_1.motion.div>)}
        
        {/* Entries grid */}
        {entries.length > 0 && (<div className="space-y-6">
            <framer_motion_1.motion.div className="flex justify-between items-center mb-6" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <i className={`fas ${getCategoryIcon()}`}></i>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  {getListTitle()}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <framer_motion_1.motion.span className="text-sm text-gray-600 dark:text-gray-400 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  {entries.length} {entries.length === 1 ? 'запись' :
                entries.length >= 2 && entries.length <= 4 ? 'записи' : 'записей'}
                </framer_motion_1.motion.span>
                <framer_motion_1.motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button_1.Button onClick={onNewEntry} className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-md" size="icon">
                    <i className="fas fa-plus"></i>
                  </button_1.Button>
                </framer_motion_1.motion.div>
              </div>
            </framer_motion_1.motion.div>
            
            <framer_motion_1.motion.div className="space-y-4" transition={{ staggerChildren: 0.1 }}>
              {entries.map((entry, index) => (<EntryCard_1.default key={entry.id} entry={entry} onEdit={() => onEditEntry(entry)} onDelete={() => onDeleteEntry(entry.id)} index={index}/>))}
            </framer_motion_1.motion.div>
          </div>)}
      </div>
    </framer_motion_1.motion.div>);
}
