import styled from 'styled-components';

export const Container = styled.div`

`;

export const ListContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

export const ListInnerContainer = styled.div`
    width: 95.5%;

    .subjectsEmpty {
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
    }
`;

export const CardContainerList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    align-items: stretch;

    @media (max-width: 393px) {
        display: unset;
    }
`;

export const AddSubjectModal = styled.div`
    button, input {
        margin: 5px;
        width: 100%;
    }
`;
