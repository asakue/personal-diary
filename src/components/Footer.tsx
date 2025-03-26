import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  // Обновление года автоматически
  useEffect(() => {
    const interval = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) {
        setYear(currentYear);
      }
    }, 1000 * 60 * 60); // Проверка раз в час
    
    return () => clearInterval(interval);
  }, [year]);

  return (
    <motion.footer 
      className="mt-auto py-4 px-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <motion.div
          className="mb-2 md:mb-0 flex items-center"
          whileHover={{ scale: 1.02 }}
        >
          <span className="mr-1">© {year}</span>
          <span className="text-gradient font-medium">Личный дневник</span>
        </motion.div>
        
        <motion.a
          href="https://github.com/asakue"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fab fa-github text-lg mr-2"></i>
          <span>by asakue</span>
        </motion.a>
      </div>
    </motion.footer>
  );
}