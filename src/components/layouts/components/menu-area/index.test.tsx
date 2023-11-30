import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MenuArea from '.';

jest.mock('next/router', () => ({
    useRouter: () => ({
        pathname: '/',
    }),
}));

describe('<MenuArea />', () => {
    it('should render navigation menu', () => {
        const { container } = render(
            <MenuArea onClose={jest.fn()} />
        );
        const linkList = container.querySelectorAll('a');
        expect(linkList).toHaveLength(3);
        expect(linkList[0]).toHaveClass('active');
    });
});
