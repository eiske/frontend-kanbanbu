import { render, screen } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskItem from '.';

describe('<TaskItem />', () => {
    it('should render a draggable task item', () => {
        const cardTaskDetailsText = 'Task details';
        const data = { id: '1', name: 'Task 1', description: 'Task description', priority: 'High', date: ['2022-01-01', '2022-01-02'] } as any;
        const onCurrentCardIdToDelete = jest.fn();
        const onFillStateForDragEnd = jest.fn();
        const index = 0;
        const item = { id: '1', name: 'Task 1', description: 'Task description', priority: 'High', date: ['2022-01-01', '2022-01-02'] } as any;
        const onDeleteConfirm = jest.fn();
        const showModal = jest.fn();

        render(
            <DragDropContext onDragEnd={jest.fn}>
                <Droppable droppableId="avcdss">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <TaskItem
                            cardTaskDetailsText={cardTaskDetailsText}
                            data={data}
                            onCurrentCardIdToDelete={onCurrentCardIdToDelete}
                            onFillStateForDragEnd={onFillStateForDragEnd}
                            index={index}
                            item={item}
                            onDeleteConfirm={onDeleteConfirm}
                            showModal={showModal}
                        />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task description')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        expect(screen.getByText('01/01/2022 00:00:00 - 02/01/2022 00:00:00')).toBeInTheDocument();
    });
});
