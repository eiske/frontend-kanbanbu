import { generateDemoEvents } from '@helpers/index';
import { getTasks } from '@services/board';
import { notification } from 'antd';
import { concat } from 'lodash';
import { useEffect, useState } from 'react';

type Events = {
    id: string;
    startAt: string;
    endAt: string;
    summary: string;
    color: string;
    allDay: boolean;
};

const useCalendar = () => {
    const [demoEvents, setDemoEvents] = useState<Events[]>([]);
    const [calendarLoad, setCalendarLoad] = useState(false);

    useEffect(() => {
        const getSetCalendar = async () => {
            try {
                setCalendarLoad(true);
                const { tasksCompleted, tasksDoing, tasksTodo } = await getTasks();

                setDemoEvents(generateDemoEvents(concat(tasksCompleted, tasksDoing, tasksTodo)));

                setCalendarLoad(false);
            } catch (error: any) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
            }
        };

        getSetCalendar();
    }, []);

    return {
        demoEvents,
        calendarLoad,
    };
};

export default useCalendar;
