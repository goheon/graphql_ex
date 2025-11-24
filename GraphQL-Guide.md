# GraphQL 학습 가이드

## 목차

1. [GraphQL 소개](#graphql-소개)
2. [GraphQL vs REST API](#graphql-vs-rest-api)
3. [핵심 개념](#핵심-개념)
4. [스키마와 타입](#스키마와-타입)
5. [쿼리와 뮤테이션](#쿼리와-뮤테이션)
6. [Apollo Client 사용법](#apollo-client-사용법)
7. [실습 예제](#실습-예제)

---

## GraphQL 소개

GraphQL은 Facebook에서 개발한 **API를 위한 쿼리 언어**이자 **런타임**입니다. 클라이언트가 필요한 데이터의 구조를 정의하면, 서버는 정확히 그 구조에 맞춰 데이터를 반환합니다.

### 주요 특징

- **선언적 데이터 페칭**: 클라이언트가 필요한 데이터만 요청
- **단일 엔드포인트**: 하나의 엔드포인트로 모든 데이터 요청 처리
- **강력한 타입 시스템**: 스키마를 통한 명확한 API 계약
- **실시간 데이터**: Subscription을 통한 실시간 데이터 업데이트

---

## GraphQL vs REST API

| 특성           | GraphQL                      | REST API                             |
| -------------- | ---------------------------- | ------------------------------------ |
| 엔드포인트     | 단일 엔드포인트 (`/graphql`) | 다중 엔드포인트 (`/users`, `/posts`) |
| 데이터 페칭    | 필요한 데이터만 요청         | 고정된 데이터 구조 반환              |
| Over-fetching  | ❌ 없음                      | ✅ 발생 가능                         |
| Under-fetching | ❌ 없음                      | ✅ 발생 가능 (여러 요청 필요)        |
| 버전 관리      | 불필요 (스키마 진화)         | 필요 (v1, v2)                        |
| 타입 시스템    | 강력한 타입 시스템           | 약한 타입 시스템                     |

### Over-fetching과 Under-fetching

**Over-fetching**: 필요 이상의 데이터를 받는 현상

```javascript
// REST: 사용자 이름만 필요해도 모든 정보를 받음
GET / users / 1;
// Response: { id, name, email, age, address, phone, ... }
```

**Under-fetching**: 필요한 데이터를 얻기 위해 여러 번 요청해야 하는 현상

```javascript
// REST: 사용자와 게시글을 각각 요청
GET /users/1
GET /posts?userId=1
```

---

## 핵심 개념

### 1. Schema (스키마)

GraphQL API의 청사진. 어떤 데이터를 쿼리할 수 있는지 정의합니다.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
```

### 2. Query (쿼리)

데이터를 **읽기** 위한 작업

```graphql
query GetUser {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
```

### 3. Mutation (뮤테이션)

데이터를 **생성, 수정, 삭제**하기 위한 작업

```graphql
mutation CreatePost {
  createPost(title: "Hello", content: "World") {
    id
    title
    createdAt
  }
}
```

### 4. Subscription (구독)

**실시간 데이터**를 받기 위한 작업

```graphql
subscription OnPostCreated {
  postCreated {
    id
    title
    author {
      name
    }
  }
}
```

---

## 스키마와 타입

### 기본 스칼라 타입

- `Int`: 정수
- `Float`: 부동 소수점
- `String`: 문자열
- `Boolean`: 참/거짓
- `ID`: 고유 식별자

### 타입 수식어

- `String!`: 필수 (non-nullable)
- `[String!]`: String 배열 (배열 자체는 null 가능, 요소는 non-null)
- `[String!]!`: 필수 String 배열 (배열도 요소도 non-null)

### 커스텀 타입 정의

```graphql
type Query {
  users: [User!]!
  user(id: ID!): User
  posts(limit: Int): [Post!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}
```

---

## 쿼리와 뮤테이션

### 쿼리 작성 예제

```graphql
# 기본 쿼리
query {
  users {
    id
    name
  }
}

# 변수 사용
query GetUserById($userId: ID!) {
  user(id: $userId) {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# 별칭(Alias) 사용
query {
  user1: user(id: "1") {
    name
  }
  user2: user(id: "2") {
    name
  }
}

# 프래그먼트 사용
fragment UserInfo on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserInfo
    posts {
      title
    }
  }
}
```

### 뮤테이션 작성 예제

```graphql
# 생성
mutation CreateNewUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}

# 변수
{
  "input": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}

# 수정
mutation UpdateExistingUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}

# 삭제
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

---

## Apollo Client 사용법

### 설치

```bash
npm install @apollo/client graphql
```

### 초기 설정

```typescript
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://api.example.com/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
```

### Provider 설정

```typescript
// app/layout.tsx
"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
```

### useQuery 사용

```typescript
"use client";

import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user: any) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

### useMutation 사용

```typescript
"use client";

import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          input: { name, email },
        },
      });
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>User created: {data.createUser.name}</p>}
    </form>
  );
}
```

### 캐시 업데이트

```typescript
const [createUser] = useMutation(CREATE_USER, {
  update(cache, { data: { createUser } }) {
    cache.modify({
      fields: {
        users(existingUsers = []) {
          const newUserRef = cache.writeFragment({
            data: createUser,
            fragment: gql`
              fragment NewUser on User {
                id
                name
                email
              }
            `,
          });
          return [...existingUsers, newUserRef];
        },
      },
    });
  },
});
```

---

## 실습 예제

### 1. 공개 GraphQL API로 실습하기

#### SpaceX API

```typescript
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
});

export default client;
```

```typescript
// 쿼리 예제
const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int!) {
    launchesPast(limit: $limit) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        article_link
        video_link
      }
    }
  }
`;
```

#### GitHub GraphQL API

```typescript
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer YOUR_GITHUB_TOKEN`,
  },
  cache: new InMemoryCache(),
});

const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      name
      bio
      repositories(first: 5) {
        nodes {
          name
          description
          stargazerCount
        }
      }
    }
  }
`;
```

### 2. 로컬 GraphQL 서버 만들기

```typescript
// pages/api/graphql.ts (Next.js API Route)
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) =>
      users.find((user) => user.id === id),
  },
  Mutation: {
    createUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
```

---

## 추가 학습 자료

- [GraphQL 공식 문서](https://graphql.org/)
- [Apollo Client 문서](https://www.apollographql.com/docs/react/)
- [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)
- [공개 GraphQL API 목록](https://github.com/APIs-guru/graphql-apis)

## 유용한 도구

- **GraphiQL**: GraphQL IDE
- **Apollo DevTools**: Chrome 확장 프로그램
- **GraphQL Code Generator**: TypeScript 타입 자동 생성
- **Postman**: GraphQL 요청 테스트

---

## 프로젝트 구조 권장사항

```
grapQL_FE/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.scss
├── lib/
│   └── apollo-client.ts
├── graphql/
│   ├── queries/
│   │   └── users.ts
│   └── mutations/
│       └── createUser.ts
├── components/
│   ├── UserList.tsx
│   └── CreateUserForm.tsx
└── types/
    └── graphql.ts
```

---

**Happy Learning! 🚀**
