import {
    fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { pageArray } from '@mocks/subject-annotations';
import SideMenu from '.';

const setHideMarkdownMenu = jest.fn();
const setActivePage = jest.fn();
const handlePageLink = jest.fn();
const onConfirmRemove = jest.fn();
const showNewPageModal = jest.fn();

describe('<SideMenu />', () => {
    beforeEach(() => {
        render(<SideMenu
            hideMarkdownMenu={false}
            setHideMarkdownMenu={setHideMarkdownMenu}
            isLoading={false}
            pageArray={pageArray}
            subjectTitle="Subject"
            activePage="Teste"
            setActivePage={setActivePage}
            handlePageLink={handlePageLink}
            onConfirmRemove={onConfirmRemove}
            showNewPageModal={showNewPageModal}
        />);
    });

    it('should display a menu with a list of pages', () => {
        waitFor(() => {
            expect(screen.getByText('Teste')).toBeInTheDocument();
            expect(screen.getByText('pagina')).toBeInTheDocument();
        });
    });

    it('should allow the user to add a new page', () => {
        const addButton = screen.getByText('Adicionar página');
        fireEvent.click(addButton);

        expect(showNewPageModal).toHaveBeenCalled();
    });
});
