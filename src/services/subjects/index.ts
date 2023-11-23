import api from '@services/api';
import { getUserId } from '@services/utils';
import { AxiosResponse } from 'axios';
import latinize from 'latinize';
import { Subject } from './index.types';

export type { Subject };

export const getSubjects = async ():
    Promise<AxiosResponse<Subject[]>> => api.get(`/user/subjects/${getUserId()}`);

export const addSubject = async (title: string, fileNameExport?: string) => api.post('/user/subjects', {
    users_id: getUserId(),
    title: latinize(title) || fileNameExport,
});

export const editSubject = async (subjectId: string, subjectTitle: string) => api.put(`/user/subjects/${subjectId}`, {
    title: subjectTitle,
});

export const deleteSubjectMarkdown = async (subjectTitle: string) => api.delete(`/user/subjectsMarkdown/${getUserId()}/${subjectTitle}`);

export const deleteSubject = async (subjectId: string) => api.delete(`/user/subjects/${subjectId}`);

export const exportSubject = async (subject: Subject) => api.get(`/user/markdown/${getUserId()}/${subject.title?.replace(/ /g, '-').toLowerCase()}`);

export const importSubject = async (fileContent: string) => api.post('/user/markdownImport', {
    users_id: getUserId(),
    markdown_data: fileContent,
});
