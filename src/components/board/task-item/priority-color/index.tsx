import { PRIORITY_COLORS } from '@constants/index';
import { PriorityColor } from './index.style';

interface Props {
    priorityLevel: keyof typeof PRIORITY_COLORS
}
const Priority = ({ priorityLevel }: Props) => {
    const color = PRIORITY_COLORS[priorityLevel];

    return <PriorityColor $color={color}><p>{priorityLevel}</p></PriorityColor>;
};

export default Priority;
