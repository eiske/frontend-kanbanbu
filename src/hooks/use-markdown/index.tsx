import {
    MouseEvent, useEffect, useRef, useState,
} from 'react';
import {
    EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw,
} from 'draft-js';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject } from '@features/subjects/subjectsSlice';
import {
    PageArray,
    createNewPage, deletePage, getMarkdown, saveMarkdown,
} from '@services/markdown';
import { message, notification } from 'antd';
import { v4 } from 'uuid';
import latinize from 'latinize';
import { initialEditorState } from '@pages/subject-annotations/components/text-markdown/marked-input/helper';
import { subjectSelector } from '@store/index';

const useMarkDown = () => {
    const subject = useSelector(subjectSelector);
    const subjectName = subject?.title?.replace(/ /g, '-').toLowerCase() as string;
    const subjectId = subject?.subject_id;
    const dispatch = useDispatch();
    const [selectedCoordinates, setSelectedCoordinates] = useState(0);
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('block');
    const [hideMarkdownMenu, setHideMarkdownMenu] = useState(false);
    const [pageArray, setPageArray] = useState<PageArray[]>([]);
    const [addMarkdownLoad, setAddMarkdownLoad] = useState(false);
    const [addMarkdownUpdate, setAddMarkdownUpdate] = useState(false);
    const [openNewPageModal, setOpenNewPageModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [pageName, setPageName] = useState('');
    const [pageId, setPageId] = useState('');
    const [urlId, setUrlId] = useState('');
    const [markdownId, setMarkdownId] = useState('');
    const [activePage, setActivePage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    const debouncedSave = useRef(debounce(async (annotationBlockValue, savePageName, savePageId, saveMarkdownId, saveUrlId) => {
        try {
            setIsSaving(true);
            await saveMarkdown({ annotationBlockValue, saveMarkdownId, savePageId, savePageName, saveUrlId, subjectName });
            setIsSaving(false);
        } catch (error: any) {
            console.log('error?.response?.data?.error', error?.response?.data?.error);
            setIsSaving(false);
        }
    }, 1000)).current;

    const onChangeEditor = (editor: any) => {
        const contentRaw = convertToRaw(editor.getCurrentContent());

        const filteredResult: any = pageArray.find((obj: any) => obj.url_id.includes(pageId));

        if (filteredResult) {
            filteredResult.annotation_block.annotationBlock = contentRaw;
        }

        setEditorState(editor);
        debouncedSave(contentRaw, pageName, pageId, markdownId, urlId);

        setMarkdownPanelVisible('none');
    };

    const onInlineClick = (e: any) => {
        const nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    const onBlockClick = (e: any) => {
        const nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    };

    const onShowMarkupPanel = (e: MouseEvent<HTMLElement>) => {
        setSelectedCoordinates(e.pageY - 30);
        setMarkdownPanelVisible('block');
    };

    const onCreateNewPage = async () => {
        const newPageId = v4();
        const subjectPageLink = `/subject-annotations/${subjectName}-${subjectId}/${latinize(newPageName.replace(/ /g, '-').toLowerCase())}-${newPageId}`;

        try {
            await createNewPage({ initialEditorState, newPageName, pageId: newPageId, subjectName, subjectPageLink });
            setAddMarkdownUpdate(!addMarkdownUpdate);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }

        dispatch(addSubject(subject));

        setOpenNewPageModal(false);
        setMarkdownPanelVisible('none');
        setPageName(newPageName);
        setActivePage(newPageName);
        setPageId(newPageId);
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(initialEditorState)))));
    };

    const removePage = async (removePageId: any, removeMarkdownId: string) => {
        try {
            await deletePage(removeMarkdownId);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }

        setPageArray((current: any) => current.filter((props: any) => props.page_id !== removePageId));
        setPageName('');
        message.success('Página removida!');
    };

    const onConfirmRemove = (confirmPageId: string, confirmMarkdownId: string) => {
        removePage(confirmPageId, confirmMarkdownId);
        setMarkdownPanelVisible('none');
    };

    const showNewPageModal = () => {
        setOpenNewPageModal(true);
        setHideMarkdownMenu(false);
    };

    const cancelNewPageModal = () => {
        setOpenNewPageModal(false);
    };

    const handlePageLink = (toPageName: any, toPageId: any, toMarkdownId: any, toUrlId: any) => {
        setPageName(toPageName);
        setPageId(toPageId);
        setUrlId(toUrlId);
        setMarkdownId(toMarkdownId);
    };

    useEffect(() => {
        const getMakrdownPages = async () => {
            setAddMarkdownLoad(true);
            try {
                const response = await getMarkdown();
                setPageArray(response.data);
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
            }
            setAddMarkdownLoad(false);
        };

        getMakrdownPages();
    }, [addMarkdownUpdate]);

    useEffect(() => {
        const filteredResult: any = pageArray.find((obj: any) => obj.url_id.includes(pageId));
        if (filteredResult) {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(filteredResult.annotation_block.annotationBlock)))));
        }
    }, [pageArray, pageId, pageName]);

    return {
        onCreateNewPage,
        onChangeEditor,
        onConfirmRemove,
        showNewPageModal,
        cancelNewPageModal,
        onInlineClick,
        onBlockClick,
        onShowMarkupPanel,
        selectedCoordinates,
        markdownPanelVisible,
        hideMarkdownMenu,
        addMarkdownLoad,
        openNewPageModal,
        editorState,
        handlePageLink,
        pageArray,
        pageName,
        newPageName,
        setNewPageName,
        setHideMarkdownMenu,
        setActivePage,
        activePage,
        setMarkdownPanelVisible,
        fetching: isSaving || addMarkdownLoad,
    };
};

export default useMarkDown;
