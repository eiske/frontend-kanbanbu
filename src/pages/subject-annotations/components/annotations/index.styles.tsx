import styled from 'styled-components';
import Link from 'next/link';

export const Container = styled.div`
`;

export const BackButton = styled(Link)`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-left: 20px;

    > svg {
        margin: 0 11px -3px 0;
    }

    &:hover {
        color: gray;
        transition: 0.3s;
    }

    @media (max-width: 990px) {
        display: table;
        margin: 20px auto;
    }
`;
