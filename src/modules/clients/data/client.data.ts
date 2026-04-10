export interface Client {
  id: number;
  code: string;
  name: string;
  person: string;
  email: string;
  number: string;
  assignedTo: string;
  status: 'Active' | 'Inactive';
}


export const clientsData: Client[] = [
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
  {
    id: 3,
    code: 'PV03',
    name: 'Initech Solutions',
    person: 'Robert Wilson',
    email: 'robert.w@initech.com',
    number: '+1 (555) 000-9012',
    assignedTo: 'Sarah Johnson',
    status: 'Inactive',
  },
  {
    id: 4,
    code: 'PV04',
    name: 'Umbrella Corp',
    person: 'Lisa Anderson',
    email: 'l.anderson@umbrella.com',
    number: '+1 (555) 000-3456',
    assignedTo: 'David Clark',
    status: 'Active',
  },
];