import PostDetailClient from "@/components/PostDetailClient";
import { Suspense } from "react";

export default function PostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostDetailClient />
    </Suspense>
  );
}
