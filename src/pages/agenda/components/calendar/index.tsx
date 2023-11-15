import useCalendar from '@hooks/use-calendar';
import Kalend, { CalendarView } from 'kalend';
import { Skeleton } from 'antd';
import { Container } from './index.styles';
import 'kalend/dist/styles/index.css';

const Calendar = () => {
    const { calendarLoad, demoEvents } = useCalendar();
    return (
        <Container>
            <Skeleton active paragraph={{ rows: 10 }} loading={calendarLoad}>
                <Kalend
                    initialView={CalendarView.AGENDA}
                    disabledViews={[CalendarView.WEEK, CalendarView.THREE_DAYS, CalendarView.DAY]}
                    events={demoEvents}
                    initialDate={new Date().toISOString()}
                    hourHeight={60}
                    showTimeLine
                    isDark={false}
                    autoScroll={false}
                    language="ptBR"
                />
            </Skeleton>
        </Container>
    );
};

export default Calendar;
