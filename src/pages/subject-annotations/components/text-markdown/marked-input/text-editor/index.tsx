import { FaRegFileAlt } from 'react-icons/fa';
import { MouseEvent, forwardRef } from 'react';
import { ContentBlock, Editor } from 'draft-js';
import { BlankAnnotationContainer } from './index.styles';
import 'draft-js/dist/Draft.css';

interface Props {
    pageName: string;
    PageArrayLenght: number;
    onShowMarkupPanel: (el: MouseEvent<HTMLElement>) => void;
    editorState: any
    onChangeEditor: (el: any) => void
}

const TextEditor = forwardRef<any, Props>(({ PageArrayLenght, pageName, onShowMarkupPanel, editorState, onChangeEditor }, ref) => {
    const getBlockStyle = (block: ContentBlock) => {
        const styleMap: Record<string, string> = {
            left: 'align-left',
            center: 'align-center',
            right: 'align-right',
        };

        const blockType = block.getType();
        return styleMap[blockType];
    };

    if (pageName === '' || PageArrayLenght === 0) {
        return (
            <BlankAnnotationContainer>
                <FaRegFileAlt />
                <p>Clique ou adicione uma página no menu à esquerda</p>
            </BlankAnnotationContainer>
        );
    }

    return (
        <div onClick={(el) => onShowMarkupPanel(el)} data-testid="editor">
            <Editor
                ref={ref}
                editorState={editorState}
                onChange={(el) => onChangeEditor(el)}
                blockStyleFn={getBlockStyle}
            />
        </div>
    );
});

export default TextEditor;
