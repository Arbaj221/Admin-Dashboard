import TicketsApp from "src/components/apps/tickets";
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Tickets",
  },
];
const Tickets = () => {
  return (
    <>
      <BreadcrumbComp title="Tickets App" items={BCrumb} />
      <TicketsApp />
    </>
  );
};

export default Tickets;
