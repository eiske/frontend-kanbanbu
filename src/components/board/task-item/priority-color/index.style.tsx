import styled from 'styled-components';

export const PriorityColor = styled.div<{$color: string}>`
    background: ${(props) => props.$color};
    color: #fff;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;

    > p {
        border-radius: 5px;
        background: #000;
        width: 20%;
    }
`;
