import { useNavigate, useParams } from "react-router";
import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";
import VendorForm from "./component/form";
import { vendorsData } from "./data/vendors.data";

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = vendorsData.find((c) => c.id === Number(id));

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
      <BreadcrumbComp title="Edit Client" items={BCrumb} />
      <VendorForm mode="edit" initialData={client} />
    </>
  );
};

export default EditVendor