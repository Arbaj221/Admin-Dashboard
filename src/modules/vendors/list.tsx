import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { vendorsData as initialData } from './data/vendors.data';
import { Vendor } from './types/vendor.type';
import VendorTable from './component/table';


const VendorList = () => {
  const [vendors, setVendors] = useState<Vendor[]>(initialData);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Vendors' },
  ];

  const handleDelete = (id: number) => {
    setVendors((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <BreadcrumbComp title="Vendors" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Clients List</h5>
          <Link to="/vendors/create">
            <button className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer">
              <Icon icon="solar:add-circle-linear" width={18} height={18} />
              Create Vendor
            </button>
          </Link>
        </div>

        <VendorTable vendor={vendors} onDelete={handleDelete} />
      </CardBox>
    </>
  );
};


export default VendorList