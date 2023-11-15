import styled from 'styled-components';

export const MarkedInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 13px 13px 13px 0;
  font-family: "Lato", sans-serif;

  @media (max-width: 990px) {
      flex-direction: column-reverse;
      padding: 0;
    }
`;

export const MarkdownPanel = styled.div<{$markdownPanelVisible: string, rect: number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${(props) => props.$markdownPanelVisible};
  padding: 0 30px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
  border-radius: 10px;
  left: 180px;
  right: 180px;
  z-index: 1;
  top:  ${(props) => `calc(${props?.rect}px - 48px)`};
  box-shadow: 0 1px 2px rgba(0,0,0,0.07),
                0 2px 4px rgba(0,0,0,0.07),
                0 4px 8px rgba(0,0,0,0.07),
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07),
                0 32px 64px rgba(0,0,0,0.07);

  @media (max-width: 1189px) {
    height: 80px;
    overflow-x: scroll;
    justify-content: start;
  }

  @media (max-width: 1162px) {
    display: flex;
    width: 200px;

  }

  .markdownPanel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    > svg {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        color: gray;
      }

      @media (max-width: 1162px) {
        display: none;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0 10px;
      font-weight: bold;
    }

    .editorToolBarButton {
      background: none;
      color: inherit;
      border: none;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      margin: 0 10px;
      padding: 5px;
      height: 100%;

      &:hover {
        background: #000;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
      }
    }
  }
`;

export const MarketdInputTextAreaContainer = styled.div`
  width: 100%;

  .pageName {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
  }

  h2 {
    text-align: center;
  }

  .savingMarkdown {
    display: flex;
    align-items: center;
    min-height: 30px;

    p {
      margin: 0 0 -2px 10px;
      font-weight: bold;
    }
  }

  .DraftEditor-root, .DraftEditor-editorContainer, .public-DraftEditor-conten {

    div[data-contents=true] {
      > div {
        border-bottom: 1px solid lightgray;

        &:hover {
          border-bottom: 1px solid #000;
          transition: 0.4s;
        }
      }
    }
  }

  .superFancyBlockquote {
    color: #999;
    font-family: 'Hoefler Text', Georgia, serif;
    font-style: italic;
    text-align: center;
  }

`;

export const MarketdInputTextArea = styled.div`
  outline: none;

  > div {
      border-bottom: 1px solid lightgray;

      &:hover {
        border-bottom: 1px solid #000;
        transition: 0.4s;
      }
  }
`;

export const AddNewPageModal = styled.div`
  button {
    width: 100%;
    margin-top: 10px;
  }
`;
