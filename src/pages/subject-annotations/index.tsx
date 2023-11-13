import { AuthedPageLayout } from '@components/layouts/authed-layout';
import { NextPageWithLayout } from '@pages/_app';
import Annotations from './components/annotations';

const SubjectAnnotations: NextPageWithLayout = () => <Annotations />;

SubjectAnnotations.getLayout = (page) => AuthedPageLayout(page);

export default SubjectAnnotations;
