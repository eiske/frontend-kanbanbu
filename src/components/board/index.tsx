import useBoard from '@hooks/use-board';
import {
    Button, Input, Modal, Popconfirm, Select, Skeleton, Tooltip,
} from 'antd';
import moment from 'moment';
import {
    DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { FaPlus, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import _ from 'lodash';
import MomentPicker from '@components/DatePicker';
import {
    AddTaskContainer, BoardContainer, BoardFilter, Card, CardHeader, CardTaskDetails, Column, Container, Item, PriorityColor,
} from './styles.index';

const { TextArea } = Input;
const { RangePicker } = MomentPicker;

const dateFormat = 'DD/MM/YYYY HH:mm:ss';
const dialogText = 'Tem certeza que deseja excluir esta tarefa?';
const cardTaskDetailsText = 'Clique para ver detalhes desta tarefa';

const Board = () => {
    const { open,
        addItem,
        board,
        column,
        description,
        editItem,
        fetching,
        formatDate,
        handleCurrentCardIdToDelete,
        handleDateChangeFilter,
        handleDragEnd,
        handleFillStateForDragEnd,
        modalMode,
        onCancel,
        onChange,
        onDeleteConfirm,
        onDateChange,
        onFilterCard,
        priority,
        searchTermPriority,
        searchTermTitle,
        setColumnType,
        setDescription,
        setSearchTermPriority,
        setSearchTermTitle,
        setText,
        showModal,
        taskDueDate,
        text } = useBoard();

    const taskTextsBlank = text?.trim() === '' || description?.trim() === '' || taskDueDate === undefined || priority === undefined;

    const renderPriorityColor = (prior: string) => {
        if (prior === 'Baixa') {
            return <PriorityColor color="#BEEC5A"><p>{prior}</p></PriorityColor>;
        } if (prior === 'Média') {
            return <PriorityColor color="#EEE950"><p>{prior}</p></PriorityColor>;
        }
        return <PriorityColor color="#E77669"><p>{prior}</p></PriorityColor>;
    };

    return (
        <Container>
            <Modal
                open={open}
                title={`Coluna "${column}"`}
                onCancel={onCancel}
                style={{ top: 20 }}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Fechar
                    </Button>,
                ]}
            >
                <AddTaskContainer>
                    <Input placeholder="Título" value={text} onChange={(e) => setText(e.target.value)} />
                    <TextArea rows={6} placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Select
                        placeholder="Prioridade"
                        onChange={onChange}
                        value={priority}
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
                        showTime
                        format={dateFormat}
                        value={
                            taskDueDate !== undefined ? (
                                [
                                    moment(formatDate(taskDueDate, modalMode, 0), dateFormat),
                                    moment(formatDate(taskDueDate, modalMode, 1), dateFormat),
                                ]
                            )
                                : null
                        }
                        onChange={onDateChange}
                    />
                    <Button
                        type="primary"
                        disabled={!!taskTextsBlank}
                        style={{
                            opacity: taskTextsBlank ? '' : '0.8',
                            cursor: taskTextsBlank ? 'not-allowed' : '',
                        }}
                        onClick={modalMode !== 'Editar' ? addItem : editItem}
                        loading={fetching}
                    >
                        {`${modalMode} Tarefa`}

                    </Button>
                </AddTaskContainer>
            </Modal>
            <BoardFilter>
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
            </BoardFilter>
            <BoardContainer>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {_.map((board), (data, key) => (
                        <Column key={key} onMouseOver={() => setColumnType(data?.columnType)}>
                            <Droppable droppableId={key}>
                                {(provided: DroppableProvided) => (
                                    <>
                                        <CardHeader>
                                            <div>
                                                <h3>{data.title}</h3>
                                                <span>{board?.[data.title].items.length}</span>
                                            </div>
                                            <Tooltip placement="top" title="Adicionar Tarefa">
                                                <FaPlus color="#fff" onClick={() => showModal(data)} />
                                            </Tooltip>
                                        </CardHeader>
                                        <Card
                                            id="taskCard"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {!fetching ? (
                                                <>
                                                    {data.items.filter((el: any) => onFilterCard(el)).map((el: any, index: number) => el && (
                                                        <Draggable
                                                            key={el?.id}
                                                            index={index}
                                                            draggableId={el?.id}
                                                        >
                                                            {(cardProvided: DraggableProvided, cardSnapshot: DraggableStateSnapshot) => (
                                                                <Item
                                                                    $isDragging={cardSnapshot.isDragging}
                                                                    ref={cardProvided.innerRef}
                                                                    {...cardProvided.draggableProps}
                                                                    {...cardProvided.dragHandleProps}
                                                                    onMouseOver={() => handleFillStateForDragEnd(data, el)}
                                                                    onMouseDown={() => handleCurrentCardIdToDelete(data)}
                                                                >
                                                                    <Popconfirm
                                                                        placement="right"
                                                                        title={dialogText}
                                                                        onConfirm={() => onDeleteConfirm(data, el, index)}
                                                                        okText="Sim"
                                                                        cancelText="Não"
                                                                    >
                                                                        <Tooltip placement="right" title="Excluir Tarefa">
                                                                            <FaTrash />
                                                                        </Tooltip>
                                                                    </Popconfirm>
                                                                    <Tooltip placement="bottom" title={cardTaskDetailsText}>
                                                                        <CardTaskDetails onClick={() => showModal(data, el, 'edit')}>
                                                                            <h3>{el?.name}</h3>
                                                                            <p className="taskDescription">{el?.description}</p>
                                                                            {renderPriorityColor(el?.priority)}
                                                                            <div className="taskDate">
                                                                                <p>
                                                                                    {moment(el?.date[0]).format(dateFormat)}
                                                                                    {' '}
                                                                                    -
                                                                                    {' '}
                                                                                    {moment(el?.date[1]).format(dateFormat)}
                                                                                </p>
                                                                                <FaCalendarAlt />
                                                                            </div>
                                                                        </CardTaskDetails>
                                                                    </Tooltip>
                                                                </Item>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </>
                                            ) : <Skeleton active />}
                                            {provided.placeholder}
                                        </Card>
                                    </>
                                )}
                            </Droppable>
                        </Column>
                    ))}
                </DragDropContext>
            </BoardContainer>
        </Container>
    );
};

export default Board;
