import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Project } from 'shared-types';
import { FormProvider, useForm } from 'react-hook-form';

interface ProjectDialogProps {
  children: React.ReactNode;
  id?: string;
}

const ProjectDialog = ({ children, id }: ProjectDialogProps) => {
  const isNew = !id;
  const form = useForm<Project>();
  return (
    <div>
      <Dialog>
        <FormProvider {...form}>
          <DialogTrigger className={'w-full h-full'}>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isNew ? 'Add' : 'Edit'} Project</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </div>
  );
};

export default ProjectDialog;
