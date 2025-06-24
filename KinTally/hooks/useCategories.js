import React, { createContext, useContext, useState } from 'react';
import { defaultCategories } from '../constants/defaultCategories';
import { nanoid } from 'nanoid/non-secure';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories);

  const addCategory = (name) => {
    if (!categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      setCategories((prev) => [
        ...prev,
        {
          id: nanoid(),
          name,
          color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        },
      ]);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
