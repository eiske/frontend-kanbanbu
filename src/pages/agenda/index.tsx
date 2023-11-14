import { AuthedPageLayout } from '@components/layouts/authed-layout';
import { NextPageWithLayout } from '@pages/_app';
import Calendar from './components/calendar';

const Agenda: NextPageWithLayout = () => <Calendar />;

Agenda.getLayout = (page) => AuthedPageLayout(page);

export default Agenda;
