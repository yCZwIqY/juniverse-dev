import React from 'react';
import CareerTable from '@/app/career/_components/CareerTable';
import CareerFormDialog from '@/app/career/_components/CareerFormDialog';

const CareerPage = () => {
  return (
    <div className={'p-5'}>
      <div className={'w-full flex justify-end'}>
        <CareerFormDialog />
      </div>
      <CareerTable />
    </div>
  );
};

export default CareerPage;
