import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import VendorForm from './component/form';

const CreateVendor = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/vendors', title: 'Vendors' },
    { title: 'Create Vendors' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Create Vendor" items={BCrumb} />
      <VendorForm mode="create" />
    </>
  );
};

export default CreateVendor