import { useParams, useNavigate } from 'react-router';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UserForm from './components/form';
import { usersData } from './types-data/users';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = usersData.find((u) => u.id === Number(id));

  if (!user) {
    navigate('/users');
    return null;
  }

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/users', title: 'Users' },
    { title: 'Edit User' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Edit User" items={BCrumb} />
      <UserForm
        mode="edit"
        initialData={{
          firstName:  user.firstName,
          lastName:   user.lastName,
          username:   user.username,
          email:      user.email,
          jobTitle:   user.jobTitle,
          department: user.department,
          role:       user.role,
        }}
      />
    </>
  );
};

export default EditUser;