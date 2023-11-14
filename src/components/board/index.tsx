import useBoard from '@hooks/use-board';
import {
    Button, Input, Modal, Select, Skeleton, Tooltip,
} from 'antd';
import moment from 'moment';
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import _ from 'lodash';
import { dateFormat } from '@constants/index';
import MomentPicker from '@components/moment-picker';
import type { TaskCard, TaskItemType } from '@services/board';
import {
    AddTaskContainer, BoardContainer, Card, CardHeader, Column, Container,
} from './styles.index';
import BoardFilter from './board-filter';
import TaskItem from './task-item';

const { TextArea } = Input;
const { RangePicker } = MomentPicker;

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
            <BoardFilter
                handleDateChangeFilter={handleDateChangeFilter}
                searchTermPriority={searchTermPriority}
                searchTermTitle={searchTermTitle}
                setSearchTermPriority={setSearchTermPriority}
                setSearchTermTitle={setSearchTermTitle}
            />
            <BoardContainer>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {_.map((board), (data: TaskCard, key) => (
                        <Column key={key} onMouseOver={() => setColumnType(data.columnType)}>
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
                                                    {data.items.filter((el: TaskItemType) => onFilterCard(el)).map((el: any, index: number) => el && (
                                                        <TaskItem
                                                            key={el.id}
                                                            item={el}
                                                            index={index}
                                                            data={data}
                                                            cardTaskDetailsText={cardTaskDetailsText}
                                                            onCurrentCardIdToDelete={handleCurrentCardIdToDelete}
                                                            onFillStateForDragEnd={handleFillStateForDragEnd}
                                                            onDeleteConfirm={onDeleteConfirm}
                                                            showModal={showModal}
                                                        />
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
