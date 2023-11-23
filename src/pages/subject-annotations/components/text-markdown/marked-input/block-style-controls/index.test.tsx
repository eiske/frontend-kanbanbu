import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BlockStyleControls from '.';
import { BLOCK_TYPES } from '../helper';

describe('<BlockStyleControls />', () => {
    it('should render a div containing a list of StyleButton components', () => {
        const onToggle = jest.fn();

        render(<BlockStyleControls onToggle={onToggle} />);

        expect(screen.getByTestId('controls')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(BLOCK_TYPES.length);
    });
});
