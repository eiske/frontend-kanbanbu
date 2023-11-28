import { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import useMarkDown from '@hooks/use-markdown';
import {
    Button, Input, Modal, Spin,
} from 'antd';
import { useSearchParams } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';
import {
    AddNewPageModal, MarkdownPanel, MarkedInputContainer, MarketdInputTextAreaContainer,
} from './styles.index';
import TextEditor from './text-editor';
import BlockStyleControls from './block-style-controls';
import InlineStyleControls from './inline-style-controls';
import SideMenu from './side-menu';

const MarkedInput = () => {
    const searchParams = useSearchParams();
    const subjectTitle = searchParams.get('subjectName');

    const {
        cancelNewPageModal,
        editorState,
        handlePageLink,
        hideMarkdownMenu,
        markdownPanelVisible,
        onBlockClick,
        onChangeEditor,
        onConfirmRemove,
        onCreateNewPage,
        onInlineClick,
        onShowMarkupPanel,
        openNewPageModal,
        selectedCoordinates,
        showNewPageModal,
        pageArray,
        pageName,
        newPageName,
        setNewPageName,
        setHideMarkdownMenu,
        setActivePage,
        fetching,
        activePage,
        setMarkdownPanelVisible,
    } = useMarkDown();
    const editor = useRef<any>(null);

    return (
        <MarkedInputContainer>
            <Modal
                open={openNewPageModal}
                title="Adicionar página"
                onCancel={cancelNewPageModal}
                footer={[
                    <Button key="back" onClick={cancelNewPageModal}>
                        Fechar
                    </Button>,
                ]}
            >
                <AddNewPageModal>
                    <Input
                        placeholder="Nome da página"
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                    />
                    <Button
                        type="primary"
                        disabled={newPageName.trim() === ''}
                        style={{
                            opacity: newPageName.trim() === '' ? '' : '0.8',
                        }}
                        onClick={onCreateNewPage}
                    >
                        Adicionar

                    </Button>
                </AddNewPageModal>
            </Modal>
            <SideMenu
                activePage={activePage}
                handlePageLink={handlePageLink}
                hideMarkdownMenu={hideMarkdownMenu}
                isLoading={fetching}
                onConfirmRemove={onConfirmRemove}
                pageArray={pageArray}
                setActivePage={setActivePage}
                setHideMarkdownMenu={setHideMarkdownMenu}
                showNewPageModal={showNewPageModal}
                subjectTitle={subjectTitle}
            />
            <MarketdInputTextAreaContainer>
                <h1>{subjectTitle}</h1>
                <div className="pageName">
                    <h2>{pageName}</h2>
                    {fetching && (
                        <div className="savingMarkdown">
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                            <p>salvando...</p>
                        </div>
                    )}
                </div>
                <TextEditor
                    PageArrayLenght={pageArray.length}
                    editorState={editorState}
                    onChangeEditor={onChangeEditor}
                    onShowMarkupPanel={onShowMarkupPanel}
                    pageName={pageName}
                    ref={editor}
                />
            </MarketdInputTextAreaContainer>
            <MarkdownPanel
                $markdownPanelVisible={markdownPanelVisible}
                rect={selectedCoordinates}
            >
                <div className="markdownPanel" onMouseDown={(event) => event.preventDefault()}>
                    <BlockStyleControls onToggle={onBlockClick} />
                    <InlineStyleControls onToggle={onInlineClick} />
                    <FaTimes onClick={() => setMarkdownPanelVisible('none')} />
                </div>
            </MarkdownPanel>
        </MarkedInputContainer>
    );
};

export default MarkedInput;
