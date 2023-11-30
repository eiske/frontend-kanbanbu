import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@store/index';
import Drawer from '.';

jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('<Drawer />', () => {
    it('should render drawer', () => {
        const { container } = render(
            <Provider store={store}>
                <Drawer onClose={jest.fn()} open />
            </Provider>
        );

        waitFor(() => {
            expect(container.querySelector('custom-drawer-menu')).toBeInTheDocument();
        });
    });
});
