'use client';

import { useQuery, useMutation } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GET_POST, UPDATE_POST } from '@/graphql/queries';
import {
  GetPostData,
  GetPostVars,
  UpdatePostData,
  UpdatePostVars,
} from '@/types/post';
import styles from './EditPostForm.module.scss';

export default function EditPostForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { loading: queryLoading, error: queryError, data } = useQuery<
    GetPostData,
    GetPostVars
  >(GET_POST, {
    variables: { id },
  });

  const [updatePost, { loading: mutationLoading, error: mutationError }] =
    useMutation<UpdatePostData, UpdatePostVars>(UPDATE_POST, {
      onCompleted: () => {
        router.push(`/posts/${id}`);
      },
    });

  useEffect(() => {
    if (data?.post) {
      setTitle(data.post.title);
      setContent(data.post.content);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await updatePost({
        variables: {
          id,
          title: title.trim(),
          content: content.trim(),
        },
      });
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  if (queryLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (queryError || !data?.post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>게시글을 찾을 수 없습니다</h2>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const { post } = data;

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>게시글 수정</h1>

        <div className={styles.authorInfo}>
          <span>작성자: {post.author}</span>
          <span>작성일: {new Date(post.createdAt).toLocaleString('ko-KR')}</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className={styles.input}
              disabled={mutationLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              className={styles.textarea}
              rows={10}
              disabled={mutationLoading}
            />
          </div>

          {mutationError && (
            <div className={styles.errorMessage}>
              오류가 발생했습니다: {mutationError.message}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => router.push(`/posts/${id}`)}
              className={styles.cancelButton}
              disabled={mutationLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={mutationLoading}
            >
              {mutationLoading ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
