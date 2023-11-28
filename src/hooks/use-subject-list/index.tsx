import latinize from 'latinize';
import {
    Subject, addSubject, deleteSubject, deleteSubjectMarkdown, editSubject, exportSubject, getSubjects, importSubject,
} from '@services/subjects';
import { saveAs } from 'file-saver';
import { message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { setSubjectList } from '@features/subjects/subjectsSlice';
import { useAppDispatch } from '@hooks/use-redux';

const useSubjectList = () => {
    const dispatch = useAppDispatch();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [subjectsLoad, setSubjectsLoad] = useState(false);
    const [updateSubject, setUpdateSubject] = useState(false);
    const [subjectId, setSubjectId] = useState('');
    const [open, setOpen] = useState(false);
    const [subjectTitle, setSubjectTitle] = useState('');
    const [modalMode, setModalMode] = useState('Adicionar');
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');

    const showModal = (title?: string, mode?: string, id?: string) => {
        setOpen(true);
        setSubjectTitle(title as string);
        setModalMode(mode as string);
        setSubjectId(id as string);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onAddSubject = async (fileNameExport: any) => {
        if (subjects.find((subject) => subject.title?.replace(/ /g, '-').toLowerCase() === subjectTitle.replace(/ /g, '-').toLowerCase())) {
            notification.info({
                message: 'Disciplina já adicionada!',
                placement: 'top',
            });
            setFileName('');
        } else {
            try {
                setSubjectsLoad(true);
                await addSubject(subjectTitle, fileNameExport);
                setSubjectsLoad(false);
                setUpdateSubject(!updateSubject);
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
                setSubjectsLoad(false);
            }
            setSubjects((prev) => [...prev, {
                title: latinize(subjectTitle) || fileNameExport,
            }]);
        }
        setOpen(false);
    };

    const onEditSubject = async () => {
        try {
            setSubjectsLoad(true);
            await editSubject(subjectId, subjectTitle);
            setSubjectsLoad(false);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
            setSubjectsLoad(false);
        }
        setOpen(false);
        setUpdateSubject(!updateSubject);
    };

    const onRemoveSubject = async (id: string, title: string) => {
        try {
            await deleteSubjectMarkdown(title);
            await deleteSubject(id);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }
        setSubjects((current) => current.filter((subject) => subject.subject_id !== subjectId));
        setUpdateSubject(!updateSubject);
    };

    const onConfirm = (id = '', title = '') => {
        onRemoveSubject(id, title);
        message.success('Disciplina removida!');
    };

    const onExportSubject = async (subject: Subject) => {
        try {
            const res = await exportSubject(subject);
            const blob = new Blob([JSON.stringify(res.data)], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, `${subject.title}.txt`);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }
    };

    const readFile = (e: any) => {
        const fileReader = new FileReader();
        const { files } = e.target;

        fileReader.readAsText(files[0], 'UTF-8');
        fileReader.onload = (ev) => {
            const content = ev?.target?.result as string;
            setFileContent(JSON.parse(content));
            setFileName(files[0].name);
        };
    };

    const onImportSubject = async (e: any) => {
        e.stopPropagation();
        const removeParenthesis = fileName.replace(/[\])}[{(1-9]/g, '');
        const removeExtension = removeParenthesis.replace('.txt', '');
        const fileNameSanitized = removeExtension.trim();

        if (subjects.find((subject) => subject.title === fileNameSanitized)) {
            notification.info({
                message: 'Disciplina já importada!',
                placement: 'top',
            });
            setFileName('');
        } else {
            try {
                await importSubject(fileContent);
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
            }
            onAddSubject(fileNameSanitized);
            setFileName('');
        }
        setUpdateSubject(!updateSubject);
    };

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                setSubjectsLoad(true);
                const res = await getSubjects();
                setSubjects(res.data);
                dispatch(setSubjectList(res.data));
                setSubjectsLoad(false);
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
                setSubjectsLoad(false);
            }
        };
        loadSubjects();
    }, [dispatch, updateSubject]);

    return {
        fetching: subjectsLoad,
        modalMode,
        open,
        handleCancel,
        subjectTitle,
        setSubjectTitle,
        onAddSubject,
        onEditSubject,
        onExportSubject,
        onConfirm,
        showModal,
        subjects,
        fileName,
        readFile,
        onImportSubject,
    };
};

export default useSubjectList;
