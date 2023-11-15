import StyleButton from '@components/style-button';
import { BLOCK_TYPES } from '../helper';

interface Props {
    onToggle: (e: any) => void
}

const BlockStyleControls = ({ onToggle }: Props) => (
    <div>
        {BLOCK_TYPES.map((type) => (
            <StyleButton
                key={type.label}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
            />
        ))}
    </div>
);

export default BlockStyleControls;
