import { render, fireEvent } from '@testing-library/react';
import { ModalView } from '@/app/components/ModalView'; // Update with your actual import path

describe('ModalView', () => {
  it('renders the title and children correctly', () => {
    const { getByText } = render(
      <ModalView
        handleClickOutside={() => {}}
        handleModalClose={() => {}}
        title='Test Title'
      >
        <div>Test Child</div>
      </ModalView>
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('calls handleClickOutside when the outer div is clicked', () => {
    const handleClickOutside = jest.fn();
    const { getByText } = render(
      <ModalView
        handleClickOutside={handleClickOutside}
        handleModalClose={() => {}}
        title='Test Title'
      >
        <div>Test Child</div>
      </ModalView>
    );

    fireEvent.click(getByText('Test Title'));
    expect(handleClickOutside).toHaveBeenCalled();
  });

  it('calls handleModalClose when the close button is clicked', () => {
    const handleModalClose = jest.fn();
    const { getByText } = render(
      <ModalView
        handleClickOutside={() => {}}
        handleModalClose={handleModalClose}
        title='Test Title'
      >
        <div>Test Child</div>
      </ModalView>
    );

    fireEvent.click(getByText('×'));
    expect(handleModalClose).toHaveBeenCalled();
  });
});
