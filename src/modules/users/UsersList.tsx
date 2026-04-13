import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UsersTable from './components/table';
import CardBox from 'src/components/shared/CardBox';
import { usersData as initialData } from './types-data/users';
import { User } from './types-data/users';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>(initialData);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Users' },
  ];

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <SlimBreadcrumb title="Users" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Users List</h5>
          <Link to="/users/create">
            <button className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer">
              <Icon icon="solar:add-circle-linear" width={18} height={18} />
              Create User
            </button>
          </Link>
        </div>

        <UsersTable users={users} onDelete={handleDelete} />
      </CardBox>
    </>
  );
};

export default UsersList;