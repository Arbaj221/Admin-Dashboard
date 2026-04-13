import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import ClientForm from './components/ClientForm';

const CreateClient = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/clients', title: 'Clients' },
    { title: 'Create Client' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Create Client" items={BCrumb} />
      <ClientForm mode="create" />
    </>
  );
};

export default CreateClient;