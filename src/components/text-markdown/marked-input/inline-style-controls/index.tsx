import StyleButton from '@components/style-button';
import { INLINE_STYLES } from '../helper';

interface Props {
    onToggle: (e: any) => void
}

const InlineStyleControls = ({ onToggle }: Props) => (
    <div data-testid="inlineControls">
        {INLINE_STYLES.map((type) => (
            <StyleButton
                key={type.label}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
            />
        ))}
    </div>
);

export default InlineStyleControls;
