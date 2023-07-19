import React from 'react';
import { FormModalContext } from './formModalContext';

export const useFormModal = () => {
  const context = React.useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be within a FormModalProvider');
  }
  return context;
};
