import apiClient from 'src/services/apiClient';

export interface Vendor {
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

const mapVendor = (item: any): Vendor => ({
  id: item.id,
  code: item.vendor_code,
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

export const vendorService = {
  async getVendors(): Promise<Vendor[]> {
    const res = await apiClient.get('/vendors/');
    return res.data.map(mapVendor);
  },

  async getVendorById(id: number): Promise<Vendor> {
    const res = await apiClient.get(`/vendors/${id}`);
    return mapVendor(res.data);
  },

  async createVendor(payload: any) {
    return (await apiClient.post('/vendors/', payload)).data;
  },

  async updateVendor(id: number, payload: any) {
    return (await apiClient.patch(`/vendors/${id}`, payload)).data;
  },

  async deleteVendor(id: number) {
    return (await apiClient.delete(`/vendors/${id}`)).data;
  },

  async downloadContract(id: number) {
    const res = await apiClient.get(`/vendors/download/${id}`, {
      responseType: 'blob',
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `vendor-${id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  },
};