import { Suspense } from 'react';
import EditPostForm from '@/components/EditPostForm';

export default function EditPostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPostForm />
    </Suspense>
  );
}
