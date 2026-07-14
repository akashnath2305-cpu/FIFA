import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Mock the useLanguage hook
const mockSetLanguage = jest.fn();
jest.mock('../components/LanguageProvider', () => ({
  useLanguage: () => ({
    language: 'en',
    setLanguage: mockSetLanguage,
  }),
}));

describe('LanguageSwitcher Component', () => {
  it('should render the default language (EN)', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText(/EN/i)).toBeInTheDocument();
  });

  it('should open the dropdown when clicked', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByText(/EN/i);
    
    // Dropdown should be closed initially (Español should not be visible)
    expect(screen.queryByText('Español')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(button);
    
    // Dropdown should be open
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

  it('should call setLanguage when a new language is selected', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByText(/EN/i);
    
    // Open dropdown
    fireEvent.click(button);
    
    // Click 'Español'
    const spanishOption = screen.getByText('Español');
    fireEvent.click(spanishOption);
    
    // Verify setLanguage was called with 'es'
    expect(mockSetLanguage).toHaveBeenCalledWith('es');
  });
});
