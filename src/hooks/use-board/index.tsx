import { useCallback, useEffect, useState } from 'react';
import {
    TaskCard, TaskItemType, addBoardTask, deleteBoardTask, editTask, getTasks, updateBoardTasks,
} from '@services/board';
import { createInitialBoard } from '@helpers/index';
import moment, { Moment } from 'moment';
import { message, notification } from 'antd';
import type { DropResult } from 'react-beautiful-dnd';
import { AxiosError } from 'axios';

const useBoard = () => {
    const [boardTasksLoad, setBoardTasksLoad] = useState(false);
    const [boardUpdate, setBoardUpdate] = useState(false);
    const [board, setBoard] = useState<any>();
    const [cardId, setCardId] = useState('');
    const [text, setText] = useState<string | undefined>('');
    const [description, setDescription] = useState<string | undefined>('');
    const [column, setColumn] = useState('Tarefas');
    const [columnType, setColumnType] = useState('');
    const [columnTypeToDelete, setColumnTypeToDelete] = useState('');
    const [open, setOpen] = useState(false);
    const [taskDueDate, setTaskDueDate] = useState<any>();
    const [priority, setPriority] = useState<string | undefined>('');
    const [modalMode, setModalMode] = useState('Salvar');
    const [searchTermTitle, setSearchTermTitle] = useState('');
    const [searchTermPriority, setSearchTermPriority] = useState<string>();
    const [addTaskLoad, setAddTaskLoad] = useState(false);
    const [searchTermTaskDueData, setSearchTermTaskDueData] = useState({
        min: 0,
        max: 0,
    });

    const getInitialBoardState = async () => {
        try {
            setBoardTasksLoad(true);
            const response = await getTasks();
            const { completedList, doingList, todoList } = createInitialBoard(response);
            const initialState = {
                Tarefas: {
                    title: 'Tarefas',
                    items: todoList,
                    columnType: 'todo',
                },
                Fazendo: {
                    title: 'Fazendo',
                    items: doingList,
                    columnType: 'doing',
                },
                Concluído: {
                    title: 'Concluído',
                    items: completedList,
                    columnType: 'completed',
                },
            };

            setBoard(initialState);
            setBoardTasksLoad(false);
        } catch (e) {
            const error = e as AxiosError;

            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.replace('/login');
            }
        }
    };

    const handleDragEnd = useCallback(async ({ destination, source }: DropResult) => {
        if (!destination) {
            return;
        }

        if (
            destination.index === source.index
            && destination.droppableId === source.droppableId
        ) {
            return;
        }

        const itemCopy = { ...board[source.droppableId].items[source.index] };

        setBoard((prev: any) => {
            prev[source.droppableId].items.splice(source.index, 1);

            prev[destination.droppableId].items.splice(
                destination.index,
                0,
                itemCopy
            );

            return prev;
        });

        if (columnType !== columnTypeToDelete) {
            try {
                await updateBoardTasks({
                    columnType,
                    cardId,
                    title: text,
                    description,
                    priority,
                    due_date_start: taskDueDate[0],
                    due_date_end: taskDueDate[1],
                });
                await deleteBoardTask({
                    columnTypeToDelete,
                    cardId,
                });
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
            }
        }
    }, [board, cardId, columnType, columnTypeToDelete, description, priority, taskDueDate, text]);

    const handleFillStateForDragEnd = (data: TaskCard, el: TaskItemType) => {
        setText(el.name);
        setDescription(el.description);
        setPriority(el.priority);
        setTaskDueDate(el.date);
        setCardId(el.id);
        setColumn(data.columnType);
    };

    const handleCurrentCardIdToDelete = (data: TaskCard) => {
        setColumnTypeToDelete(data.columnType);
    };

    const addItem = async () => {
        try {
            setAddTaskLoad(true);
            await addBoardTask({
                columnType,
                title: text,
                description,
                priority,
                due_date_start: moment(taskDueDate[0]).format('YYYY-MM-DDTHH:mm:ssZ'),
                due_date_end: moment(taskDueDate[1]).format('YYYY-MM-DDTHH:mm:ssZ'),
            });
            setBoardUpdate(!boardUpdate);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
            setAddTaskLoad(false);
        }

        setText('');
        setDescription('');
        setTaskDueDate([]);
        setPriority('');
        setOpen(false);
        setAddTaskLoad(false);
        message.success('Tarefa adicionada!');
    };

    const editItem = async () => {
        try {
            setAddTaskLoad(true);
            await editTask({
                columnType,
                cardId,
                title: text,
                description,
                priority,
                due_date_start: taskDueDate[0],
                due_date_end: taskDueDate[1],
            });
            setBoardUpdate(!boardUpdate);
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
            setAddTaskLoad(false);
        }
        setAddTaskLoad(false);
        setOpen(false);
        message.success('Tarefa editada!');
    };
    const removeItem = async (data: TaskCard, el: TaskItemType, index: number) => {
        try {
            await deleteBoardTask({
                columnTypeToDelete: data?.columnType,
                cardId: el.id,
            });
            message.success('Tarefa removida!');
        } catch (error: any) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }

        setBoard((current: any) => {
            const copy = { ...current };

            delete copy[data.title].items[index];

            return copy;
        });
    };

    const onDeleteConfirm = (data: TaskCard, el: TaskItemType, index: number) => {
        removeItem(data, el, index);
    };

    const showModal = (data: TaskCard, el?: TaskItemType, mode?: any) => {
        setText(el?.name);
        setDescription(el?.description);
        setPriority(el?.priority);
        setTaskDueDate(el?.date);
        setOpen(true);
        setColumn(data.title);
        setColumnType(data.columnType);

        if (mode === 'edit') {
            setModalMode('Editar');
        } else {
            setModalMode('Salvar');
        }
    };

    const onCancel = () => {
        setOpen(false);
    };

    const onChange = (value: string) => {
        setPriority(value);
    };

    const onDateChange = (date: any) => {
        setTaskDueDate([date[0], date[1]]);
    };

    const onFilterCard = (el: TaskItemType) => {
        const taskDateStart = el?.date !== undefined ? moment(el?.date[0]).valueOf() : moment();

        if ((taskDateStart) >= moment(searchTermTaskDueData.min) && (taskDateStart) <= moment(searchTermTaskDueData.max)) {
            return el;
        }

        if ((searchTermTaskDueData.min === 0 && searchTermTaskDueData.max === 0)
          && (searchTermPriority === undefined || searchTermPriority === '')
          && el?.name?.toLocaleLowerCase().includes(searchTermTitle?.toLocaleLowerCase())) {
            return el;
        }

        if (searchTermTitle === '' && searchTermPriority !== undefined && el?.priority?.toLocaleLowerCase().includes(searchTermPriority.toLocaleLowerCase())) {
            return el;
        }

        return null;
    };

    const handleDateChangeFilter = (value: [Moment, Moment]) => {
        const date = value;

        if (date === null) {
            setSearchTermTaskDueData((prevState) => ({
                ...prevState,
                min: 0,
                max: 0,
            }));
        } else {
            const min = date[0].toDate().getTime();
            const max = date[1].toDate().getTime();

            setSearchTermTaskDueData((prevState) => ({
                ...prevState,
                min,
                max,
            }));
        }
    };

    const formatDate = (date: string[], mode: string, arrayPosition: number) => {
        if (mode === 'Editar') {
            const d = new Date(date[arrayPosition]);
            let month = `${d.getMonth() + 1}`;
            let day = `${d.getDate()}`;
            const year = d.getFullYear();

            if (month.length < 2) month = `0${month}`;
            if (day.length < 2) day = `0${day}`;

            const taskDate = [day, month, year].join('/');
            const taskTime = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

            return `${taskDate} ${taskTime}`;
        }
        return date[arrayPosition];
    };

    useEffect(() => {
        getInitialBoardState();
    }, [boardUpdate]);

    return {
        addItem,
        board,
        column,
        description,
        editItem,
        fetching: boardTasksLoad || addTaskLoad,
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
        open,
        priority,
        searchTermPriority,
        searchTermTitle,
        setDescription,
        setColumnType,
        setSearchTermPriority,
        setSearchTermTitle,
        setText,
        showModal,
        taskDueDate,
        text,
    };
};

export default useBoard;
