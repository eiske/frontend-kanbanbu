import { render, screen } from '@testing-library/react';
import MenuFooter from '.';

describe('<MenuFooter />', () => {
    it('should render menu footer', () => {
        render(
            <MenuFooter logout={jest.fn()} />
        );
        expect(screen.getByText('Sair')).toBeInTheDocument();
    });
});
