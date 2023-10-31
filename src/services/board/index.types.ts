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
