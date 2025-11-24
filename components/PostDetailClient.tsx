"use client";

import { GET_POST, DELETE_POST, GET_POSTS } from "@/graphql/queries";
import { GetPostData, GetPostVars, DeletePostData, DeletePostVars } from "@/types/post";
import { useQuery, useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./PostDetail.module.scss";

export default function PostDetailClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isDeleting, setIsDeleting] = useState(false);

  const { loading, error, data } = useQuery<GetPostData, GetPostVars>(
    GET_POST,
    {
      variables: { id },
    }
  );

  const [deletePost] = useMutation<DeletePostData, DeletePostVars>(
    DELETE_POST,
    {
      refetchQueries: [{ query: GET_POSTS }],
      onCompleted: () => {
        router.push('/');
      },
    }
  );

  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost({ variables: { id } });
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('게시글 삭제에 실패했습니다.');
      setIsDeleting(false);
    }
  };

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
          <div className={styles.actions}>
            <Link href={`/posts/${id}/edit`} className={styles.editButton}>
              수정
            </Link>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
          <Link href="/" className={styles.backButton}>
            ← 목록으로 돌아가기
          </Link>
        </footer>
      </article>
    </div>
  );
}
