export const getItem = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData !== null ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error('Error retrieving data from localStorage:', error);
        return null;
    }
}

export const setItem = (key: string, value: any) => {
    try {
      const serializedData = JSON.stringify(value);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error storing data in localStorage:', error);
    }
  };
  
  export const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
    }
  };