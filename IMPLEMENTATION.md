# GraphQL Practice Project

## 프로젝트 실행 방법

### 1. GraphQL 서버 실행 (포트 4000)

```bash
npm run server
```

### 2. Next.js 개발 서버 실행 (포트 3000)

```bash
npm run dev
```

### 3. 동시에 모두 실행

```bash
npm run dev:all
```

## 구현된 기능

### 서버 사이드 렌더링 (SSR)

- **홈페이지** (`/`): 게시판 목록 조회
  - Next.js Server Components 사용
  - Suspense를 통한 로딩 상태 관리
  - Skeleton UI 구현

### 클라이언트 사이드 렌더링 (CSR)

- **게시글 상세** (`/posts/[id]`): 게시물 상세 정보 조회
  - Apollo Client `useQuery` 훅 사용
  - Suspense를 통한 로딩 상태 관리
  - 에러 핸들링 구현

## GraphQL 엔드포인트

```
http://localhost:4000/graphql
```

## 사용 가능한 쿼리

### 게시글 목록 조회

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

### 게시글 상세 조회

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

### 게시글 생성

```graphql
mutation CreatePost($title: String!, $content: String!, $author: String!) {
  createPost(title: $title, content: $content, author: $author) {
    id
    title
    content
    author
    createdAt
  }
}
```

## 프로젝트 구조

```
grapQL_FE/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Apollo Provider)
│   ├── page.tsx                # 홈페이지 (게시판 목록 - SSR)
│   ├── page.module.scss        # 홈페이지 스타일
│   ├── globals.scss            # 전역 스타일
│   └── posts/
│       └── [id]/
│           └── page.tsx        # 게시글 상세 페이지
├── components/
│   ├── PostDetailClient.tsx    # 게시글 상세 컴포넌트 (CSR)
│   └── PostDetail.module.scss  # 게시글 상세 스타일
├── lib/
│   ├── apollo-client.ts        # Apollo Client (SSR용)
│   └── apollo-wrapper.tsx      # Apollo Provider (CSR용)
├── graphql/
│   └── queries.ts              # GraphQL 쿼리 정의
├── types/
│   └── post.ts                 # TypeScript 타입 정의
└── server.js                   # GraphQL Mock 서버
```

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS
- **GraphQL Client**: Apollo Client 4
- **GraphQL Server**: Apollo Server 3
- **상태 관리**: React Suspense

## 주요 특징

✅ **서버 사이드 렌더링**: 게시판 목록은 서버에서 렌더링  
✅ **클라이언트 사이드 렌더링**: 게시글 상세는 클라이언트에서 로드  
✅ **Suspense 활용**: 로딩 상태를 Suspense로 처리  
✅ **Skeleton UI**: 로딩 중 Skeleton 화면 표시  
✅ **타입 안정성**: TypeScript로 완전한 타입 안정성 확보  
✅ **SCSS 스타일링**: 모듈 CSS와 SCSS 사용  
✅ **에러 핸들링**: GraphQL 에러 처리 구현

## 다음 단계

- [ ] GraphQL Mutation 구현 (게시글 작성/수정/삭제)
- [ ] GraphQL Subscription 구현 (실시간 업데이트)
- [ ] Optimistic UI 구현
- [ ] Cache 전략 최적화
- [ ] GraphQL Code Generator 도입
