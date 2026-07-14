const fs = require('fs');

const providerPath = 'src/components/LanguageProvider.tsx';
let content = fs.readFileSync(providerPath, 'utf8');

// Find the boundaries
const typeStart = content.indexOf("type Language = 'en'");
const typeEnd = content.indexOf(';', typeStart) + 1;
const typeStr = content.substring(typeStart, typeEnd);

const transStart = content.indexOf('const translations: Record<Language, Record<string, string>> = {');
const transEnd = content.indexOf('};\n\nconst LanguageContext') + 2;
const transStr = content.substring(transStart, transEnd);

// Create translations.ts
const transFileContent = `export ${typeStr}\n\nexport ${transStr}\n`;
fs.writeFileSync('src/lib/translations.ts', transFileContent);

// Update LanguageProvider.tsx
const newContent = content.substring(0, typeStart) + 
                   "import { Language, translations } from '../lib/translations';\n\n" + 
                   content.substring(typeEnd, transStart) + 
                   content.substring(transEnd);

fs.writeFileSync(providerPath, newContent);
console.log('LanguageProvider refactored successfully.');
