import { FaChevronLeft } from 'react-icons/fa';
import { BackButton, Container } from './index.styles';
import TextMarkDown from '@components/text-markdown';

const Annotations = () => (
    <Container>
        <BackButton href="/subjects-list">
            <FaChevronLeft />
            Voltar
        </BackButton>
        <TextMarkDown />
    </Container>
);

export default Annotations;
