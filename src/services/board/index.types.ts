export type Task = {
    task_id: string;
    title: string;
    description: string;
    priority: string;
    due_date_start: string;
    due_date_end: string;
};

export type BoardColumn = {
    title: string;
    items: Task[];
    columnType: string;
};

export type TaskItemType = {
    date: [string, string];
    description: string;
    id: string;
    name: string;
    priority: string;
};

export interface TaskCard {
    title: string;
    items: TaskItemType[];
    columnType: string;
}
