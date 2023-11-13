import { FaChevronLeft } from 'react-icons/fa';
import { BackButton } from './index.styles';
import TextMarkDown from '../text-markdown';

const Annotations = () => (
    <>
        <BackButton href="/subjects-list">
            <FaChevronLeft />
            Voltar
        </BackButton>
        <TextMarkDown />
    </>
);

export default Annotations;
