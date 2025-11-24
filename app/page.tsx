import { GET_POSTS } from "@/graphql/queries";
import { getClient } from "@/lib/apollo-client";
import { GetPostsData } from "@/types/post";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./page.module.scss";

async function PostList() {
  const client = getClient();
  const { data } = await client.query<GetPostsData>({
    query: GET_POSTS,
  });

  if (!data || !data.posts) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.postList}>
      <h2>게시판 목록</h2>
      <ul className={styles.posts}>
        {data.posts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link href={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
              <div className={styles.postMeta}>
                <span className={styles.author}>{post.author}</span>
                <span className={styles.date}>
                  {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostListSkeleton() {
  return (
    <div className={styles.postList}>
      <h2>게시판 목록</h2>
      <div className={styles.skeleton}>
        <div className={styles.skeletonItem}></div>
        <div className={styles.skeletonItem}></div>
        <div className={styles.skeletonItem}></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>GraphQL Practice</h1>
        <p className={styles.description}>
          Next.js App Router with TypeScript and GraphQL
        </p>

        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </main>
    </div>
  );
}
