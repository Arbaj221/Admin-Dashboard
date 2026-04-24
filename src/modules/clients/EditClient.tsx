import { useParams, useNavigate } from 'react-router';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import ClientForm from './components/form';
import { clientsData } from './data/client.data';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = clientsData.find((c) => c.id === Number(id));

  // If client not found — go back to list
  if (!client) {
    navigate('/clients');
    return null;
  }

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/clients', title: 'Clients' },
    { title: 'Edit Client' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Edit Client" items={BCrumb} />
      <ClientForm mode="edit" initialData={client} />
    </>
  );
};

export default EditClient;