import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UserForm from './components/form';

const CreateUser = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/users', title: 'Users' },
    { title: 'Create User' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Create User" items={BCrumb} />
      <UserForm mode="create" />
    </>
  );
};

export default CreateUser;