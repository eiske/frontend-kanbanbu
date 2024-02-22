import { PRIORITY_COLORS } from '@constants/index';

export type Task = {
    task_id: string;
    title: string;
    description: string;
    priority: keyof typeof PRIORITY_COLORS;
    due_date_start: string;
    due_date_end: string;
    email?: string;
    name?: string;
    user_id?: string;
};

export type BoardColumn = {
    title: string;
    items: Task[];
    columnType: string;
};

export type TaskItemType = {
    date: string[];
    description: string;
    id: string;
    name: string;
    priority: keyof typeof PRIORITY_COLORS;
};

export interface TaskCard {
    title: string;
    items: TaskItemType[];
    columnType: string;
}
