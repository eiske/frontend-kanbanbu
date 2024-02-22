import { Subject } from '@services/subjects';
import { Tooltip, Popconfirm } from 'antd';
import Link from 'next/link';
import { FaFileDownload, FaTrash } from 'react-icons/fa';
import { Card, CardContainer } from './index.styles';

interface Props {
    subject: Subject
    onExportSubject: (subject: Subject) => void
    onConfirm: (id?: string, title?: string) => void
    onNavigate: (subject: Subject) => void
}
const SubjectCard = ({ subject, onConfirm, onExportSubject, onNavigate }: Props) => (
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
);

export default SubjectCard;
