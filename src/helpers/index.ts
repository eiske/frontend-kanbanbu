import { Breakpoint } from 'antd/lib/_util/responsiveObserver';
import { Task } from '@services/board';
import { v4 } from 'uuid';

interface InitialBoard {
    tasksTodo: Task[];
    tasksDoing: Task[];
    tasksCompleted: Task[];
}

export const mapResponseToTasks = (data: Task[]) => data.map((values) => ({
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

const renderPriorityColor = (priority: string) => {
    if (priority === 'Alta') {
        return '#E77669';
    } if (priority === 'Baixa') {
        return '#BEEC5A';
    }

    return '#EEE950';
};

export const generateDemoEvents = (taskData: Task[]) => {
    const events = [];

    const taskEvents = taskData.map((task) => ({
        id: v4(),
        startAt: task.due_date_start,
        endAt: task.due_date_end,
        summary: task.title,
        color: renderPriorityColor(task.priority),
        allDay: false,
    }));

    for (let i = 0; i < taskEvents.length; i++) {
        events.push(taskEvents[i]);
    }

    return events;
};

export const isDesktop = (screens: Partial<Record<Breakpoint, boolean>>) => screens.lg;
