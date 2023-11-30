import styled from 'styled-components';

export const Container = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    font-size: 16px;
    gap: 24px;
    padding: 10px;

    a {
        text-decoration: none;
        color: #000;
    }

    .active {
        font-weight: 600;
        text-decoration: underline;
    }
`;
