import React from 'react';
import cn from 'classnames';

interface Props {
  handleClickOutside: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleModalClose: () => void;
  title: string;
  children: React.ReactNode;
  isModalShown: boolean;
}

export const ModalView: React.FC<Props> = ({
  handleModalClose,
  handleClickOutside,
  title,
  children,
  isModalShown,
}) => {
  return (
    <div
      className={
        cn('fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none', {
          hidden: !isModalShown,
        })}
      onClick={handleClickOutside}
    >
      <div className='relative w-full h-4/6 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl'>
        <div className='relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
          <div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200'>
            <h3 className='text-3xl font-semibold'>{title}</h3>
            <button
              className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
              onClick={handleModalClose}
            >
              <span className='block w-6 h-6 text-2xl text-black outline-none focus:outline-none'>
                ×
              </span>
            </button>
          </div>
          <div className='relative flex-auto p-6'>{children}</div>
        </div>
      </div>
    </div>
  );
};
