import styled from 'styled-components';

export const MarkedInputMenu = styled.div<{$hideMarkdownMenu: boolean}>`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: ${(props) => (props.$hideMarkdownMenu ? '4%' : '18%')};
  margin-right: 50px;
  border: 1px solid #000;
  border-radius: 0 3px 0 3px;
  transition: 0.3s;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  > svg {
    font-size: 25px;
    cursor: pointer;
    align-self: flex-end;
    margin: 10px 10px 0 0;
    margin-bottom: 10px;

    &:hover {
      color: gray;
      transition: 0.3s;
    }
  }

  section {
    display: ${(props) => (props.$hideMarkdownMenu ? 'none' : 'block')};

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        font-weight: bold;


        &:hover {
          background: #ebe8e8;
          border-right: 3px solid #000;
          transition: 0.3s;
        }

        button:hover {
            background-color: transparent !important;
        }

        svg {
          margin: 0 10px 0 10px;
          font-size: 18px;
        }

        svg:nth-child(3):hover {
          color: red;
          transition: 0.2s;
        }
    }

    .activePageLink {
      background: lightgray;
      border-right: 3px solid #000;
    }

    @media (max-width: 990px) {
      height: 150px;
      overflow: scroll;
    }
  }

  footer {
    font-size: 15px;
    width: 100%;
    font-weight: bold;
    display: ${(props) => (props.$hideMarkdownMenu ? 'none' : 'block')};
    padding: 10px 0;

    > svg {
      margin: 0 10px -2px 10px;
    }

    &:hover {
      cursor: pointer;
      background: #ebe8e8;
      transition: 0.3s;
    }

    @media (max-width: 990px) {
      text-align: center;
    }
  }

  @media (max-width: 990px) {
    width: 100%;
    height: 200px;
    overflow: scroll;
  }
`;
