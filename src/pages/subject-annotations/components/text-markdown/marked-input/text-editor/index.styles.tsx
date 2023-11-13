import styled from 'styled-components';

export const BlankAnnotationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  font-size: 20px;

  > svg {
    font-size: 80px;
    margin: 0 0 35px 0;
  }

  @media (max-width: 990px) {
    text-align: center;

    > svg {
      margin: 10px 0;
    }
  }
`;
