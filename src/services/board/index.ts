import { AxiosResponse } from 'axios';
import api from '../api';
import { getUserId } from '../utils';
import type { BoardColumn, Task } from './index.types';

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

export type { BoardColumn, Task };
