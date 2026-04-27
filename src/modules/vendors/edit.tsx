import { useNavigate, useParams } from "react-router";
import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import VendorForm from "./components/form";
import { vendorsData } from "./data/vendors.data";

const EditVendor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const vendor = vendorsData.find((c) => c.id === Number(id));

    // If vendor not found — go back to list
    if (!vendor) {
        navigate('/vendors');
        return null;
    }

    const BCrumb = [
        { to: '/', title: 'Home' },
        { to: '/vendors', title: 'Vendors' },
        { title: 'Edit Vendor' },
    ];

    return (
        <>
            <SlimBreadcrumb title="Edit Vendor" items={BCrumb} />
            <VendorForm mode="edit" initialData={vendor} />
        </>
    );
};

export default EditVendor