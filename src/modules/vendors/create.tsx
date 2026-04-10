import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import VendorForm from './component/form';

const CreateVendor = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/vendors', title: 'Vendors' },
    { title: 'Create Vendors' },
  ];

  return (
    <>
      <BreadcrumbComp title="Create Client" items={BCrumb} />
      <VendorForm mode="create" />
    </>
  );
};

export default CreateVendor