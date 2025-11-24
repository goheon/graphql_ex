import { Suspense } from 'react';
import CreatePostForm from '@/components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePostForm />
    </Suspense>
  );
}
