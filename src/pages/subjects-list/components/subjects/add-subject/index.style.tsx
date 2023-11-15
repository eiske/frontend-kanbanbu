import styled from 'styled-components';

export const AddCard = styled.div<{ $isSubjectsEmpty?: boolean }>`
    display: ${(props) => (props.$isSubjectsEmpty ? 'table' : 'unset')};
    border-radius: 10px;
    margin:${(props) => (props.$isSubjectsEmpty ? '0 auto' : '0px 30px 30px 0px')};
    width: calc(20% - 30px);
    border: 3px dashed lightgray;

    &:hover {
        cursor: pointer;
        background: #ebeaea;
        transition: 0.4s;

        > svg {
            color: #d5f395;
            transition: 0.4s;
        }
    }

    .addCardHeader {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 30px;
    }

    .addCardBody {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-radius: 10px;

        > svg {
            font-size: 100px;
            color: #BEEC5A;
            margin-bottom: 50px;
        }
    }

    .importCard {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        border-radius: 10px;

        > svg {
            font-size: 100px;
            color: #BEEC5A;
            margin-bottom: 50px;
        }
    }

    @media (max-width: 990px) {
        width: 100%;
        margin: 0 15px 30px 15px;
    }
    @media (max-width: 510px) {
        width: 100%;
    }
    @media (max-width: 394px) {
        margin: 30px 0 30px 0;
    }
`;
