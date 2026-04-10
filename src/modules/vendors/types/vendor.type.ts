export interface Vendor {
  id: number;
  code: string;
  name: string;
  person: string;
  email: string;
  number: string;
  assignedTo: string;
  status: 'Active' | 'Inactive';
}
 