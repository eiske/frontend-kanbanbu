import styled from 'styled-components';

export const Item = styled.div<{$isDragging: boolean}>`
    position: relative;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
    border-top: 28px solid rgba(154, 155, 156, 0.226);
    min-height: 113px;

    > svg {
        float: right;
        position: relative;
        bottom: 40px;
        font-weight: bold;
        font-size: 15px;
        margin-top: 3px;
        font-size: 16px;
        cursor: pointer;
        display: none;

        &:hover {
            color: red;
            transition: 0.2s;
        }
    }

    &:hover > svg {
        display: block;
    }

    & {
        background: ${(props) => (props.$isDragging ? 'rgba(218, 218, 221, 0.8)' : '')};
    }
`;

export const CardTaskDetails = styled.div`

    &:hover {
        border-radius: 5px;
        cursor: pointer;
        opacity: 0.60;
        transition: 0.2s;
    }

    h3 {
        font-weight: bold;
    }

    .taskDescription {
        white-space: nowrap;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 1rem;
    }

    .taskDate {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        color: #fff;
        font-weight: bold;
        width: 100%;
        text-align: center;
        border-radius: 5px;
        margin-top: 0.5rem;
        height: 20px;

        > p {
            margin: 0 15px 0 0;

        }

        @media (max-width: 1136px) {
            flex-direction: column;
            padding: 5px;
            height: 32px;
        }
    }
`;
