import useCalendar from '@hooks/use-calendar';
import Kalend, { CalendarView } from 'kalend';
import { Skeleton } from 'antd';
import { Container, LoadingContainer } from './index.styles';
import 'kalend/dist/styles/index.css';

const Calendar = () => {
    const { calendarLoad, demoEvents } = useCalendar();
    return (
        <Container>
            {!calendarLoad ? (
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
            ) : (
                <LoadingContainer>
                    <Skeleton active />
                </LoadingContainer>
            )}
        </Container>
    );
};

export default Calendar;
