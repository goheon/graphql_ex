'use client';

import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CREATE_POST, GET_POSTS } from '@/graphql/queries';
import { CreatePostData, CreatePostVars } from '@/types/post';
import styles from './CreatePostForm.module.scss';

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const [createPost, { loading, error }] = useMutation<
    CreatePostData,
    CreatePostVars
  >(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => {
      router.push('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await createPost({
        variables: {
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
        },
      });
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>새 게시글 작성</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="author" className={styles.label}>
              작성자
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자 이름을 입력하세요"
              className={styles.input}
              disabled={loading}
            />
          </div>

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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              오류가 발생했습니다: {error.message}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => router.push('/')}
              className={styles.cancelButton}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? '작성 중...' : '게시글 작성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
