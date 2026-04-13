// ── Types ──────────────────────────────────────────────
export type Department =
  | 'Management'
  | 'Technology'
  | 'HR'
  | 'Finance'
  | 'Sales'
  | 'Customer Success'
  | 'DataOps'
  | 'Email'
  | 'Quality'
  | 'DB Refresh'
  | 'Voice Verification'
  | 'MIS';

export type Role = 'Manager' | 'Executive';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  jobTitle: string;
  department: Department;
  role: Role;
  addedDate: string;
}

// ── Data ──────────────────────────────────────────────
export const usersData: User[] = [
    {
        id: 1,
        firstName: 'Abhijeet',
        lastName: 'Bhalerao',
        username: 'abhijeet.b@prospectvine.com',
        email: 'abhijeet.b@prospectvine.com',
        jobTitle: 'Operations Manager',
        department: 'Management',
        role: 'Manager',
        addedDate: '2026-01-15',
    },
    {
        id: 2,
        firstName: 'Aftab',
        lastName: 'Shaikh',
        username: 'aftab.s@prospectvine.com',
        email: 'aftab.s@prospectvine.com',
        jobTitle: 'Data Analyst',
        department: 'DataOps',
        role: 'Executive',
        addedDate: '2026-02-03',
    },
    {
        id: 3,
        firstName: 'Akila',
        lastName: 'Annam',
        username: 'akila.a@prospectvine.com',
        email: 'akila.a@prospectvine.com',
        jobTitle: 'HR Executive',
        department: 'HR',
        role: 'Executive',
        addedDate: '2026-02-18',
    },
    {
        id: 4,
        firstName: 'Arbaj',
        lastName: 'Begade',
        username: 'arbaj.b@prospectvine.com',
        email: 'arbaj.b@prospectvine.com',
        jobTitle: 'Sales Manager',
        department: 'Sales',
        role: 'Manager',
        addedDate: '2026-03-01',
    },
    {
        id: 5,
        firstName: 'Bilal',
        lastName: 'Shaikh',
        username: 'bilal.s@prospectvine.com',
        email: 'bilal.s@prospectvine.com',
        jobTitle: 'MIS Executive',
        department: 'MIS',
        role: 'Executive',
        addedDate: '2026-03-22',
    },
    {
        id: 6,
        firstName: 'Devidas',
        lastName: 'Markante',
        username: 'devidas.m@prospectvine.com',
        email: 'devidas.m@prospectvine.com',
        jobTitle: 'MIS Executive',
        department: 'MIS',
        role: 'Executive',
        addedDate: '2026-03-22',
    },
    {
        id: 7,
        firstName: 'Dheeraj',
        lastName: 'Mali',
        username: 'dheeraj.m@prospectvine.com',
        email: 'dheeraj.m@prospectvine.com',
        jobTitle: 'MIS Executive',
        department: 'MIS',
        role: 'Executive',
        addedDate: '2026-03-22',
    },
    {
        id: 8,
        firstName: 'Eva',
        lastName: 'Ahlawat',
        username: 'bilal.s@prospectvine.com',
        email: 'bilal.s@prospectvine.com',
        jobTitle: 'MIS Executive',
        department: 'MIS',
        role: 'Executive',
        addedDate: '2026-03-22',
    },
];