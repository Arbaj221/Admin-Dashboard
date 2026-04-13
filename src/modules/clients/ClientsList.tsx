import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import ClientsTable from './components/ClientsTable';
import CardBox from 'src/components/shared/CardBox';
import { clientsData as initialData } from './data/client.data';
import { Client } from './types/client.types';

const ClientsList = () => {
  const [clients, setClients] = useState<Client[]>(initialData);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Clients' },
  ];

  const handleDelete = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <SlimBreadcrumb title="Clients" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Clients List</h5>
          <Link to="/clients/create">
            <button className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer">
              <Icon icon="solar:add-circle-linear" width={18} height={18} />
              Create Client
            </button>
          </Link>
        </div>

        <ClientsTable clients={clients} onDelete={handleDelete} />
      </CardBox>
    </>
  );
};

export default ClientsList;