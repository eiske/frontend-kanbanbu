import {
    Modal, Button, Input, Tooltip, Popconfirm, Skeleton,
} from 'antd';
import Link from 'next/link';
import {
    FaFileDownload, FaTrash, FaPlus, FaFileImport,
} from 'react-icons/fa';
import useSubjectList from '@hooks/use-subject-list';
import { useRef } from 'react';
import { Subject } from '@services/subjects';
import { addSubject } from '@features/subjects/subjectsSlice';
import { useAppDispatch } from '@hooks/use-redux';
import {
    Container, ListContainer, AddSubjectModal, ListInnerContainer, CardContainerList, CardContainer, AddCard, Card,
} from './index.styles';

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
    const fileRef = useRef<any>();

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
                    {!fetching ? (
                        <>
                            <CardContainerList>
                                {subjects?.map((subject) => (
                                    <CardContainer key={subject.subject_id}>
                                        <div>
                                            <Tooltip placement="top" title="Exportar disciplina">
                                                <FaFileDownload onClick={() => onExportSubject(subject)} />
                                            </Tooltip>
                                            <Popconfirm
                                                placement="right"
                                                title="Tem certeza que deseja excluir esta disciplina?"
                                                onConfirm={() => onConfirm(subject?.subject_id, subject?.title?.replace(/ /g, '-').toLowerCase())}
                                                okText="Sim"
                                                cancelText="Não"
                                            >
                                                <Tooltip placement="top" title="Excluir disicplina">
                                                    <FaTrash />
                                                </Tooltip>
                                            </Popconfirm>
                                        </div>
                                        <Link
                                            title={subject.title}
                                            href={{
                                                pathname: '/subject-annotations',
                                                query: {
                                                    subjectName: subject?.title?.replace(/ /g, '-').toLowerCase(),
                                                    subjectId: subject.subject_id,
                                                },
                                            }}
                                        >
                                            <Tooltip placement="bottom" title="Ver resumos da disciplina">
                                                <Card onClick={() => onNavigate(subject)} key={subject.subject_id} className="subjectCard">
                                                    <img alt="example" src="https://static.thenounproject.com/png/3282617-200.png" />
                                                    <p>{subject.title}</p>
                                                </Card>
                                            </Tooltip>
                                        </Link>
                                    </CardContainer>
                                ))}
                                <Tooltip placement="bottom" title="Adicionar Disciplina">
                                    <AddCard $isSubjectsEmpty={subjects.length === 0} onClick={() => showModal('', 'Adicionar')}>
                                        <div className="addCardHeader" />
                                        <div className="addCardBody">
                                            <FaPlus />
                                        </div>
                                    </AddCard>
                                </Tooltip>
                                <Tooltip placement="bottom" title="Importar Disciplina">
                                    <AddCard $isSubjectsEmpty={subjects.length === 0} onClick={() => fileRef.current.click()}>
                                        <div className="addCardHeader"><input style={{ display: 'none' }} ref={fileRef} type="file" onChange={readFile} /></div>
                                        <div className="importCard">
                                            <FaFileImport />
                                            <p style={{ textAlign: 'center' }}>{fileName}</p>
                                            {fileName && (
                                                <Button style={{ marginBottom: '10px' }} type="primary" key="back" onClick={(e) => onImportSubject(e)}>
                                                    Importar disciplina
                                                </Button>
                                            )}
                                        </div>
                                    </AddCard>
                                </Tooltip>
                            </CardContainerList>
                            {subjects.length === 0
                            && <p className="subjectsEmpty">Nenhuma disciplina cadastrada, clique em um botão para adicionar ou importar uma disciplina</p>}
                        </>
                    ) : (
                        <Skeleton active />
                    )}
                </ListInnerContainer>
            </ListContainer>
        </Container>
    );
};

export default Subjects;
