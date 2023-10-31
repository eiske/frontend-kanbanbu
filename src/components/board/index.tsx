import useBoard from "@hooks/use-board";

const Board = () => {
    const { board } = useBoard();
    console.log("board: ", board);
    return <h1>Hello from Board</h1>;
};

export default Board;
