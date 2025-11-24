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
  - 새 게시글 작성 버튼

### 클라이언트 사이드 렌더링 (CSR)

- **게시글 상세** (`/posts/[id]`): 게시물 상세 정보 조회
  - Apollo Client `useQuery` 훅 사용
  - Suspense를 통한 로딩 상태 관리
  - 에러 핸들링 구현

### CRUD 기능

#### Create (생성)
- **경로**: `/posts/create`
- 새 게시글 작성 폼
- `useMutation`으로 CREATE_POST 실행
- 작성 완료 후 목록으로 리다이렉트
- refetchQueries로 목록 자동 갱신

#### Read (조회)
- **목록**: `/` - 전체 게시글 목록 (SSR)
- **상세**: `/posts/[id]` - 개별 게시글 상세 (CSR)

#### Update (수정)
- **경로**: `/posts/[id]/edit`
- 기존 데이터 로드 후 수정 폼 표시
- `useMutation`으로 UPDATE_POST 실행
- 수정 완료 후 상세 페이지로 리다이렉트

#### Delete (삭제)
- 상세 페이지에서 삭제 버튼 클릭
- 확인 다이얼로그 표시
- `useMutation`으로 DELETE_POST 실행
- 삭제 완료 후 목록으로 리다이렉트
- refetchQueries로 목록 자동 갱신

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

### 게시글 수정

```graphql
mutation UpdatePost($id: ID!, $title: String, $content: String) {
  updatePost(id: $id, title: $title, content: $content) {
    id
    title
    content
    author
    createdAt
    updatedAt
  }
}
```

### 게시글 삭제

```graphql
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
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
│       ├── create/
│       │   └── page.tsx        # 게시글 작성 페이지
│       └── [id]/
│           ├── page.tsx        # 게시글 상세 페이지
│           └── edit/
│               └── page.tsx    # 게시글 수정 페이지
├── components/
│   ├── PostDetailClient.tsx    # 게시글 상세 컴포넌트 (CSR)
│   ├── PostDetail.module.scss  # 게시글 상세 스타일
│   ├── CreatePostForm.tsx      # 게시글 작성 폼 컴포넌트
│   ├── CreatePostForm.module.scss
│   ├── EditPostForm.tsx        # 게시글 수정 폼 컴포넌트
│   └── EditPostForm.module.scss
├── lib/
│   ├── apollo-client.ts        # Apollo Client (SSR용)
│   └── apollo-wrapper.tsx      # Apollo Provider (CSR용)
├── graphql/
│   └── queries.ts              # GraphQL 쿼리 및 뮤테이션 정의
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
✅ **완전한 CRUD**: 게시글 생성, 조회, 수정, 삭제 기능  
✅ **Suspense 활용**: 로딩 상태를 Suspense로 처리  
✅ **Skeleton UI**: 로딩 중 Skeleton 화면 표시  
✅ **타입 안정성**: TypeScript로 완전한 타입 안정성 확보  
✅ **SCSS 스타일링**: 모듈 CSS와 SCSS 사용  
✅ **에러 핸들링**: GraphQL 에러 처리 구현  
✅ **캐시 관리**: refetchQueries로 자동 캐시 갱신  
✅ **UX 개선**: 확인 다이얼로그, 로딩 인디케이터, 버튼 상태 관리

## 다음 단계

- [x] GraphQL Mutation 구현 (게시글 작성/수정/삭제)
- [ ] GraphQL Subscription 구현 (실시간 업데이트)
- [ ] Optimistic UI 구현
- [ ] Cache 전략 최적화
- [ ] GraphQL Code Generator 도입
- [ ] 페이지네이션 구현
- [ ] 검색 기능 추가
- [ ] 댓글 기능 추가
