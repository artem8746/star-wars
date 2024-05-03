import React from 'react';

interface Props {
  title: string;
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ title, message }) => (
  <div
    className='mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:text-red-400'
    role='alert'
  >
    <span className='font-medium'>{title}</span> {message}
  </div>
);
