import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { INLINE_STYLES } from '../helper';
import InlineStyleControls from '.';

describe('<InlineStyleControls />', () => {
    it('should render a div element with multiple StyleButton components', () => {
        const onToggle = jest.fn();

        render(<InlineStyleControls onToggle={onToggle} />);

        expect(screen.getByTestId('inlineControls')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(INLINE_STYLES.length);
    });
});
