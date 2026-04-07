
import Form from "src/components/utilities/form";
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Form",
  },
];
const Notes = () => {

  return (
    <>

      <BreadcrumbComp title="Form Elements" items={BCrumb} />
      <Form />
    </>
  );
};

export default Notes;
