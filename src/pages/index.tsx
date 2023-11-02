import Board from '@/components/board';
import { AuthedPageLayout } from '@/components/layouts/authed-layout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => <Board />;

Home.getLayout = (page) => AuthedPageLayout(page);

export default Home;
