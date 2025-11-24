# GraphQL Practice Project

TypeScript, Next.js App Router, SCSS를 사용하는 GraphQL 실습 프로젝트입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS
- **GraphQL Client**: Apollo Client
- **Package Manager**: npm

## 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 프로젝트 구조

```
grapQL_FE/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   ├── page.module.scss   # 페이지 스타일
│   └── globals.scss       # 전역 스타일
├── GraphQL-Guide.md       # GraphQL 학습 가이드
└── package.json
```

## 학습 가이드

GraphQL에 대한 자세한 내용은 [GraphQL-Guide.md](./GraphQL-Guide.md) 문서를 참고하세요.

## 다음 단계

1. Apollo Client 설정
2. GraphQL 쿼리 작성
3. 컴포넌트에서 데이터 페칭
4. 뮤테이션 구현

## 라이선스

ISC
