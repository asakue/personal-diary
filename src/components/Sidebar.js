"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const utils_1 = require("@/lib/utils");
const framer_motion_1 = require("framer-motion");
const badge_1 = require("@/components/ui/badge");
function Sidebar({ categories, selectedCategory, searchTerm, onCategorySelect, onSearch, onNewEntry, darkMode, toggleTheme, isMobile, sidebarOpen, toggleSidebar }) {
    const [currentTime, setCurrentTime] = (0, react_1.useState)(new Date());
    const [expandedSection, setExpandedSection] = (0, react_1.useState)("categories");
    const [weatherInfo, setWeatherInfo] = (0, react_1.useState)("Солнечно, +25°C");
    const [inspirationalQuote, setInspirationalQuote] = (0, react_1.useState)({
        text: "Записывай свои мысли, и они превратятся в историю твоей жизни.",
        author: "Неизвестный автор"
    });
    // Time updating effect
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    // Format time for display
    const formatTime = () => {
        return currentTime.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    // Format date for display
    const formatDate = () => {
        return currentTime.toLocaleDateString('ru-RU', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };
    // Toggle section expansion
    const toggleSection = (section) => {
        if (expandedSection === section) {
            setExpandedSection(null);
        }
        else {
            setExpandedSection(section);
        }
    };
    // Get category icon based on category name
    const getCategoryIcon = (category) => {
        const icons = {
            'Работа': 'fa-briefcase',
            'Путешествия': 'fa-plane',
            'Личные': 'fa-heart',
            'Здоровье': 'fa-heartbeat',
            'Учёба': 'fa-graduation-cap'
        };
        return icons[category] || 'fa-tag';
    };
    // Get estimated entries count per category (random for UI mockup)
    const getCategoryCount = (category) => {
        const seed = category.charCodeAt(0) + category.length;
        return Math.max(1, seed % 10);
    };
    // Convert first letter to uppercase
    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    const handleAdvancedSearch = () => {
        // This would open an advanced search modal in a real implementation
        alert('Функция расширенного поиска будет добавлена в следующем обновлении!');
    };
    return (<div className={(0, utils_1.cn)("md:w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-lg z-10 flex flex-col overflow-y-auto", isMobile ? (sidebarOpen ? "block fixed inset-0 w-full md:w-80" : "hidden") : "md:block")}>
      {/* App title and theme toggle */}
      <framer_motion_1.motion.div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600 text-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <framer_motion_1.motion.div animate={{
            rotate: [0, 0, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
        }} transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 5
        }} className="bg-white/20 p-2 rounded-full">
              <i className="fas fa-book-open text-2xl"></i>
            </framer_motion_1.motion.div>
            <h1 className="text-xl font-bold">
              Личный дневник
            </h1>
          </div>
          
          <framer_motion_1.motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}>
            <button_1.Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-white/10">
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-white`}></i>
              <span className="sr-only">{darkMode ? 'Светлая тема' : 'Темная тема'}</span>
            </button_1.Button>
          </framer_motion_1.motion.div>
        </div>
        
        {/* Date and time display with animated background */}
        <framer_motion_1.motion.div className="flex flex-col text-white/90 mt-4 p-3 rounded-lg relative overflow-hidden" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-40">
            {Array.from({ length: 10 }).map((_, index) => (<framer_motion_1.motion.div key={index} className="absolute w-2 h-2 rounded-full bg-white/60" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5
            }} animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
            }} transition={{
                duration: 4,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
            }}/>))}
          </div>
          
          {/* Time with pulse animation */}
          <framer_motion_1.motion.div className="text-4xl font-light flex items-center justify-center mb-2" animate={{ textShadow: ['0 0 5px rgba(255,255,255,0.1)', '0 0 15px rgba(255,255,255,0.3)', '0 0 5px rgba(255,255,255,0.1)'] }} transition={{ duration: 2, repeat: Infinity }}>
            {formatTime()}
          </framer_motion_1.motion.div>
          
          {/* Date with slide-in animation */}
          <framer_motion_1.motion.div className="text-sm text-center" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            {capitalize(formatDate())}
          </framer_motion_1.motion.div>
          
          {/* Decorative line below time */}
          <framer_motion_1.motion.div className="w-16 h-0.5 bg-white/30 mx-auto mt-2" initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1, delay: 0.7 }}/>
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
      
      {/* Mobile sidebar close button */}
      {isMobile && sidebarOpen && (<framer_motion_1.motion.button className="absolute top-4 right-4 md:hidden text-white" onClick={toggleSidebar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileTap={{ scale: 0.9 }}>
          <i className="fas fa-times text-xl"></i>
        </framer_motion_1.motion.button>)}
      
      {/* Action buttons */}
      <framer_motion_1.motion.div className="p-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <framer_motion_1.motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative overflow-hidden">
          <button_1.Button onClick={onNewEntry} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 btn-glow">
            <framer_motion_1.motion.div className="absolute -left-10 -top-10 w-20 h-20 bg-white/20 rounded-full z-0" animate={{
            x: [0, 100, 200],
            y: [0, 50, 100]
        }} transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
        }}/>
            <div className="relative z-10 flex items-center">
              <i className="fas fa-feather-alt text-xl mr-3"></i> 
              <span className="text-base">Новая запись</span>
            </div>
          </button_1.Button>
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
      
      {/* Inspirational quote */}
      <framer_motion_1.motion.div className="mx-4 mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-sm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
        <framer_motion_1.motion.div className="text-blue-800 dark:text-blue-300 italic mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          "{inspirationalQuote.text}"
        </framer_motion_1.motion.div>
        <framer_motion_1.motion.div className="text-blue-600 dark:text-blue-400 text-right text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          — {inspirationalQuote.author}
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
      
      {/* Categories selection with accordion */}
      <framer_motion_1.motion.div className="px-4 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <framer_motion_1.motion.div className="flex items-center justify-between cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750" onClick={() => toggleSection('categories')} whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.7)' }}>
          <div className="flex items-center gap-2">
            <i className="fas fa-layer-group text-blue-500 dark:text-blue-400"></i>
            <h2 className="font-semibold">Категории</h2>
          </div>
          <framer_motion_1.motion.div animate={{ rotate: expandedSection === 'categories' ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>
        
        <framer_motion_1.AnimatePresence>
          {expandedSection === 'categories' && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="space-y-1 ml-2 mb-3">
                <framer_motion_1.motion.button onClick={() => onCategorySelect('all')} className={(0, utils_1.cn)("sidebar-item w-full justify-between", selectedCategory === 'all' && "sidebar-item-active")} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <div className="flex items-center">
                    <i className="fas fa-globe-americas text-lg mr-3 text-blue-500 dark:text-blue-400"></i> 
                    <span>Все записи</span>
                  </div>
                  <badge_1.Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {categories.reduce((acc, cat) => acc + getCategoryCount(cat), 0)}
                  </badge_1.Badge>
                </framer_motion_1.motion.button>
                
                <framer_motion_1.AnimatePresence>
                  {categories.map((category, index) => (<framer_motion_1.motion.button key={category} onClick={() => onCategorySelect(category)} className={(0, utils_1.cn)("sidebar-item w-full justify-between", selectedCategory === category && "sidebar-item-active")} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, delay: 0.05 * index }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                      <div className="flex items-center">
                        <i className={`fas ${getCategoryIcon(category)} text-lg mr-3 text-blue-500 dark:text-blue-400`}></i> 
                        <span>{category}</span>
                      </div>
                      <badge_1.Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {getCategoryCount(category)}
                      </badge_1.Badge>
                    </framer_motion_1.motion.button>))}
                </framer_motion_1.AnimatePresence>
              </div>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </framer_motion_1.motion.div>
      
      {/* Statistics section */}
      <framer_motion_1.motion.div className="px-4 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
        <framer_motion_1.motion.div className="flex items-center justify-between cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750" onClick={() => toggleSection('stats')} whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.7)' }}>
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-pie text-blue-500 dark:text-blue-400"></i>
            <h2 className="font-semibold">Статистика</h2>
          </div>
          <framer_motion_1.motion.div animate={{ rotate: expandedSection === 'stats' ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>
        
        <framer_motion_1.AnimatePresence>
          {expandedSection === 'stats' && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="space-y-4 mb-3 ml-2">
                {/* Statistics grid */}
                <div className="grid grid-cols-2 gap-3">
                  <framer_motion_1.motion.div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-sm flex flex-col items-center justify-center" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <div className="text-3xl font-bold">{categories.length}</div>
                    <div className="text-xs text-white/80">Категорий</div>
                  </framer_motion_1.motion.div>
                  
                  <framer_motion_1.motion.div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-sm flex flex-col items-center justify-center" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <div className="text-3xl font-bold">{categories.reduce((acc, cat) => acc + getCategoryCount(cat), 0)}</div>
                    <div className="text-xs text-white/80">Всего записей</div>
                  </framer_motion_1.motion.div>
                </div>
                
                {/* Streak counter with flame animation */}
                <framer_motion_1.motion.div className="p-4 bg-gradient-to-br from-amber-500 to-red-600 text-white rounded-xl shadow-sm relative overflow-hidden" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col">
                      <div className="text-sm text-white/80">Дни активности</div>
                      <div className="text-3xl font-bold flex items-center gap-1">
                        <framer_motion_1.motion.span className="inline-block" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                          8
                        </framer_motion_1.motion.span>
                        <span className="text-lg font-normal">дней подряд</span>
                      </div>
                    </div>
                    <framer_motion_1.motion.div className="text-4xl" animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
            }} transition={{ duration: 2, repeat: Infinity }}>
                      <i className="fas fa-fire"></i>
                    </framer_motion_1.motion.div>
                  </div>
                  
                  {/* Fire animation in background */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20">
                    {Array.from({ length: 5 }).map((_, index) => (<framer_motion_1.motion.div key={index} className="absolute bottom-0 w-4 h-12 bg-white rounded-full" style={{ left: `${index * 22 + 5}%` }} animate={{
                    height: ["40%", "70%", "40%"],
                    y: [0, -10, 0],
                }} transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}/>))}
                  </div>
                </framer_motion_1.motion.div>
                
                {/* Word counter with detailed stats */}
                <framer_motion_1.motion.div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-sm" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm text-white/80">Написано слов</div>
                      <div className="text-3xl font-bold">1.5K</div>
                    </div>
                    <framer_motion_1.motion.div className="text-3xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                      <i className="fas fa-pencil-alt"></i>
                    </framer_motion_1.motion.div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-white/20 text-xs flex justify-between">
                    <div>
                      <div className="text-white/80">В среднем</div>
                      <div className="text-white font-medium">150 слов/день</div>
                    </div>
                    <div>
                      <div className="text-white/80">Самая длинная запись</div>
                      <div className="text-white font-medium">325 слов</div>
                    </div>
                  </div>
                </framer_motion_1.motion.div>
                
                {/* Progress bar showing completion towards goal */}
                <framer_motion_1.motion.div className="p-4 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-xl shadow-sm" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">Цель на месяц</div>
                    <div className="text-xs font-medium">75%</div>
                  </div>
                  
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <framer_motion_1.motion.div className="h-full bg-white rounded-full" initial={{ width: "0%" }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.5 }}/>
                  </div>
                  
                  <div className="mt-2 text-xs flex justify-between text-white/80">
                    <div>15/20 записей</div>
                    <div>Осталось 5 дней</div>
                  </div>
                </framer_motion_1.motion.div>
              </div>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </framer_motion_1.motion.div>
      
      {/* Search function */}
      <framer_motion_1.motion.div className="p-4 mt-auto" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <div className="relative">
          <input_1.Input type="text" value={searchTerm} onChange={(e) => onSearch(e.target.value)} placeholder="Поиск по записям..." className="w-full pr-10 pl-9 py-6 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow"/>
          <framer_motion_1.motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" animate={{
            rotate: searchTerm ? [0, 15, 0, -15, 0] : 0
        }} transition={{ duration: 0.5, delay: 0.2, repeat: searchTerm ? 0 : 0 }}>
            <i className="fas fa-search"></i>
          </framer_motion_1.motion.div>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchTerm && (<framer_motion_1.motion.button onClick={() => onSearch('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <i className="fas fa-times"></i>
              </framer_motion_1.motion.button>)}
            
            <framer_motion_1.motion.button onClick={handleAdvancedSearch} className="tooltip text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <i className="fas fa-sliders-h"></i>
              <span className="tooltip-text">Расширенный поиск</span>
            </framer_motion_1.motion.button>
          </div>
        </div>
        
        <framer_motion_1.motion.div className="text-xs text-blue-500 dark:text-blue-400 mt-2 ml-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <i className="fas fa-info-circle mr-1"></i> 
          Поиск работает по заголовкам, содержанию и категориям
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
      
      {/* Version info */}
      <framer_motion_1.motion.div className="p-4 pt-0 text-xs text-gray-400 dark:text-gray-500 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        Версия 2.0 • <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Обновления</a>
      </framer_motion_1.motion.div>
    </div>);
}
