"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntryCard;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const utils_1 = require("@/lib/utils");
const marked_1 = require("marked");
const framer_motion_1 = require("framer-motion");
function EntryCard({ entry, onEdit, onDelete, index = 0 }) {
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const [showEmoji, setShowEmoji] = (0, react_1.useState)(false);
    const [mood, setMood] = (0, react_1.useState)(null);
    const [isBookmarked, setIsBookmarked] = (0, react_1.useState)(false);
    const [cardColor, setCardColor] = (0, react_1.useState)("category");
    const cardRef = (0, react_1.useRef)(null);
    // Format date for display
    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };
    // Format time for display
    const formatTime = (dateString) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleTimeString('ru-RU', options);
    };
    // Render markdown to HTML
    const renderMarkdown = (text) => {
        if (!text)
            return '';
        return (0, marked_1.marked)(text);
    };
    // Get category color based on entry category
    const getCategoryColor = (category) => {
        const colors = {
            "Работа": "from-blue-600 to-indigo-600 text-white",
            "Путешествия": "from-emerald-500 to-green-500 text-white",
            "Личные": "from-violet-600 to-purple-600 text-white",
            "Здоровье": "from-rose-500 to-red-500 text-white",
            "Учёба": "from-amber-500 to-yellow-500 text-white",
        };
        return colors[category] || "from-gray-500 to-slate-600 text-white";
    };
    // Get color by name for color picker
    const getColorByName = (colorName) => {
        const colors = {
            "blue": "linear-gradient(135deg, #3b82f6, #2563eb)",
            "green": "linear-gradient(135deg, #10b981, #059669)",
            "purple": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            "red": "linear-gradient(135deg, #ef4444, #dc2626)",
            "amber": "linear-gradient(135deg, #f59e0b, #d97706)",
        };
        return colors[colorName] || colors["blue"];
    };
    // Get mood emoji based on content sentiment analysis (simplified version)
    const getMoodEmoji = (mood) => {
        switch (mood) {
            case 'happy': return '😊';
            case 'excited': return '🎉';
            case 'sad': return '😢';
            case 'angry': return '😠';
            case 'neutral': return '😐';
            default: return '😊';
        }
    };
    // Handle bookmark toggle
    const toggleBookmark = (e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };
    // Handle mood selection
    const handleMoodSelect = (selected) => {
        setMood(selected);
        setShowEmoji(false);
    };
    // Calculate reading time
    const calculateReadingTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime < 1 ? 1 : readingTime;
    };
    // Highlight card effect on scroll
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const isVisible = rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
                if (isVisible) {
                    cardRef.current.classList.add('card-highlight');
                }
                else {
                    cardRef.current.classList.remove('card-highlight');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const readingTime = calculateReadingTime(entry.content);
    return (<framer_motion_1.motion.div ref={cardRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500 card-hover relative group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} layout whileHover={{ y: -5 }}>
      {/* Decorative corner elements */}
      <framer_motion_1.motion.div className="absolute top-0 left-0 w-16 h-16 opacity-60 pointer-events-none overflow-hidden" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}>
        <framer_motion_1.motion.div className="absolute top-0 left-0 w-12 h-12 rotate-45 -translate-x-6 -translate-y-6 bg-white/20" animate={{ rotate: [45, 55, 45], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}/>
      </framer_motion_1.motion.div>
      
      <framer_motion_1.motion.div className="absolute bottom-0 right-0 w-16 h-16 opacity-60 pointer-events-none overflow-hidden" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}>
        <framer_motion_1.motion.div className="absolute bottom-0 right-0 w-12 h-12 rotate-45 translate-x-6 translate-y-6 bg-white/20" animate={{ rotate: [45, 35, 45], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}/>
      </framer_motion_1.motion.div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (<framer_motion_1.motion.div key={i} className="absolute w-2 h-2 rounded-full bg-blue-500/30 dark:bg-blue-400/20" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5
            }} animate={{
                y: [0, -20, 0],
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8],
            }} transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop"
            }}/>))}
      </div>
      
      {/* Entry header with enhanced gradient */}
      <div style={Object.assign(Object.assign({}, (cardColor !== "category" ? { background: getColorByName(cardColor) } : {})), { position: 'relative' })} className={cardColor === "category" ? `p-5 bg-gradient-to-r ${getCategoryColor(entry.category)}` : "p-5 text-white"}>
        
        {/* Animated light effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <framer_motion_1.motion.div className="absolute -inset-full h-[500%] w-[300%] bg-white opacity-20" animate={{
            left: ['200%', '-200%'],
            top: ['200%', '-200%']
        }} transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
        }} style={{
            transform: 'rotate(30deg) translateY(-0%) translateX(0%)',
        }}/>
        </div>
        
        <div className="flex justify-between items-start relative z-10">
          <framer_motion_1.motion.h3 className="text-2xl font-bold text-shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}>
            {entry.title}
          </framer_motion_1.motion.h3>
          <div className="flex items-center gap-2">
            <framer_motion_1.motion.button onClick={toggleBookmark} className="text-white/90 hover:text-white transition-all" whileHover={{ scale: 1.2, rotate: isBookmarked ? [0, -10, 10, -10, 0] : 0 }} whileTap={{ scale: 0.9 }}>
              <i className={`fas ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark'} ${isBookmarked ? 'text-yellow-300' : 'text-white/80'}`}></i>
            </framer_motion_1.motion.button>
            <dropdown_menu_1.DropdownMenu>
              <dropdown_menu_1.DropdownMenuTrigger asChild>
                <button_1.Button variant="ghost" size="icon" className="p-1 rounded-full hover:bg-white/10 text-white h-auto w-auto">
                  <i className="fas fa-ellipsis-v"></i>
                </button_1.Button>
              </dropdown_menu_1.DropdownMenuTrigger>
              <dropdown_menu_1.DropdownMenuContent>
                <dropdown_menu_1.DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <i className="fas fa-edit mr-2"></i> Редактировать
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem onClick={() => setShowEmoji(!showEmoji)} className="cursor-pointer">
                  <i className="fas fa-smile mr-2"></i> Настроение
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600 dark:text-red-400">
                  <i className="fas fa-trash-alt mr-2"></i> Удалить
                </dropdown_menu_1.DropdownMenuItem>
              </dropdown_menu_1.DropdownMenuContent>
            </dropdown_menu_1.DropdownMenu>
          </div>
        </div>
        
        {/* Date display with enhanced styling */}
        <framer_motion_1.motion.div className="flex items-center mt-3 text-white/90 text-sm backdrop-blur-sm bg-white/10 inline-flex rounded-full px-3 py-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}>
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>{formatDate(entry.date)}</span>
          <span className="mx-2 opacity-50">•</span>
          <i className="fas fa-clock mr-2"></i>
          <span>{formatTime(entry.date)}</span>
        </framer_motion_1.motion.div>
      </div>
      
      {/* Meta information bar with enhanced styling */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700">
        <framer_motion_1.motion.div className="flex items-center gap-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.25 + index * 0.1 }}>
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{readingTime}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">мин</span>
          </div>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>
          
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{entry.content.split(/\s+/).length}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">слов</span>
          </div>
        </framer_motion_1.motion.div>
        
        {/* Mood indicator with animation */}
        {mood && (<framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full" whileHover={{
                rotate: [0, 10, -10, 10, 0],
                scale: 1.2,
                transition: { duration: 0.5 }
            }}>
            {getMoodEmoji(mood)}
          </framer_motion_1.motion.div>)}
      </div>
      
      {/* Mood selector popup with enhanced styling */}
      <framer_motion_1.AnimatePresence>
        {showEmoji && (<framer_motion_1.motion.div className="absolute right-4 top-16 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 z-10 border border-gray-200 dark:border-gray-700" initial={{ opacity: 0, scale: 0.8, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -10 }}>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">Выберите настроение</div>
            <div className="flex gap-3 justify-center">
              <framer_motion_1.motion.button onClick={() => handleMoodSelect('happy')} className="text-2xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center h-12 w-12" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                😊
              </framer_motion_1.motion.button>
              <framer_motion_1.motion.button onClick={() => handleMoodSelect('excited')} className="text-2xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center h-12 w-12" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                🎉
              </framer_motion_1.motion.button>
              <framer_motion_1.motion.button onClick={() => handleMoodSelect('neutral')} className="text-2xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center h-12 w-12" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                😐
              </framer_motion_1.motion.button>
              <framer_motion_1.motion.button onClick={() => handleMoodSelect('sad')} className="text-2xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center h-12 w-12" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                😢
              </framer_motion_1.motion.button>
              <framer_motion_1.motion.button onClick={() => handleMoodSelect('angry')} className="text-2xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center h-12 w-12" whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }}>
                😠
              </framer_motion_1.motion.button>
            </div>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>
      
      {/* Entry content with enhanced styling and effects */}
      <div className="relative overflow-hidden group">
        <framer_motion_1.motion.div className="p-5 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Interactive background effect only visible on hover */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {Array.from({ length: 3 }).map((_, i) => (<framer_motion_1.motion.div key={`bg-effect-${i}`} className="absolute rounded-full bg-blue-100/30 dark:bg-blue-900/20" style={{
                height: `${100 + Math.random() * 200}px`,
                width: `${100 + Math.random() * 200}px`,
                left: `${i * 30}%`,
                top: `${Math.random() * 100}%`,
            }} animate={{
                y: [0, -50, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
            }} transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                repeatType: "reverse"
            }}/>))}
          </div>
          
          {/* Content with fancy styling */}
          <framer_motion_1.motion.div className={(0, utils_1.cn)("entry-content prose dark:prose-invert max-w-none relative z-10", !expanded && "line-clamp-3")} dangerouslySetInnerHTML={{ __html: renderMarkdown(entry.content) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}/>
          
          {/* Enhanced gradient overlay for collapsed state */}
          {!expanded && (<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none"></div>)}
        </framer_motion_1.motion.div>
        
        {/* Read more button with enhanced styling */}
        <div className="px-5 pb-5 text-center">
          <framer_motion_1.motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <button_1.Button variant="outline" onClick={() => setExpanded(!expanded)} className="rounded-full text-sm bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-none font-medium px-8 py-2 shadow-md hover:shadow-lg">
              {expanded ? 'Свернуть' : 'Читать полностью'}
              <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} ml-2`}></i>
            </button_1.Button>
          </framer_motion_1.motion.div>
        </div>
      </div>
      
      {/* Enhanced bottom action bar with glass effect */}
      <framer_motion_1.motion.div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/80 dark:bg-gray-750/80 backdrop-blur-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}>
        {/* Color picker with enhanced styling */}
        <framer_motion_1.motion.div className="flex items-center gap-3" whileHover={{ x: 3 }}>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Цвет</span>
          <div className="flex gap-1.5">
            {['category', 'blue', 'green', 'purple', 'red', 'amber'].map((color) => (<framer_motion_1.motion.button key={color} className={`w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center ${cardColor === color ?
                'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 dark:ring-offset-gray-800' :
                'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600'}`} style={{
                background: color === 'category'
                    ? `linear-gradient(to right, var(--gradient-start), var(--gradient-end))`
                    : getColorByName(color),
                '--gradient-start': '#3b82f6',
                '--gradient-end': '#6366f1'
            }} whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }} onClick={(e) => {
                e.stopPropagation();
                setCardColor(color);
            }}>
                {cardColor === color && <i className="fas fa-check text-white text-[10px]"></i>}
              </framer_motion_1.motion.button>))}
          </div>
        </framer_motion_1.motion.div>
        
        {/* Category tag with enhanced styling */}
        <framer_motion_1.motion.div className={`category-tag bg-gradient-to-r ${getCategoryColor(entry.category)} py-1.5 px-4 rounded-full text-sm`} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}>
          <i className="fas fa-tag mr-2 text-xs"></i>
          {entry.category}
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
    </framer_motion_1.motion.div>);
}
