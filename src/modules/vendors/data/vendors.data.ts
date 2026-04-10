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


export const vendorsData: Vendor[] = [
  {
    id: 1,
    code: 'PV01',
    name: 'Acme Corporation',
    person: 'John Smith',
    email: 'john.smith@acme.com',
    number: '+1 (555) 000-1234',
    assignedTo: 'Sarah Johnson',
    status: 'Active',
  },
  {
    id: 2,
    code: 'PV02',
    name: 'Globex Industries',
    person: 'Emily Davis',
    email: 'emily.davis@globex.com',
    number: '+1 (555) 000-5678',
    assignedTo: 'Mike Thompson',
    status: 'Active',
  },
];