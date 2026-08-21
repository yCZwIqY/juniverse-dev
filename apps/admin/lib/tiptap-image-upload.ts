import { BaseResponse } from 'apis';
import { MAX_FILE_SIZE } from 'components/src/tiptap/editor-kit/lib/tiptap-editor-utils';

export const handleImageUpload = async (postId: string, file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`/api/files/upload?refType=post&refId=${postId}`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Image upload failed');
  }

  const response: BaseResponse<{ url: string }> = await res.json();
  return response.data.url;
};
