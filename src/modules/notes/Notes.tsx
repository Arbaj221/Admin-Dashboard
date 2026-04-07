
import NotesApp from "src/components/apps/notes";
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';



const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Notes",
  },
];
const Notes = () => {

  return (
    <>

      <BreadcrumbComp title="Notes app" items={BCrumb} />
      <NotesApp />
    </>
  );
};

export default Notes;
