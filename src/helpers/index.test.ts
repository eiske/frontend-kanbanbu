import { Task } from '@services/board';
import {
    createInitialBoard, generateDemoEvents, mapResponseToTasks, renderPriorityColor,
} from '.';

const task1: Task = {
    task_id: '1',
    title: 'Task 1',
    description: 'Description 1',
    priority: 'Alta',
    due_date_start: '2023-01-01',
    due_date_end: '2023-01-02',
};

const task2: Task = {
    task_id: '2',
    title: 'Task 2',
    description: 'Description 2',
    priority: 'Média',
    due_date_start: '2023-02-03',
    due_date_end: '2023-02-04',
};

const task3: Task = {
    task_id: '3',
    title: 'Task 3',
    description: 'Description 3',
    priority: 'Baixa',
    due_date_start: '2023-03-05',
    due_date_end: '2023-03-06',
};

describe('Helpers', () => {
    it('should map an array of Task objects', () => {
        const data: Task[] = [
            task1,
            task2,
        ];

        const expected = [
            {
                id: '1',
                name: 'Task 1',
                description: 'Description 1',
                priority: 'Alta',
                date: ['2023-01-01', '2023-01-02'],
            },
            {
                id: '2',
                name: 'Task 2',
                description: 'Description 2',
                priority: 'Média',
                date: ['2023-02-03', '2023-02-04'],
            },
        ];

        const result = mapResponseToTasks(data);

        expect(result).toEqual(expected);
    });

    it('should return an object with arrays of tasks for each property', () => {
        const tasksCompleted = [
            {
                id: '1',
                name: 'Task 1',
                description: 'Description 1',
                priority: 'Alta',
                date: ['2023-01-01', '2023-01-02'],
            },
        ];
        const tasksDoing = [
            {
                id: '2',
                name: 'Task 2',
                description: 'Description 2',
                priority: 'Média',
                date: ['2023-02-03', '2023-02-04'],
            },
        ];
        const tasksTodo = [
            {
                id: '3',
                name: 'Task 3',
                description: 'Description 3',
                priority: 'Baixa',
                date: ['2023-03-05', '2023-03-06'],
            },
        ];

        const initialBoard = createInitialBoard({
            tasksCompleted: [task1],
            tasksDoing: [task2],
            tasksTodo: [task3],
        });

        expect(initialBoard).toEqual({
            todoList: tasksTodo,
            doingList: tasksDoing,
            completedList: tasksCompleted,
        });
    });

    it('should generate events when taskData is not empty', () => {
        // Arrange
        const taskData: Task[] = [
            {
                task_id: '1',
                title: 'Task 1',
                description: 'Description 1',
                priority: 'Alta',
                due_date_start: '2022-01-01',
                due_date_end: '2022-01-02',
            },
            {
                task_id: '2',
                title: 'Task 2',
                description: 'Description 2',
                priority: 'Baixa',
                due_date_start: '2022-01-03',
                due_date_end: '2022-01-04',
            },
        ];

        // Act
        const result = generateDemoEvents(taskData);

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].id).toBeDefined();
        expect(result[0].startAt).toBe('2022-01-01');
        expect(result[0].endAt).toBe('2022-01-02');
        expect(result[0].summary).toBe('Task 1');
        expect(result[0].color).toBe('#E77669');
        expect(result[0].allDay).toBe(false);
        expect(result[1].id).toBeDefined();
        expect(result[1].startAt).toBe('2022-01-03');
        expect(result[1].endAt).toBe('2022-01-04');
        expect(result[1].summary).toBe('Task 2');
        expect(result[1].color).toBe('#BEEC5A');
        expect(result[1].allDay).toBe(false);
    });

    it('should return "#E77669" when priority is "Alta', () => {
        const priority = 'Alta';
        const result = renderPriorityColor(priority);
        expect(result).toBe('#E77669');
    });

    it('should return "#BEEC5A" when priority is "Baixa"', () => {
        const priority = 'Baixa';
        const result = renderPriorityColor(priority);
        expect(result).toBe('#BEEC5A');
    });

    it('should return "#EEE950" when priority is neither "Alta" nor "Baixa"', () => {
        const priority = 'Medium';
        const result = renderPriorityColor(priority);
        expect(result).toBe('#EEE950');
    });
});
