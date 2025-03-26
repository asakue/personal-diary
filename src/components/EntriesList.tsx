import { DiaryEntry } from '@/types/diary';
import { Button } from "@/components/ui/button";
import EntryCard from './EntryCard';
import { motion } from 'framer-motion';

interface EntriesListProps {
  entries: DiaryEntry[];
  searchTerm: string;
  selectedCategory: string;
  onNewEntry: () => void;
  onEditEntry: (entry: DiaryEntry) => void;
  onDeleteEntry: (id: number) => void;
}

export default function EntriesList({
  entries,
  searchTerm,
  selectedCategory,
  onNewEntry,
  onEditEntry,
  onDeleteEntry
}: EntriesListProps) {
  
  // Get title for entries list
  const getListTitle = () => {
    if (searchTerm) {
      return `Результаты поиска: "${searchTerm}"`;
    } else if (selectedCategory !== 'all') {
      return `Категория: ${selectedCategory}`;
    } else {
      return 'Все записи';
    }
  };

  // Get icon for category
  const getCategoryIcon = () => {
    const icons: Record<string, string> = {
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
  
  return (
    <motion.div 
      className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        
        {/* Empty state */}
        {entries.length === 0 && (
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div 
              className="text-gray-500 dark:text-gray-400 mb-6"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
            >
              <i className="fas fa-book-open text-6xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent"></i>
            </motion.div>
            
            <motion.h3 
              className="text-xl font-medium bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Записей не найдено
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {searchTerm 
                ? 'Нет записей, соответствующих вашему поиску.' 
                : 'Начните вести свой дневник прямо сейчас!'}
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                onClick={onNewEntry}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <i className="fas fa-plus mr-2"></i> Создать новую запись
              </Button>
            </motion.div>
          </motion.div>
        )}
        
        {/* Entries grid */}
        {entries.length > 0 && (
          <div className="space-y-6">
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <i className={`fas ${getCategoryIcon()}`}></i>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  {getListTitle()}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-sm text-gray-600 dark:text-gray-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {entries.length} {entries.length === 1 ? 'запись' : 
                    entries.length >= 2 && entries.length <= 4 ? 'записи' : 'записей'}
                </motion.span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={onNewEntry}
                    className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-md"
                    size="icon"
                  >
                    <i className="fas fa-plus"></i>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              transition={{ staggerChildren: 0.1 }}
            >
              {entries.map((entry, index) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  onEdit={() => onEditEntry(entry)}
                  onDelete={() => onDeleteEntry(entry.id)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
