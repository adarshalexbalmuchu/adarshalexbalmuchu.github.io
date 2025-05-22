import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
  theme: 'light', 
  toggleTheme: () => { 
    console.warn("ThemeProvider is not wrapping the component that called toggleTheme."); 
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// Disable the ESLint rule specifically for this custom hook export
// eslint-disable-next-line react-refresh/only-export-components 
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === defaultContextValue || context === undefined) { 
    throw new Error('useTheme must be used within a ThemeProvider. Make sure your App component is wrapped with <ThemeProvider>.');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme as Theme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; 
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
