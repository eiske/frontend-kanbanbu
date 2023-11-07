import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task, getTasks } from '@services/board';
import { createInitialBoard } from '@helpers/index';
import { v4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import api from '@services/api';
import { getUserId } from '@services/utils';
import useUser from '@hooks/use-user';
import { message, notification } from 'antd';
import { setUserInfo } from '@features/userSession/userSessionSlice';

type BoardItem = {
    id: number;
    name: string;
    description: string;
    priority: string;
    date: [string, string];
};

type Board = {
    title: string;
    items: BoardItem[] | [];
    columnType: string;
};

const useBoard = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    // const user = useSelector(userSelector)
    const [boardTasksLoad, setBoardTasksLoad] = useState(false);
    const [boardUpdate, setBoardUpdate] = useState(false);
    const [board, setBoard] = useState<any>();
    const [cardId, setCardId] = useState('');
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [column, setColumn] = useState('Tarefas');
    const [columnType, setColumnType] = useState('');
    const [columnTypeToDelete, setColumnTypeToDelete] = useState('');
    const [open, setOpen] = useState(false);
    const [taskDueDate, setTaskDueDate] = useState<any>([]);
    const [priority, setPriority] = useState('');
    const [modalMode, setModalMode] = useState('Salvar');
    const [searchTermTitle, setSearchTermTitle] = useState('');
    const [searchTermPriority, setSearchTermPriority] = useState('');
    const [addTaskLoad, setAddTaskLoad] = useState(false);
    const [searchTermTaskDueData, setSearchTermTaskDueData] = useState({
        min: 0,
        max: 0,
    });

    const getInitialBoardState = useCallback(async () => {
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
    }, [boardUpdate]);

    const handleDragEnd = async (destination: any, source: any) => {
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
            // prev = { ...prev };
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
                await api.post(`/user/board-tasks-${columnType}`, {
                    id: cardId,
                    users_id: getUserId(),
                    title: text,
                    description,
                    priority,
                    due_date_start: taskDueDate[0],
                    due_date_end: taskDueDate[1],
                });
                await api.delete(
                    `/user/board-tasks-${columnTypeToDelete}/${cardId}`
                );
            } catch (error: any) {
                /* notification.info({
              message: `${error?.response?.data?.error}`,
              placement: 'top',
            }); */
                console.log(
                    'error?.response?.data?.error',
                    error?.response?.data?.error
                );
            }
        }
    };

    const handleFillStateForDragEnd = (data: any, el: any) => {
        setColumn(data?.columnType);
        setText(el?.name);
        setDescription(el?.description);
        setPriority(el?.priority);
        setTaskDueDate(el?.date);
        setCardId(el?.id);
    };

    const handleCurrentCardIdToDelete = (data: any) => {
        setColumnTypeToDelete(data?.columnType);
    };

    const addItem = async () => {
        try {
            setAddTaskLoad(true);
            await api.post(`/user/board-tasks-${columnType}`, {
                id: v4(),
                users_id: user?.id,
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
            await api.put(`/user/board-tasks-${columnType}/${cardId}`, {
                users_id: user?.id,
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

    const removeItem = async (data: any, el: any, index: any) => {
        try {
            await api.delete(`/user/board-tasks-${data?.columnType}/${el?.id}`);
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

    const onDeleteConfirm = (data: any, el: any, index: any) => {
        removeItem(data, el, index);
    };

    const showModal = (data: any, el?: any, mode?: any) => {
        setOpen(true);
        setColumn(data.title);
        setText(el?.name);
        setDescription(el?.description);
        setPriority(el?.priority);
        setTaskDueDate(el?.date);
        setColumnType(data?.columnType);

        if (mode === 'edit') {
            setModalMode('Editar');
        } else {
            setModalMode('Salvar');
        }
    };

    const onCancel = () => {
        setOpen(false);
    };

    const onChange = (value: any) => {
        setPriority(value);
    };

    const onDateChange = (value: any) => {
        const date = value;
        setTaskDueDate([date[0], date[1]]);
    };

    const onFilterCard = (el: any) => {
        const taskDateStart = el?.date !== undefined ? moment(el?.date[0]).valueOf() : moment();

        if ((taskDateStart) >= moment(searchTermTaskDueData.min) && (taskDateStart) <= moment(searchTermTaskDueData.max)) {
            return el;
        }

        if ((searchTermTaskDueData.min === 0 && searchTermTaskDueData.max === 0)
          && (searchTermPriority === undefined || searchTermPriority === '')
          && el?.name?.toLocaleLowerCase().includes(searchTermTitle?.toLocaleLowerCase())
        ) {
            return el;
        }
        if (searchTermTitle === '' && el?.priority?.toLocaleLowerCase().includes((searchTermPriority).toLocaleLowerCase())
        ) {
            return el;
        }

        return el;
    };

    const handleDateChangeFilter = (value: any) => {
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

    const formatDate = (date: any, mode: any, arrayPosition: any) => {
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
    }, [getInitialBoardState]);

    useEffect(() => {
        if (user) {
            notification.success({
                message: `Bem vindo ${user.name}!`,
                placement: 'bottomLeft',
            });
            // dispatch(setUserInfo({ ...user, name: '' }));
        }
    }, [user]);

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
