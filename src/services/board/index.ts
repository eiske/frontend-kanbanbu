/* eslint-disable camelcase */
import { AxiosResponse } from 'axios';
import { v4 } from 'uuid';
import api from '../api';
import { getUserId } from '../utils';
import type {
    BoardColumn, Task, TaskItemType, TaskCard,
} from './index.types';

type TaskPayload = {
    columnType?: string,
    cardId?: string,
    title?: string,
    description?: string,
    priority?: string,
    due_date_start?: any,
    due_date_end?: any,
    columnTypeToDelete?: string,
}

export const getTasks = async () => {
    const [resTasksTodo, resTasksDoing, resTasksCompleted] = await Promise.all<
        AxiosResponse<Task[]>
    >([
        api.get(`/user/board-tasks-todo/${getUserId()}`),
        api.get(`/user/board-tasks-doing/${getUserId()}`),
        api.get(`/user/board-tasks-completed/${getUserId()}`),
    ]);

    return {
        tasksTodo: resTasksTodo.data,
        tasksDoing: resTasksDoing.data,
        tasksCompleted: resTasksCompleted.data,
    };
};

export const updateBoardTasks = ({
    columnType,
    cardId,
    title,
    description,
    priority,
    due_date_start,
    due_date_end,
}: TaskPayload) => api.post(`/user/board-tasks-${columnType}`, {
    id: cardId,
    users_id: getUserId(),
    title,
    description,
    priority,
    due_date_start,
    due_date_end,
});

export const deleteBoardTask = ({
    columnTypeToDelete,
    cardId,
}: TaskPayload) => {
    console.log('columnTypeToDelete: ', columnTypeToDelete);

    return api.delete(
        `/user/board-tasks-${columnTypeToDelete}/${cardId}`
    );
};

export const addBoardTask = ({
    columnType,
    title,
    description,
    priority,
    due_date_start,
    due_date_end,
}: TaskPayload) => api.post(`/user/board-tasks-${columnType}`, {
    id: v4(),
    users_id: getUserId(),
    title,
    description,
    priority,
    due_date_start,
    due_date_end,
});

export const editTask = ({
    columnType,
    cardId,
    title,
    description,
    priority,
    due_date_end,
    due_date_start,

}: TaskPayload) => api.put(`/user/board-tasks-${columnType}/${cardId}`, {
    users_id: getUserId(),
    title,
    description,
    priority,
    due_date_start,
    due_date_end,
});

export type {
    BoardColumn, Task, TaskItemType, TaskCard,
};
