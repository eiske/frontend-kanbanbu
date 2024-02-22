import { Button } from 'antd';
import { FaFileImport } from 'react-icons/fa';

interface Props {
    fileName?: string
    readFile?: (e: any) => void
    onImportSubject?: (e: any) => Promise<void>
    mRef: any
}

const ImportSubject = ({ fileName, onImportSubject, readFile, mRef }: Props) => (
    <>
        <div className="addCardHeader"><input style={{ display: 'none' }} ref={mRef} type="file" onChange={readFile} /></div>
        <div className="importCard">
            <FaFileImport />
            <p style={{ textAlign: 'center' }}>{fileName}</p>
            {fileName && (
                <Button style={{ marginBottom: '10px' }} type="primary" key="back" onClick={(e) => onImportSubject?.(e)}>
                    Importar disciplina
                </Button>
            )}
        </div>
    </>
);

export default ImportSubject;
