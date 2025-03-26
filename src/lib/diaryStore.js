"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predefinedCategories = void 0;
exports.useDiaryStore = useDiaryStore;
const react_1 = require("react");
// No sample entries for first-time users
const sampleEntries = [];
// Predefined categories
exports.predefinedCategories = ["Работа", "Путешествия", "Личные", "Здоровье", "Учёба"];
function useDiaryStore() {
    const [entries, setEntries] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    // Load entries from localStorage on initial render
    (0, react_1.useEffect)(() => {
        const storedEntries = localStorage.getItem('diaryEntries');
        const loadedEntries = storedEntries ? JSON.parse(storedEntries) : sampleEntries;
        setEntries(loadedEntries);
        // Extract categories from entries
        updateCategoriesList(loadedEntries);
    }, []);
    // Update categories list based on entries
    const updateCategoriesList = (currentEntries) => {
        const categorySet = new Set(currentEntries.map(entry => entry.category));
        setCategories(Array.from(categorySet));
    };
    // Create a new entry
    const createEntry = (entry) => {
        const newId = entries.length > 0
            ? Math.max(...entries.map(e => e.id)) + 1
            : 1;
        const newEntry = Object.assign(Object.assign({}, entry), { id: newId });
        const updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        // Save to localStorage
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        // Update categories list
        updateCategoriesList(updatedEntries);
        return newEntry;
    };
    // Update an existing entry
    const updateEntry = (updatedEntry) => {
        const updatedEntries = entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry);
        setEntries(updatedEntries);
        // Save to localStorage
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        // Update categories list
        updateCategoriesList(updatedEntries);
    };
    // Delete an entry
    const deleteEntry = (id) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        // Save to localStorage
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        // Update categories list
        updateCategoriesList(updatedEntries);
    };
    // Add a new category
    const addCategory = (category) => {
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
