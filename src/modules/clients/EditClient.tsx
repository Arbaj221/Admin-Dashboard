import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import ClientForm from './components/ClientForm';

const EditClient = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/clients', title: 'Clients' },
    { title: 'Edit Client' },
  ];

  // initialData will come from API later — passing dummy for now
  const initialData = {
    name: 'Acme Corporation',
    address: '123 Main Street',
    country: 'us',
    assignedTo: 'sarah_johnson',
    firstName: 'John',
    lastName: 'Smith',
    contactDesignation: 'Manager',
    contactEmail: 'john.smith@acme.com',
    contactOfficeNo: '+1 (555) 000-1234',
    contactMobileNo: '+1 (555) 000-5678',
    billingName: 'Acme Corp Billing',
    billingAddress: '123 Main Street',
    billingEmail: 'billing@acme.com',
    billingTerms: '30_days',
  };

  return (
    <>
      <BreadcrumbComp title="Edit Client" items={BCrumb} />
      <ClientForm mode="edit" initialData={initialData} />
    </>
  );
};

export default EditClient;