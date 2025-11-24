<div align="center">

# 🚀 GraphQL 학습 프로젝트

### Next.js App Router + TypeScript + Apollo Client

**Server-Side Rendering (SSR)과 Client-Side Rendering (CSR)의 차이를 학습하는 GraphQL 게시판 애플리케이션**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollo-graphql)](https://www.apollographql.com/)

[📖 시작하기](#-시작하기) • [✨ 주요 기능](#-주요-기능) • [🏗️ 구조](#️-프로젝트-구조) • [📚 학습 포인트](#-학습-포인트)

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
- [라이선스](#-라이선스)

---

## 🎯 개요

이 프로젝트는 **GraphQL**을 처음 배우는 개발자를 위한 실습 프로젝트입니다.

Next.js의 **Server Component**와 **Client Component**를 활용하여:
- **SSR (Server-Side Rendering)**: 서버에서 미리 데이터를 불러온 후 렌더링
- **CSR (Client-Side Rendering)**: 클라이언트에서 동적으로 데이터를 로드

이 두 가지 방식의 차이를 실제로 경험하면서 GraphQL을 학습할 수 있습니다.

### 🎓 학습 목표

- ✅ GraphQL Query & Mutation의 기본 개념 이해
- ✅ Apollo Client를 통한 SSR/CSR 데이터 페칭
- ✅ React Suspense를 활용한 로딩 상태 관리
- ✅ GraphQL CRUD (Create, Read, Update, Delete) 구현
- ✅ TypeScript를 활용한 타입 안전한 GraphQL 개발

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **GraphQL Client**: Apollo Client 4.0.9
- **State Management**: Apollo Client Cache

### Backend (GraphQL Mock Server)
- **Server**: Apollo Server 3.13
- **Runtime**: Node.js
- **Storage**: In-Memory (배열과 Map)

---

## ✨ 주요 기능

### 📝 게시판 (CRUD)

| 기능 | 렌더링 방식 | 설명 |
|------|-------------|------|
| **게시글 목록 조회** | SSR | Server Component에서 서버 데이터를 미리 로드 |
| **게시글 상세 조회** | CSR | Client Component에서 클라이언트 데이터 로드 |
| **게시글 작성** | CSR | Apollo Mutation으로 새 게시글 생성 |
| **게시글 수정** | CSR | 기존 게시글 정보 수정 |
| **게시글 삭제** | CSR | 게시글 삭제 및 캐시 자동 갱신 |

### 🔄 렌더링 패턴

```
SSR (Server Component)        CSR (Client Component)
┌─────────────────────────┐  ┌─────────────────────────┐
│  홈 페이지               │  │  게시글 상세            │
│  - 게시글 목록           │  │  - 동적 로드            │
│  - 서버에서 미리 로드    │  │  - 상호작용 요소        │
└─────────────────────────┘  └─────────────────────────┘
```

---

## 🚀 시작하기

### 1️⃣ 설치

```bash
# 의존성 설치
npm install
```

### 2️⃣ 개발 서버 실행

```bash
# GraphQL 서버와 Next.js 개발 서버를 동시에 실행
npm run dev:all

# 또는 개별 실행
npm run server  # GraphQL 서버 (포트 4000)
npm run dev     # Next.js 서버 (포트 3000)
```

### 3️⃣ 브라우저 접속

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
├── 📁 app/                          # Next.js App Router
│   ├── layout.tsx                   # 루트 레이아웃 (Apollo Provider)
│   ├── page.tsx                     # 홈 페이지 (게시글 목록 - SSR)
│   ├── page.module.scss
│   ├── globals.scss                 # 전역 스타일
│   │
│   └── posts/                       # 게시글 관련 페이지
│       ├── [id]/
│       │   ├── page.tsx             # 게시글 상세 (동적 라우트 - CSR)
│       │   └── edit/
│       │       └── page.tsx         # 게시글 수정 페이지
│       └── create/
│           └── page.tsx             # 게시글 작성 페이지
│
├── 📁 components/                   # React 컴포넌트
│   ├── PostDetailClient.tsx         # 게시글 상세 (Client Component)
│   ├── CreatePostForm.tsx           # 게시글 작성 폼
│   ├── EditPostForm.tsx             # 게시글 수정 폼
│   └── *.module.scss                # 컴포넌트 스타일
│
├── 📁 lib/                          # 라이브러리 설정
│   ├── apollo-client.ts             # Server Component용 Apollo Client
│   └── apollo-wrapper.tsx           # Client Component용 Apollo Provider
│
├── 📁 graphql/                      # GraphQL 정의
│   └── queries.ts                   # GraphQL Queries & Mutations
│
├── 📁 types/                        # TypeScript 타입 정의
│   └── post.ts                      # Post 관련 인터페이스
│
├── 📄 server.js                     # GraphQL Mock 서버
└── 📄 package.json
```

---

## 📡 GraphQL API

### 📥 Query (데이터 조회)

#### GetPosts - 게시글 목록 조회
```graphql
query GetPosts {
  posts {
    id
    title
    author
    createdAt
  }
}
```

#### GetPost - 특정 게시글 조회
```graphql
query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
    author
    createdAt
    updatedAt
  }
}
```

### ✏️ Mutation (데이터 조작)

#### CreatePost - 게시글 작성
```graphql
mutation CreatePost(
  $title: String!
  $content: String!
  $author: String!
) {
  createPost(
    title: $title
    content: $content
    author: $author
  ) {
    id
    title
    content
    author
    createdAt
  }
}
```

#### UpdatePost - 게시글 수정
```graphql
mutation UpdatePost(
  $id: ID!
  $title: String
  $content: String
) {
  updatePost(
    id: $id
    title: $title
    content: $content
  ) {
    id
    title
    content
    updatedAt
  }
}
```

#### DeletePost - 게시글 삭제
```graphql
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
```

---

## � 실시간 디버깅 로거

GraphQL 서버는 모든 요청과 응답을 실시간으로 로깅합니다. 서버 콘솔에서 아래와 같은 형태로 출력됩니다:

### 로그 구조

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:07:29] 🖥️  [Server Component] GetPosts
📥 Query.posts
   → 4 posts
✅ Success
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 로그 요소 설명

| 요소 | 의미 |
|------|------|
| `[오후 2:07:29]` | 요청 시간 (타임스탬프) |
| `🖥️ [Server Component]` | Next.js 서버에서 실행된 요청 |
| `🌐 [Client]` | 브라우저 클라이언트에서 실행된 요청 |
| `GetPosts` | GraphQL 작업명 |
| `📥 Query.posts` | 실행된 쿼리 |
| `→ 4 posts` | 쿼리 결과 (몇 개의 게시글 반환) |
| `✅ Success` | 성공 여부 |
| `❌ Errors: ...` | 에러 메시지 (있을 경우) |

### 작업별 로그 예제

#### 게시글 목록 조회 (SSR)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:07:29] 🖥️  [Server Component] GetPosts
📥 Query.posts
   → 4 posts
✅ Success
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 게시글 상세 조회 (CSR)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:08:15] 🌐 [Client] GetPost
📥 Query.post(id: 1)
   → "GraphQL 시작하기"
✅ Success
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 게시글 작성 (CSR)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:09:30] 🌐 [Client] CreatePost
✏️  Mutation.createPost
   → "새로운 주제" by 홍길동
   → Created #5 (Total: 5)
✅ Success
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 에러 발생 예제
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:10:00] 🌐 [Client] GetPost
📥 Query.post(id: 999)
   → Not found
❌ Errors: Post not found
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 💡 활용법

1. **개발 중 디버깅**: 브라우저와 서버 콘솔을 함께 모니터링
2. **SSR vs CSR 구분**: 어느 쪽에서 요청이 발생했는지 확인
3. **성능 측정**: 타임스탬프로 응답 시간 추적
4. **에러 추적**: 어떤 Query/Mutation에서 에러가 발생했는지 확인

---

## �📚 학습 포인트

### 1️⃣ Server Component vs Client Component

```tsx
// ✅ Server Component (SSR)
// 서버에서 렌더링되어 초기 HTML에 포함됨
async function PostList() {
  const client = getClient(); // RSC용 Apollo Client
  const { data } = await client.query({
    query: GET_POSTS,
  });
  return <ul>...</ul>;
}

// ✅ Client Component (CSR)
// 클라이언트에서 렌더링되고 상호작용 가능
"use client";
function PostDetailClient() {
  const { data, loading } = useQuery(GET_POST, {
    variables: { id },
  });
  return <article>...</article>;
}
```

**📌 언제 어떤 걸 사용할까?**
- **Server Component**: 초기 로딩 속도가 중요할 때, 서버만 접근 가능한 리소스가 필요할 때
- **Client Component**: 사용자 상호작용이 필요할 때, 실시간 업데이트가 필요할 때

### 2️⃣ React Suspense 활용

```tsx
// 로딩 중에 폴백 UI 표시
<Suspense fallback={<PostListSkeleton />}>
  <PostList />
</Suspense>
```

### 3️⃣ Apollo Client 캐시 관리

```tsx
// Mutation 성공 후 자동으로 Query 재실행
const [createPost] = useMutation(CREATE_POST, {
  refetchQueries: [{ query: GET_POSTS }], // 캐시 자동 갱신
});
```

### 4️⃣ TypeScript 타입 안전성

```tsx
// 강타입으로 GraphQL 변수와 응답 정의
interface CreatePostVars {
  title: string;
  content: string;
  author: string;
}

interface CreatePostData {
  createPost: Post;
}

// useMutation에 제네릭 타입 전달
useMutation<CreatePostData, CreatePostVars>(CREATE_POST);
```

### 5️⃣ GraphQL 변수 활용

```tsx
// 동적 변수를 안전하게 전달
const { data } = useQuery(GET_POST, {
  variables: { id: "1" }, // 변수 값 주입
});
```

---

## 🔍 서버 디버깅

GraphQL 서버는 모든 요청을 실시간으로 로깅합니다:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[오후 2:07:29] 🖥️  [Server Component] GetPosts
📥 Query.posts
   → 4 posts
✅ Success
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📖 추가 학습 자료

### 공식 문서
- [Next.js App Router](https://nextjs.org/docs/app)
- [Apollo Client 공식 문서](https://www.apollographql.com/docs/react/)
- [GraphQL 공식 가이드](https://graphql.org/learn/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

### 추천 학습 순서
1. GraphQL 기본 개념 이해
2. 이 프로젝트의 `server.js` 스키마 분석
3. `graphql/queries.ts`에서 Query와 Mutation 작성 방식 학습
4. `lib/apollo-client.ts`와 `lib/apollo-wrapper.tsx` 비교
5. 각 페이지 컴포넌트에서 SSR/CSR 차이 확인
6. 게시글 작성/수정/삭제 기능 직접 구현해보기

---

## 📝 라이선스

[ISC](LICENSE)

---

## 🤝 기여

이 프로젝트는 학습 목적으로 만들어졌습니다. 피드백과 개선 제안은 언제든 환영합니다!

---

<div align="center">

**Made with ❤️ for GraphQL Learning**

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!

</div>
