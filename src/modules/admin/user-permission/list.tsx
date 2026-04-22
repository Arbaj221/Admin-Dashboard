import { useEffect, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';

import { userService } from 'src/modules/users/services/userService';
import UserPermissionForm from './components/form';

const UserPermissionList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await userService.getUsers();
      setUsers(res);
    };

    load();
  }, []);

  const selectedUser = users.find((u) => u.id === userId);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'User Permissions' },
  ];

  return (
    <>
      <SlimBreadcrumb title="User Permissions" items={BCrumb} />

      <CardBox>

        {/* Select */}
        <div className="">
          <label className="text-sm text-muted-foreground mb-1 block">
            User
          </label>

          <select
            className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm"
            value={userId || ''}
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select User
            </option>

            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        {/* Context */}
        <div className="mt-1 mb-1">

          {!userId ? (
            <p className="text-sm text-muted-foreground">
              Please select a user to manage permissions
            </p>
          ) : (
            <div className="flex items-center justify-between gap-3 flex-wrap">

              <div className="text-sm text-muted-foreground">
                Managing permissions for{' '}
                <span className="font-medium text-foreground">
                  {selectedUser?.email}
                </span>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-lightprimary/20 text-primary font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {activeCount} active permissions
              </div>

            </div>
          )}

        </div>

        {/* Form */}
        {userId && (
          <UserPermissionForm
            userId={userId}
            setActiveCount={setActiveCount}
          />
        )}

      </CardBox>
    </>
  );
};

export default UserPermissionList;