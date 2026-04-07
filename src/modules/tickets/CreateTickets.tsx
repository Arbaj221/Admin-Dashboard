import CreateTicketForm from 'src/components/apps/tickets/CreateTicketForm';
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import { TicketProvider } from 'src/context/ticket-context/index';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Tickets',
  },
];
const CreateTickets = () => {
  return (
    <>
      <BreadcrumbComp title="Tickets App" items={BCrumb} />
      <TicketProvider>
        <CreateTicketForm />
      </TicketProvider>
    </>
  );
};

export default CreateTickets;
