interface Props {
    onToggle: (e: any) => void;
    style: string;
    label: string;
}

const StyleButton = ({ label, onToggle, style }: Props) => {
    const onClickButton = (e: any) => {
        e.preventDefault();
        onToggle(style);
    };
    return (
        <button
            type="button"
            className="editorToolBarButton"
            onMouseDown={onClickButton}
        >
            {label}
        </button>
    );
};

export default StyleButton;
