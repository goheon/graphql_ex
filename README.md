<div align="center">

# 🚀 GraphQL Practice Project

### Next.js + TypeScript + Apollo Client 실습 프로젝트

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollo-graphql)](https://www.apollographql.com/)

**SSR/CSR 데이터 페칭, CRUD 연산, 파일 업로드**를 구현한 GraphQL 게시판 애플리케이션

[📖 시작하기](#-시작하기) • [✨ 주요 기능](#-주요-기능) • [🏗️ 프로젝트 구조](#️-프로젝트-구조) • [📚 학습 가이드](#-학습-가이드)

</div>

---

## 📋 목차

- [개요](#-개요)
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [시작하기](#-시작하기)
- [프로젝트 구조](#️-프로젝트-구조)
- [GraphQL API](#-graphql-api)
- [학습 포인트](#-학습-포인트)

---

## 🎯 개요

이 프로젝트는 **GraphQL**을 활용한 실무 중심의 실습 프로젝트입니다. Next.js App Router의 **Server Component**와 **Client Component**를 모두 활용하여 SSR과 CSR의 차이를 이해하고, Apollo Client를 통해 GraphQL CRUD 작업을 구현합니다.

### 🎓 학습 목표

- ✅ GraphQL Query & Mutation 작성법 익히기
- ✅ Apollo Client로 SSR/CSR 데이터 페칭 구현
- ✅ React Suspense를 활용한 로딩 상태 관리
- ✅ GraphQL 파일 업로드 (multipart/form-data)
- ✅ TypeScript로 타입 안전한 GraphQL 개발

---

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: SCSS Modules
- **State Management**: Apollo Client Cache
- **GraphQL Client**: Apollo Client 4.0

### Backend (Mock Server)

- **Server**: Apollo Server 3.13
- **Upload**: graphql-upload 13.0
- **Storage**: In-Memory (Map)

---

## ✨ 주요 기능

### 📝 게시판 CRUD

| 기능            | 렌더링 방식            | 설명                                      |
| --------------- | ---------------------- | ----------------------------------------- |
| **게시글 목록** | SSR (Server Component) | 서버에서 데이터를 미리 불러와 초기 렌더링 |
| **게시글 상세** | CSR (Client Component) | 클라이언트에서 동적으로 데이터 로드       |
| **게시글 작성** | CSR                    | 이미지 업로드 포함                        |
| **게시글 수정** | CSR                    | 기존 이미지 유지/교체 가능                |
| **게시글 삭제** | CSR                    | 연관된 이미지도 자동 삭제                 |

### 🖼️ 이미지 업로드

- GraphQL `Upload` 스칼라 타입 사용
- Multipart/form-data 방식
- 메모리 내 Base64 인코딩 저장
- 이미지 미리보기 지원

### 🔍 실시간 디버깅

서버 콘솔에서 모든 GraphQL 작업 추적:

- 📥 Query 실행 로그
- ✏️ Mutation 실행 로그
- 🖥️ Server Component vs 🌐 Client 구분
- ⏱️ 타임스탬프 및 성능 추적

---

## 🚀 시작하기

### 1️⃣ 설치

```bash
# 의존성 설치
npm install
```

### 2️⃣ 개발 서버 실행

```bash
# GraphQL 서버 + Next.js 개발 서버 동시 실행
npm run dev:all

# 또는 개별 실행
npm run server  # GraphQL 서버 (포트 4000)
npm run dev     # Next.js 서버 (포트 3000)
```

### 3️⃣ 접속

- **Next.js 앱**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000

### 4️⃣ 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 🏗️ 프로젝트 구조

```
grapQL_FE/
├── 📁 app/                        # Next.js App Router
│   ├── layout.tsx                 # 루트 레이아웃 (Apollo Provider)
│   ├── page.tsx                   # 홈 (게시글 목록 - SSR)
│   ├── page.module.scss
│   ├── globals.scss
│   └── posts/
│       ├── [id]/
│       │   ├── page.tsx           # 게시글 상세 페이지
│       │   └── edit/
│       │       └── page.tsx       # 게시글 수정 페이지
│       └── create/
│           └── page.tsx           # 게시글 작성 페이지
│
├── 📁 components/                 # React 컴포넌트
│   ├── PostDetailClient.tsx       # 게시글 상세 (CSR)
│   ├── CreatePostForm.tsx         # 작성 폼
│   ├── EditPostForm.tsx           # 수정 폼
│   └── *.module.scss
│
├── 📁 lib/                        # 라이브러리 설정
│   ├── apollo-client.ts           # SSR Apollo Client
│   └── apollo-wrapper.tsx         # CSR Apollo Provider
│
├── 📁 graphql/                    # GraphQL 정의
│   └── queries.ts                 # Queries & Mutations
│
├── 📁 types/                      # TypeScript 타입
│   └── post.ts                    # Post 관련 인터페이스
│
├── 📄 server.js                   # GraphQL Mock 서버
└── 📄 package.json
```

---

## 📡 GraphQL API

### Queries

```graphql
# 게시글 목록 조회
query GetPosts {
  posts {
    id
    title
    author
    createdAt
    image {
      id
      filename
      data
    }
  }
}

# 게시글 상세 조회
query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
    author
    createdAt
    updatedAt
    image {
      id
      filename
      mimetype
      data
    }
  }
}
```

### Mutations

```graphql
# 게시글 작성
mutation CreatePost(
  $title: String!
  $content: String!
  $author: String!
  $image: Upload
) {
  createPost(title: $title, content: $content, author: $author, image: $image) {
    id
    title
    image {
      id
      filename
    }
  }
}

# 게시글 수정
mutation UpdatePost(
  $id: ID!
  $title: String
  $content: String
  $image: Upload
) {
  updatePost(id: $id, title: $title, content: $content, image: $image) {
    id
    title
    updatedAt
  }
}

# 게시글 삭제
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
```

---

## 🎓 학습 포인트

### 1. Server Component vs Client Component

```tsx
// ✅ Server Component (SSR)
async function PostList() {
  const client = getClient(); // RSC용 Apollo Client
  const { data } = await client.query({ query: GET_POSTS });
  // ...
}

// ✅ Client Component (CSR)
("use client");
function PostDetailClient() {
  const { data } = useQuery(GET_POST, { variables: { id } });
  // ...
}
```

### 2. React Suspense 활용

```tsx
<Suspense fallback={<PostListSkeleton />}>
  <PostList />
</Suspense>
```

### 3. Apollo Client Cache 관리

```tsx
// Mutation 후 자동으로 Query 재실행
useMutation(CREATE_POST, {
  refetchQueries: [{ query: GET_POSTS }],
});
```

### 4. GraphQL File Upload

```tsx
// 파일을 변수로 전달
await createPost({
  variables: {
    title,
    content,
    author,
    image: file, // File 객체
  },
});
```

### 5. TypeScript 타입 안전성

```tsx
interface CreatePostVars {
  title: string;
  content: string;
  author: string;
  image?: File | null;
}

useMutation<CreatePostData, CreatePostVars>(CREATE_POST);
```

---

## 📚 추가 학습 자료

- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [Apollo Client 공식 문서](https://www.apollographql.com/docs/react/)
- [GraphQL 공식 문서](https://graphql.org/learn/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)

---

## 📝 라이선스

MIT License

---

<div align="center">

**Made with ❤️ for GraphQL Learning**

</div>
