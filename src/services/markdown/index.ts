import api from '@services/api';
import { getUserId } from '@services/utils';
import latinize from 'latinize';

import type { CreateNewPage, PageArray, SaveType } from './index.types';

export const saveMarkdown = ({
    annotationBlockValue,
    savePageName,
    saveUrlId,
    savePageId,
    subjectName,
    saveMarkdownId,
}: SaveType) => api.put(`/user/markdown/${saveMarkdownId}`, {
    annotation_block: { annotationBlock: annotationBlockValue },
    page_name: savePageName,
    url_id: saveUrlId,
    page_id: savePageId,
    subject_name: subjectName,
});

export const getMarkdown = () => api.get(`/user/markdown/${getUserId()}`);

export const createNewPage = ({
    initialEditorState,
    newPageName,
    pageId,
    subjectName,
    subjectPageLink,
}: CreateNewPage) => api.post('/user/markdown', {
    annotation_block: { annotationBlock: initialEditorState },
    page_name: latinize(newPageName),
    url_id: subjectPageLink,
    page_id: pageId,
    subject_name: subjectName,
    users_id: getUserId(),
});

export const deletePage = (markdownId: string) => api.delete(`/user/markdown/${markdownId}`);

export type { CreateNewPage, PageArray, SaveType };
