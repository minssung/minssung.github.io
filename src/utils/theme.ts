type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') as
    | 'light'
    | 'dark';
};

export const setTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('theme', theme);
};

export const toggleTheme = () => {
  const next = getTheme() === 'light' ? 'dark' : 'light';
  setTheme(next);
};
