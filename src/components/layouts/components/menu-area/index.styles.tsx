import styled from 'styled-components';

export const Container = styled.ul`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
        color: #000;
    }

    .active {
        font-weight: 600;
        text-decoration: underline;
    }
`;
