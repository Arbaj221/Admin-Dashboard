import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import ClientForm from './components/ClientForm';

const CreateClient = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/clients', title: 'Clients' },
    { title: 'Create Client' },
  ];

  return (
    <>
      <BreadcrumbComp title="Create Client" items={BCrumb} />
      <ClientForm mode="create" />
    </>
  );
};

export default CreateClient;