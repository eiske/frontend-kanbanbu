import { AuthedPageLayout } from '@components/layouts/authed-layout';
import Subjects from '@components/subjects';
import { NextPageWithLayout } from '@pages/_app';

const SubjectsList: NextPageWithLayout = () => <Subjects />;

SubjectsList.getLayout = (page) => AuthedPageLayout(page);

export default SubjectsList;
