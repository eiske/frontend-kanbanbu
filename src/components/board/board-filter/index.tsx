import { Input, Select } from 'antd';
import MomentPicker from '@components/moment-picker';
import { dateFormat } from '@constants/index';
import { Container } from './index.styles';

const { RangePicker } = MomentPicker;

interface Props {
    searchTermTitle: string;
    setSearchTermTitle: (e: string) => void;
    setSearchTermPriority: (e: string) => void;
    searchTermPriority?: string;
    handleDateChangeFilter: (value: any) => void;
}

const BoardFilter = ({ searchTermPriority, searchTermTitle, setSearchTermPriority, setSearchTermTitle, handleDateChangeFilter }: Props) => (
    <Container>
        <div>
            <Input
                allowClear
                placeholder="Buscar tarefa pelo título"
                value={searchTermTitle}
                onChange={(e) => setSearchTermTitle(e.target.value)}
            />
            <Select
                allowClear
                placeholder="Prioridade"
                onChange={(value) => setSearchTermPriority(value)}
                value={searchTermPriority}
                options={[
                    {
                        value: 'Alta',
                        label: 'Alta',
                    },
                    {
                        value: 'Média',
                        label: 'Média',
                    },
                    {
                        value: 'Baixa',
                        label: 'Baixa',
                    },
                ]}
            />

            <RangePicker
                format={dateFormat}
                onChange={handleDateChangeFilter}
            />
        </div>
    </Container>
);

export default BoardFilter;
