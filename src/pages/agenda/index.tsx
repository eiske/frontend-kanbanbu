import Calendar from '@components/calendar';
import { AuthedPageLayout } from '@components/layouts/authed-layout';
import { NextPageWithLayout } from '@pages/_app';

const Agenda: NextPageWithLayout = () => <Calendar />;

Agenda.getLayout = (page) => AuthedPageLayout(page);

export default Agenda;
