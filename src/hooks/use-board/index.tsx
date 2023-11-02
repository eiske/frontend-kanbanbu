import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task, getTasks } from '@services/board';
import { createInitialBoard } from '@helpers/index';
import Axios from 'axios';
import api from '@services/api';
import { getUserId } from '@services/utils';
import useUser from '@hooks/use-user';

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
    const [taskDueDate, setTaskDueDate] = useState([]);
    const [priority, setPriority] = useState('');
    const [modalMode, setModalMode] = useState('Salvar');
    const [searchTermTitle, setSearchTermTitle] = useState('');
    const [searchTermPriority, setSearchTermPriority] = useState(undefined);
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
    }, []);

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

    useEffect(() => {
        getInitialBoardState();
    }, [getInitialBoardState]);

    return {
        board,
        setBoardUpdate,
        fetching: boardTasksLoad,
        handleDragEnd,
    };
};

export default useBoard;
