import React from 'react';

interface Props {
  handleClickOutside: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleModalClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalView: React.FC<Props> = ({
  handleModalClose,
  handleClickOutside,
  title,
  children,
}) => {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'
      onClick={handleClickOutside}
    >
      <div className='relative h-4/6 w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl'>
        <div className='relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
          <div className='border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5'>
            <h3 className='text-3xl font-semibold'>{title}</h3>
            <button
              className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none'
              onClick={handleModalClose}
            >
              <span className='block h-6 w-6 text-2xl text-black outline-none focus:outline-none'>
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
