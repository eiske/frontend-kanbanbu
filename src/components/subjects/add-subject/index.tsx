import { Tooltip } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { AddCard } from './index.style';
import ImportSubject from './import-subject';

interface Props {
    isEmpty?: boolean
    showModal?: (title?: string, mode?: string, id?: string) => void
    type: 'new' | 'import'
    fileName?: string
    readFile?: (e: any) => void
    onImportSubject?: (e: any) => Promise<void>
    mRef?: any
}

const AddSubject = ({ isEmpty, showModal, type, fileName, onImportSubject, readFile, mRef }: Props) => {
    const title = type === 'new' ? 'Adicionar Disciplina' : 'Importar Disciplina';
    const onClick = () => {
        if (type === 'new') {
            showModal?.('', 'Adicionar');
        } else {
            mRef?.current?.click();
        }
    };

    return (
        <Tooltip placement="bottom" title={title}>
            <AddCard $isSubjectsEmpty={isEmpty} onClick={onClick}>
                {type === 'new' ? (
                    <>
                        <div className="addCardHeader" />
                        <div className="addCardBody">
                            <FaPlus />
                        </div>
                    </>
                ) : (
                    <ImportSubject
                        fileName={fileName}
                        onImportSubject={onImportSubject}
                        readFile={readFile}
                        mRef={mRef}
                    />
                )}
            </AddCard>
        </Tooltip>
    );
};

export default AddSubject;
