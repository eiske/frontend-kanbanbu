import { Task } from "@services/board";

interface InitialBoard {
    tasksTodo: Task[];
    tasksDoing: Task[];
    tasksCompleted: Task[];
}

export const mapResponseToTasks = (data: Task[]) =>
    data.map((values) => ({
        id: values.task_id,
        name: values.title,
        description: values.description,
        priority: values.priority,
        date: [values.due_date_start, values.due_date_end],
    }));

export const createInitialBoard = ({
    tasksCompleted,
    tasksDoing,
    tasksTodo,
}: InitialBoard) => ({
    todoList: mapResponseToTasks(tasksTodo),
    doingList: mapResponseToTasks(tasksDoing),
    completedList: mapResponseToTasks(tasksCompleted),
});
