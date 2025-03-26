import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiaryEntry } from '@/types/diary';
import { predefinedCategories } from '@/lib/diaryStore';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryFormProps {
  onSave: (entry: Omit<DiaryEntry, 'id'> & { id?: number, color?: string }) => void;
  onClose: () => void;
  editingEntry: DiaryEntry | null;
  categories: string[];
  onAddCategory: (category: string) => void;
}

export default function EntryForm({ 
  onSave, 
  onClose, 
  editingEntry, 
  categories,
  onAddCategory 
}: EntryFormProps) {
  const [formData, setFormData] = useState<Omit<DiaryEntry, 'id'> & { id?: number, color?: string }>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Личные',
    content: '',
    color: 'category'
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('category');
  
  // Update form data when editing an entry
  useEffect(() => {
    if (editingEntry) {
      setFormData(editingEntry);
    }
  }, [editingEntry]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.category) {
      alert('Пожалуйста, заполните все обязательные поля (заголовок, дата и категория)');
      return;
    }
    
    onSave(formData);
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    
    onAddCategory(newCategory);
    setFormData(prev => ({ ...prev, category: newCategory }));
    setNewCategory('');
  };
  
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    return marked(text);
  };

  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Работа': 'fa-briefcase',
      'Путешествия': 'fa-plane',
      'Личные': 'fa-heart',
      'Здоровье': 'fa-heartbeat',
      'Учёба': 'fa-graduation-cap'
    };
    
    return icons[category] || 'fa-tag';
  };
  
  // Get color by name for color picker
  const getColorByName = (colorName: string) => {
    const colors: Record<string, string> = {
      "blue": "linear-gradient(135deg, #3b82f6, #2563eb)",
      "green": "linear-gradient(135deg, #10b981, #059669)",
      "purple": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      "red": "linear-gradient(135deg, #ef4444, #dc2626)",
      "amber": "linear-gradient(135deg, #f59e0b, #d97706)",
    };
    
    return colors[colorName] || colors["blue"];
  };
  
  // Get category color based on category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Работа": "from-blue-600 to-indigo-600 text-white",
      "Путешествия": "from-emerald-500 to-green-500 text-white",
      "Личные": "from-violet-600 to-purple-600 text-white",
      "Здоровье": "from-rose-500 to-red-500 text-white",
      "Учёба": "from-amber-500 to-yellow-500 text-white",
    };
    
    return colors[category] || "from-gray-500 to-slate-600 text-white";
  };
  
  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, color }));
  };
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 md:p-6 flex-grow overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <i className={`fas ${editingEntry ? 'fa-edit' : 'fa-plus'}`}></i>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {editingEntry ? 'Редактировать запись' : 'Новая запись'}
            </h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
            >
              <i className="fas fa-times"></i>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Title input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <i className="fas fa-heading mr-2 text-blue-500"></i> Заголовок
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full py-5 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              required
            />
          </motion.div>
          
          {/* Date input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <i className="fas fa-calendar-alt mr-2 text-blue-500"></i> Дата
            </label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full py-5 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              required
            />
          </motion.div>
          
          {/* Category selection */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <i className="fas fa-tag mr-2 text-blue-500"></i> Категория
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              <AnimatePresence>
                {predefinedCategories.map((category, index) => (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                    className={`py-2 px-4 rounded-full text-sm border flex items-center transition-all duration-300 ${
                      formData.category === category 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-md' 
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`fas ${getCategoryIcon(category)} mr-2 ${formData.category === category ? 'text-white' : 'text-blue-500'}`}></i>
                    {category}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Новая категория..."
                  className="w-full pl-9 py-5 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-plus-circle"></i>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md py-5 px-4"
                >
                  Добавить
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Color Selection */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <i className="fas fa-palette mr-2 text-blue-500"></i> Цвет карточки
            </label>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-3">
                <motion.button
                  type="button"
                  onClick={() => handleColorSelect('category')}
                  className={`flex items-center justify-center w-12 h-12 rounded-full shadow-sm border-2 transition-all ${
                    formData.color === 'category' ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 dark:border-gray-700'
                  }`}
                  style={{ 
                    background: `linear-gradient(to right, var(--gradient-start), var(--gradient-end))`,
                    '--gradient-start': '#3b82f6',
                    '--gradient-end': '#6366f1'
                  } as React.CSSProperties}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-tag text-white"></i>
                </motion.button>
                
                {['blue', 'green', 'purple', 'red', 'amber'].map(color => (
                  <motion.button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-12 h-12 rounded-full shadow-sm border-2 transition-all ${
                      formData.color === color ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 dark:border-gray-700'
                    }`}
                    style={{ background: getColorByName(color) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
              
              {/* Preview of selected color */}
              <motion.div 
                className="relative flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <i className="fas fa-eye text-blue-500"></i>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Предпросмотр цвета:</span>
                </div>
                <div className="ml-4 flex-grow">
                  <div 
                    className={`h-8 rounded-lg w-full transition-all duration-300 ${formData.color === "category" ? `bg-gradient-to-r ${getCategoryColor(formData.category)}` : ""}`}
                    style={{ 
                      ...(formData.color !== "category" ? { background: getColorByName(formData.color) } : {}),
                      opacity: 0.9
                    }}
                  ></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Content textarea with markdown support */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <i className="fas fa-file-alt mr-2 text-blue-500"></i> Содержание
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(поддерживает Markdown)</span>
              </label>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`text-sm ${previewMode ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'} px-4 py-1 rounded-full transition-all duration-300`}
                >
                  <i className={`fas ${previewMode ? 'fa-edit' : 'fa-eye'} mr-2`}></i>
                  {previewMode ? 'Редактировать' : 'Предпросмотр'}
                </Button>
              </motion.div>
            </div>
            
            <AnimatePresence mode="wait">
              {!previewMode ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-mono rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Начните писать здесь... Используйте Markdown для форматирования."
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="entry-content w-full p-5 min-h-[300px] rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white prose dark:prose-invert max-w-none shadow-inner"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content) || '<div class="text-gray-400 dark:text-gray-500 italic">Предпросмотр содержимого будет отображаться здесь...</div>' }}
                />
              )}
            </AnimatePresence>

            {!previewMode && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <span>Подсказка: Используйте <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded"># Заголовок</code> для создания заголовков, <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">**текст**</code> для жирного текста, <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">- пункт</code> для списков.</span>
              </div>
            )}
          </motion.div>
          
          {/* Form buttons */}
          <motion.div 
            className="flex justify-end gap-3 pt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-5 py-2"
              >
                <i className="fas fa-times mr-2"></i> Отмена
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-5 py-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <i className="fas fa-save mr-2"></i> Сохранить
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}
