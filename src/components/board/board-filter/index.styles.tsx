import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;

    > div {
        display: flex;
        width: 70%;
        background: lightgray;
        padding: 5px;
        border-radius: 5px;
        margin: 56px 0 40px;

        > input, .ant-select, .ant-picker {
            width: 100%;
        }

        @media (max-width: 990px) {
            flex-direction: column;
        }
    }

`;
