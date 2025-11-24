"use client";

import { GET_POST } from "@/graphql/queries";
import { GetPostData, GetPostVars } from "@/types/post";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./PostDetail.module.scss";

export default function PostDetailClient() {
  const params = useParams();
  const id = params.id as string;

  const { loading, error, data } = useQuery<GetPostData, GetPostVars>(
    GET_POST,
    {
      variables: { id },
    }
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonMeta}></div>
          <div className={styles.skeletonContent}></div>
          <div className={styles.skeletonContent}></div>
          <div className={styles.skeletonContent}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>오류가 발생했습니다</h2>
          <p>{error.message}</p>
          <Link href="/" className={styles.backButton}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!data || !data.post) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>게시글을 찾을 수 없습니다</h2>
          <Link href="/" className={styles.backButton}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { post } = data;

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>작성자: {post.author}</span>
            <span className={styles.date}>
              작성일: {new Date(post.createdAt).toLocaleString("ko-KR")}
            </span>
            {post.updatedAt && (
              <span className={styles.date}>
                수정일: {new Date(post.updatedAt).toLocaleString("ko-KR")}
              </span>
            )}
          </div>
        </header>

        <div className={styles.content}>
          <p>{post.content}</p>
        </div>

        <footer className={styles.footer}>
          <Link href="/" className={styles.backButton}>
            ← 목록으로 돌아가기
          </Link>
        </footer>
      </article>
    </div>
  );
}
