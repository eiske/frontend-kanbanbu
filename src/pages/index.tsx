import { NextPageWithLayout } from "./_app";
import Board from "@/components/board";
import { AuthedPageLayout } from "@/components/layouts/authed-layout";

const Home: NextPageWithLayout = () => <Board />;

Home.getLayout = (page) => AuthedPageLayout(page);

export default Home;
