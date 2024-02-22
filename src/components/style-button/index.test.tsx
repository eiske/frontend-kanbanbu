/* eslint-disable react/style-prop-object */
import { fireEvent, render, screen } from '@testing-library/react';
import StyleButton from '.';

const onToggleMock = jest.fn();

describe('<StyleButton />', () => {
    beforeEach(() => {
        render(<StyleButton label="Test Button" onToggle={onToggleMock} style="test-style" />);
    });

    it('should render a button element with the provided label', () => {
        const buttonElement = screen.getByText('Test Button');
        expect(buttonElement).toBeInTheDocument();
    });

    it('should call the onToggle function with the provided style when the button is clicked', () => {
        const buttonElement = screen.getByText('Test Button');
        fireEvent.mouseDown(buttonElement);
        expect(onToggleMock).toHaveBeenCalledWith('test-style');
    });
});
