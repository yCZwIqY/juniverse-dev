import React from 'react';
import BlogTable from '@/app/blog/_components/BlogTable';
import NewBlogButton from '@/app/blog/_components/NewBlogButton';

const Page = () => {
  return (
    <div>
      <NewBlogButton />
      <BlogTable />
    </div>
  );
};

export default Page;
