export const getItem = (key: string) => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const serializedData = localStorage.getItem(key);
    return serializedData !== null ? JSON.parse(serializedData) : null;
  } else {
    const serializedData = sessionStorage.getItem(key);
    return serializedData !== null ? JSON.parse(serializedData) : null;
  }
}

export const setItem = (key: string, value: any) => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } else {
    const serializedData = JSON.stringify(value);
    sessionStorage.setItem(key, serializedData);
  }
};

export const removeItem = (key: string) => {
  if (localStorage.getItem('rememberMe') === 'true') {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};

export const clearItem = () => {
    localStorage.clear();
    sessionStorage.clear();
}