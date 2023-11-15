import {
    Modal, Button, Input, Skeleton,
} from 'antd';
import useSubjectList from '@hooks/use-subject-list';
import { useRef } from 'react';
import { Subject } from '@services/subjects';
import { addSubject } from '@features/subjects/subjectsSlice';
import { useAppDispatch } from '@hooks/use-redux';
import {
    Container, ListContainer, AddSubjectModal, ListInnerContainer, CardContainerList,
} from './index.styles';
import SubjectCard from './subject-card';
import AddSubject from './add-subject';

const Subjects = () => {
    const {
        fetching,
        fileName,
        handleCancel,
        modalMode,
        onAddSubject,
        onConfirm,
        onEditSubject,
        onExportSubject,
        onImportSubject,
        open,
        readFile,
        setSubjectTitle,
        showModal,
        subjects,
        subjectTitle,
    } = useSubjectList();
    const dispatch = useAppDispatch();
    const subjectTitleBlank = subjectTitle?.trim() === '';
    const fileRef = useRef<HTMLInputElement>();

    const onNavigate = (subject: Subject) => {
        dispatch(addSubject(subject));
    };

    return (
        <Container>
            <ListContainer>
                <Modal
                    title={`${modalMode} disciplina`}
                    open={open}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Fechar
                        </Button>,
                    ]}
                >
                    <AddSubjectModal>
                        <Input
                            placeholder="Nome da disciplina"
                            value={subjectTitle}
                            onChange={(e) => setSubjectTitle(e.target.value)}
                            maxLength={70}
                        />
                        <Button
                            type="primary"
                            disabled={!!subjectTitleBlank}
                            style={{
                                opacity: subjectTitleBlank ? '' : '0.8',
                                cursor: subjectTitleBlank ? 'not-allowed' : '',
                            }}
                            onClick={modalMode !== 'Editar' ? onAddSubject : onEditSubject}
                            loading={fetching}
                        >
                            {modalMode !== 'Editar' ? 'Salvar' : 'Editar'}

                        </Button>
                    </AddSubjectModal>
                </Modal>
                <ListInnerContainer>
                    <Skeleton active loading={fetching}>
                        <CardContainerList>
                            {subjects?.map((subject) => (
                                <SubjectCard
                                    key={subject.subject_id}
                                    subject={subject}
                                    onConfirm={onConfirm}
                                    onExportSubject={onExportSubject}
                                    onNavigate={onNavigate}
                                />
                            ))}
                            <AddSubject
                                isEmpty={subjects.length === 0}
                                showModal={showModal}
                                type="new"
                            />
                            <AddSubject
                                type="import"
                                fileName={fileName}
                                onImportSubject={onImportSubject}
                                readFile={readFile}
                                mRef={fileRef}
                            />
                        </CardContainerList>
                        {subjects.length === 0
                            && <p className="subjectsEmpty">Nenhuma disciplina cadastrada, clique em um botão para adicionar ou importar uma disciplina</p>}
                    </Skeleton>
                </ListInnerContainer>
            </ListContainer>
        </Container>
    );
};

export default Subjects;
