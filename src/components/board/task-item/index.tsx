import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Popconfirm, Tooltip } from 'antd';
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { DATE_FORMAT } from '@constants/index';
import type { TaskCard, TaskItemType } from '@services/board';
import { CardTaskDetails, Item } from './index.styles';
import Priority from './priority-color';

interface Props {
    index: number;
    item: TaskItemType;
    onFillStateForDragEnd: (data: TaskCard, item: TaskItemType) => void;
    onCurrentCardIdToDelete: (data: TaskCard) => void;
    data: TaskCard;
    onDeleteConfirm: (data: TaskCard, item: TaskItemType, index: number) => void;
    cardTaskDetailsText: string;
    showModal: (data: TaskCard, item: TaskItemType, mode: string) => void;
}

const dialogText = 'Tem certeza que deseja excluir esta tarefa?';

const TaskItem = ({
    cardTaskDetailsText,
    data,
    onCurrentCardIdToDelete,
    onFillStateForDragEnd,
    index,
    item,
    onDeleteConfirm,
    showModal,
}: Props) => (
    <Draggable
        index={index}
        draggableId={item?.id}
    >
        {(cardProvided: DraggableProvided, cardSnapshot: DraggableStateSnapshot) => (
            <Item
                $isDragging={cardSnapshot.isDragging}
                ref={cardProvided.innerRef}
                {...cardProvided.draggableProps}
                {...cardProvided.dragHandleProps}
                onMouseOver={() => onFillStateForDragEnd(data, item)}
                onMouseDown={() => onCurrentCardIdToDelete(data)}
            >
                <Popconfirm
                    placement="right"
                    title={dialogText}
                    onConfirm={() => onDeleteConfirm(data, item, index)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <Tooltip placement="right" title="Excluir Tarefa">
                        <FaTrash />
                    </Tooltip>
                </Popconfirm>
                <Tooltip placement="bottom" title={cardTaskDetailsText}>
                    <CardTaskDetails onClick={() => showModal(data, item, 'edit')}>
                        <h3>{item?.name}</h3>
                        <p className="taskDescription">{item?.description}</p>
                        <Priority priorityLevel={item.priority} />
                        <div className="taskDate">
                            <p>
                                {moment(item?.date[0]).format(DATE_FORMAT)}
                                {' '}
                                -
                                {' '}
                                {moment(item?.date[1]).format(DATE_FORMAT)}
                            </p>
                            <FaCalendarAlt />
                        </div>
                    </CardTaskDetails>
                </Tooltip>
            </Item>
        )}
    </Draggable>
);

export default TaskItem;
