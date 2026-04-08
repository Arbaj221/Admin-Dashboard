// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useContext } from 'react';
import CardBox from '../../components/shared/CardBox';
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';



const SamplePage = () => {
  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      to:'/',
      title: "Sample-Page",
    },
    {
      title: "Sample-Page-2",
    },
  ];

  return (
    <>
      <BreadcrumbComp title="Sample-Page" items={BCrumb} />
      <CardBox>
        <h5 className="text-base">Sample Page</h5>
        <p className="text-sm mt-6" >This is a sample page</p>
      </CardBox>
    </>
  );
};

export default SamplePage;
