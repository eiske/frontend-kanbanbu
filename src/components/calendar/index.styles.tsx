import styled from 'styled-components';

export const Container = styled.div`
    height: 80vh;
    overflow: hidden;
    padding: 30px;

    .Kalend__CalendarBodyHours__text, .Kalend__CalendarBodyHours__text-dark {
        font-size: 1.9em !important;

        &:after{
            content: ":00";
        }
    }

    .Kalend__CalendarBody {
        padding-left: 100px !important;
    }

`;
