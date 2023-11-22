import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Priority from '.';

describe('<Priority />', () => {
    it('should render a div with the correct background color when a priority level is passed as a prop', () => {
        const { container } = render(<Priority priorityLevel="Baixa" />);
        const div = container.firstChild;
        expect(div).toHaveStyle('background-color: #EDD975');
    });
});
