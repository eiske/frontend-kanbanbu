import { render, screen } from '@testing-library/react';
import TextEditor from '.';

jest.mock('draft-js', () => ({
    Editor: jest.fn(),
}));

describe('<TextEditor />', () => {
    it('should render TextEditor component with correct props', () => {
        const pageName = 'Test Page';
        const PageArrayLenght = 1;
        const onShowMarkupPanel = jest.fn();
        const editorState = {};
        const onChangeEditor = jest.fn();

        render(<TextEditor
            pageName={pageName}
            PageArrayLenght={PageArrayLenght}
            onShowMarkupPanel={onShowMarkupPanel}
            editorState={editorState}
            onChangeEditor={onChangeEditor}
        />);

        expect(screen.getByTestId('editor')).toBeInTheDocument();
    });
});
