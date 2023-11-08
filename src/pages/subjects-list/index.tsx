import { AuthedPageLayout } from '@components/layouts/authed-layout';
import { NextPageWithLayout } from '@pages/_app';
import Subjects from './components/subjects';

const SubjectsList: NextPageWithLayout = () => <Subjects />;

SubjectsList.getLayout = (page) => AuthedPageLayout(page);

export default SubjectsList;
