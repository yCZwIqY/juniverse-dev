import { useMutation } from '@tanstack/react-query';
import { postImage, removeImage } from '../upload.api';

export const useCreateImage = () =>
  useMutation({
    mutationFn: (form: FormData) => postImage(form),
  });

export const useRemoveImage = () =>
  useMutation({
    mutationFn: (key: string) => removeImage(key),
  });
