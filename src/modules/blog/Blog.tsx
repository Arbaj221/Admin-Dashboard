
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import BlogPost from "src/components/apps/blog/BlogPost";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Blog app",
  },
];

const Blog = () => {
  return (
    <>
      <BreadcrumbComp title="Blog app" items={BCrumb} />
      <BlogPost />
    </>
  );
};
export default Blog;
