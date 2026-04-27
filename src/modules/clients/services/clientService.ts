import apiClient from 'src/services/apiClient';

export interface Client {
  id: number;
  code: string;
  name: string;
  address: string;
  country: string;
  assignedTo: number;

  contractFileName: string;

  firstName: string;
  lastName: string;
  contactDesignation: string;
  contactEmail: string;
  contactOfficeNumber: string;
  contactMobileNumber: string;

  billingName: string;
  billingAddress: string;
  billingEmail: string;
  billingTerms: string;

  isActive: boolean;
  isDeleted: boolean;

  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

const mapClient = (item: any): Client => ({
  id: item.id,
  code: item.client_code,
  name: item.name,
  address: item.address,
  country: item.country,
  assignedTo: item.assigned_to,

  contractFileName: item.contract_file_name,

  firstName: item.first_name,
  lastName: item.last_name,
  contactDesignation: item.contact_designation,
  contactEmail: item.contact_email,
  contactOfficeNumber: item.contact_office_number,
  contactMobileNumber: item.contact_mobile_number,

  billingName: item.billing_name,
  billingAddress: item.billing_address,
  billingEmail: item.billing_email,
  billingTerms: item.billing_terms,

  isActive: item.is_active,
  isDeleted: item.is_deleted,

  createdAt: new Date(item.created_at).toLocaleDateString(),
  createdBy: item.created_by,
  updatedAt: new Date(item.updated_at).toLocaleDateString(),
  updatedBy: item.updated_by,
});

export const clientService = {
  async getClients(): Promise<Client[]> {
    const res = await apiClient.get('/clients/');
    return res.data.map(mapClient);
  },

  async getClientById(id: number): Promise<Client> {
    const res = await apiClient.get(`/clients/${id}`);
    return mapClient(res.data);
  },

  async createClient(payload: any) {
    return (await apiClient.post('/clients/', payload)).data;
  },

  async updateClient(id: number, payload: any) {
    return (await apiClient.patch(`/clients/${id}`, payload)).data;
  },

  async deleteClient(id: number) {
    return (await apiClient.delete(`/clients/${id}`)).data;
  },

  async downloadContract(id: number) {
    const res = await apiClient.get(`/clients/download/${id}`, {
      responseType: 'blob', // 🔥 important for file
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    // optional filename fallback
    link.download = `contract-${id}`;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  },
};