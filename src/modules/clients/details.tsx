import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';

import { clientService, Client } from './services/clientService';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);

  const loadClient = async () => {
    if (!id) return;
    const data = await clientService.getClientById(Number(id));
    setClient(data);
  };

  useEffect(() => {
    loadClient();
  }, [id]);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/clients', title: 'Clients' },
    { title: 'Details' },
  ];

  if (!client) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading client details...
      </div>
    );
  }

  return (
    <>
      <SlimBreadcrumb title="Client Details" items={BCrumb} />

      <div className="space-y-6">

        {/* Client Info */}
        <CardBox>
          <h5 className="card-title mb-4">Client Information</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {client.name}</div>
            <div><strong>Country:</strong> {client.country}</div>
            <div className="md:col-span-2">
              <strong>Address:</strong> {client.address}
            </div>
            <div><strong>Assigned To (ID):</strong> {client.assignedTo}</div>
            <div><strong>Status:</strong> {client.isActive ? 'Active' : 'Inactive'}</div>
          </div>
        </CardBox>

        {/* Contact Info */}
        <CardBox>
          <h5 className="card-title mb-4">Contact Information</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {client.firstName} {client.lastName}</div>
            <div><strong>Email:</strong> {client.contactEmail}</div>
            <div><strong>Mobile:</strong> {client.contactMobileNumber}</div>
            <div><strong>Office:</strong> {client.contactOfficeNumber}</div>
            <div><strong>Designation:</strong> {client.contactDesignation}</div>
          </div>
        </CardBox>

        {/* Billing Info */}
        <CardBox>
          <h5 className="card-title mb-4">Billing Information</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {client.billingName}</div>
            <div><strong>Email:</strong> {client.billingEmail}</div>
            <div className="md:col-span-2">
              <strong>Address:</strong> {client.billingAddress}
            </div>
            <div><strong>Terms:</strong> {client.billingTerms}</div>
          </div>
        </CardBox>

        {/* Contract Info */}
        <CardBox>
          <h5 className="card-title mb-4">Contract</h5>

          <div>
            <strong>File Name:</strong> {client.contractFileName || 'N/A'}
          </div>
        </CardBox>

      </div>
    </>
  );
};

export default ClientDetails;