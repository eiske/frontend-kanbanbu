import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;

    .tour {
        position: absolute;
        bottom: 15px;
        right: 30px;
        cursor: pointer;

        > svg {
            font-size: 35px;
        }
    }
`;

export const Column = styled.div`
    width: 100%;
    padding: 10px;
`;

export const AddTaskContainer = styled.div`
    display: table;
    margin: 0 auto;

    button, input, select, textarea, .ant-select, .ant-picker {
        margin: 5px;
        width: 100%;
    }

    .ant-picker-dropdown, .ant-picker-dropdown-range, .ant-picker-dropdown-placement-bottomLeft  {
        height: 100% !important;
    }

    .recurrentTask {
        display: flex;
        align-items: center;
        margin: 10px 0 10px 6px;

        > svg {
            font-size: 15px;

            &:hover {
                cursor: pointer;
                color: gray;
                transition: 0.5s;
            }
        }
    }
`;

export const BoardContainer = styled.div`
    display: flex;
    margin: 0 19px;

    @media (max-width: 990px) {
        flex-direction: column;
    }
`;

export const Card = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    padding: 10px 10px 0 10px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    flex-direction: column;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    background: gray;
    padding: 5px;

    > div {
        display: flex;

        h3 {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            margin-left: 8px;
            margin-bottom: 0;
        }

        span {
            background: #000;
            color: #fff;
            font-size: 12px;
            padding: 5px 10px 0px 10px;
            font-weight: bold;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 17px;
        }
    }

    svg {
        font-size: 25px;
        cursor: pointer;
    }
`;

export const RecurringTaskContainer = styled.div`
    display: flex;
    border: 1px solid lightgray;
    margin: 6px 0 0 6px;
    padding: 3px;
    width: 100%;

    > p {
        font-weight: bold;
        width: 100%;
        margin: 3px;
        padding: 5px;
        cursor: pointer;
        text-align: center;

        &:hover {
            background: lightgray;
            border-radius: 4px;
        }
    }

    .activeWeek {
        background: lightgray;
        border-radius: 4px;
    }
`;
