import { useRef } from 'react';
import {
    FaAngleDoubleLeft, FaAngleDoubleRight, FaPlus, FaRegFile, FaSave, FaTimes, FaTimesCircle,
} from 'react-icons/fa';
import useMarkDown from '@hooks/use-markdown';
import {
    Button, Input, Modal, Popconfirm, Skeleton, Tooltip,
} from 'antd';
import { useSearchParams } from 'next/navigation';
import {
    AddNewPageModal, MarkdownPanel, MarkedInputContainer, MarkedInputMenu, MarketdInputTextAreaContainer,
} from './styles.index';
import { BLOCK_TYPES, INLINE_STYLES } from './helper';
import TextEditor from './text-editor';

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

    const StyleButton = (props: any) => {
        const { onToggle, style, label } = props;
        const onClickButton = (e: any) => {
            e.preventDefault();
            onToggle(style);
        };
        return <button type="button" className="editorToolBarButton" onMouseDown={onClickButton}>{label}</button>;
    };

    const BlockStyleControls = (props: any) => {
        const { onToggle } = props;
        return (
            <div>
                {BLOCK_TYPES.map((type) => (
                    <StyleButton
                        key={type.label}
                        label={type.label}
                        onToggle={onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };

    const InlineStyleControls = (props: any) => {
        const { onToggle } = props;
        return (
            <div>
                {INLINE_STYLES.map((type) => (
                    <StyleButton
                        key={type.label}
                        label={type.label}
                        onToggle={onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };

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
                            cursor: newPageName.trim() === '' ? 'not-allowed' : '',
                        }}
                        onClick={() => onCreateNewPage()}
                    >
                        Adicionar

                    </Button>
                </AddNewPageModal>
            </Modal>
            <MarkedInputMenu hideMarkdownMenu={hideMarkdownMenu}>
                {hideMarkdownMenu
                    ? (
                        <Tooltip placement="right" title="Menu de páginas">
                            <FaAngleDoubleRight onClick={() => setHideMarkdownMenu(false)} />
                        </Tooltip>
                    )
                    : <FaAngleDoubleLeft onClick={() => setHideMarkdownMenu(true)} />}
                <section>
                    {!fetching ? (
                        <>
                            {pageArray.filter((pages: any) => pages.subject_name === subjectTitle?.replace(/ /g, '-').toLowerCase()).map((page: any) => (
                                <div
                                    id={page.page_id}
                                    className={`${activePage === page.page_name && 'activePageLink'}`}
                                    onClick={() => setActivePage(page.page_name)}
                                >
                                    <FaRegFile />
                                    <Button
                                        id={page.page_id}
                                        onClick={() => handlePageLink(page.page_name, page.page_id, page.markdown_id, page.url_id)}
                                        type="text"
                                    >
                                        {page.page_name}
                                    </Button>
                                    <Popconfirm
                                        placement="right"
                                        title="Realmente deseja excluir está página?"
                                        onConfirm={() => onConfirmRemove(page.page_id, page.markdown_id)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Tooltip placement="right" title="Excluir página">
                                            <FaTimesCircle />
                                        </Tooltip>
                                    </Popconfirm>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div style={{ padding: '10px' }}>
                            <Skeleton active />
                        </div>
                    )}
                </section>
                <footer onClick={() => showNewPageModal()}>
                    <FaPlus />
                    Adicionar página
                </footer>
            </MarkedInputMenu>
            <MarketdInputTextAreaContainer>
                <h1>{subjectTitle}</h1>
                {fetching ? (
                    <div className="savingMarkdown">
                        <FaSave size={25} />
                        <h3>Salvando...</h3>
                    </div>
                ) : <div className="savingMarkdown" />}
                <h2>{pageName}</h2>
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
                markdownPanelVisible={markdownPanelVisible}
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
