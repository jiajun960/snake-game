export interface ThemeType {
  colors: {
    background: string;
    primary: string;
    secondary: string;
    text: string;
    snake: string;
    snakeHead: string;
    food: string;
    grid: string;
  };
  shadows: {
    normal: string;
    hover: string;
  };
}

export const lightTheme: ThemeType = {
  colors: {
    background: '#f0f0f0',
    primary: '#4CAF50',
    secondary: '#FF5722',
    text: '#333333',
    snake: '#4CAF50',
    snakeHead: '#388E3C',
    food: '#FF5722',
    grid: '#e0e0e0'
  },
  shadows: {
    normal: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 4px 12px rgba(0, 0, 0, 0.2)'
  }
};

export const darkTheme: ThemeType = {
  colors: {
    background: '#1a1a1a',
    primary: '#66bb6a',
    secondary: '#ff7043',
    text: '#ffffff',
    snake: '#66bb6a',
    snakeHead: '#43a047',
    food: '#ff7043',
    grid: '#2d2d2d'
  },
  shadows: {
    normal: '0 2px 8px rgba(0, 0, 0, 0.3)',
    hover: '0 4px 12px rgba(0, 0, 0, 0.4)'
  }
}; 