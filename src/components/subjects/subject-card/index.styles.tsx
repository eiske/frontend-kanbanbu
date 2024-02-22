import styled from 'styled-components';

export const CardContainer = styled.div`
    margin: 20px;
    background: #FFF;
    border-radius: 10px;
    margin: 0px 30px 30px 0px;
    width: calc(20% - 30px);

    > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 30px;

        background: #000;

        > svg {
            display: none;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
            color: #FFF;
        }

        > svg:nth-child(1):hover {
            color: #8BC34A;
            cursor: pointer;
            transition: 0.2s;
        }

        > svg:nth-child(2):hover {
            color: #FF5722;
            cursor: pointer;
            transition: 0.2s;
        }
    }

    &:hover > div {
        > svg {
            display: unset;
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

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;


    > p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        font-weight: bold;
        font-size: 23px;
        text-align: center;
    }

    &:hover {
        opacity: 0.3;
        transition: 0.4s;
    }
`;
