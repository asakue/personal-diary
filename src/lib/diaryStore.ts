import { useState, useEffect } from 'react';
import { DiaryEntry } from '@/types/diary';

// No sample entries for first-time users
const sampleEntries: DiaryEntry[] = [];

// Predefined categories
export const predefinedCategories = ["Работа", "Путешествия", "Личные", "Здоровье", "Учёба"];

export function useDiaryStore() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Load entries from localStorage on initial render
  useEffect(() => {
    const storedEntries = localStorage.getItem('diaryEntries');
    const loadedEntries = storedEntries ? JSON.parse(storedEntries) : sampleEntries;
    setEntries(loadedEntries);
    
    // Extract categories from entries
    updateCategoriesList(loadedEntries);
  }, []);
  
  // Update categories list based on entries
  const updateCategoriesList = (currentEntries: DiaryEntry[]) => {
    const categorySet = new Set(currentEntries.map(entry => entry.category));
    setCategories(Array.from(categorySet));
  };
  
  // Create a new entry
  const createEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    const newId = entries.length > 0 
      ? Math.max(...entries.map(e => e.id)) + 1 
      : 1;
    
    const newEntry = {
      ...entry,
      id: newId
    };
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    // Update categories list
    updateCategoriesList(updatedEntries);
    
    return newEntry;
  };
  
  // Update an existing entry
  const updateEntry = (updatedEntry: DiaryEntry) => {
    const updatedEntries = entries.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    // Update categories list
    updateCategoriesList(updatedEntries);
  };
  
  // Delete an entry
  const deleteEntry = (id: number) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    
    // Update categories list
    updateCategoriesList(updatedEntries);
  };
  
  // Add a new category
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
    }
  };
  
  return {
    entries,
    categories,
    createEntry,
    updateEntry,
    deleteEntry,
    addCategory
  };
}
