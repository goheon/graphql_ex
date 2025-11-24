const { ApolloServer, gql } = require("apollo-server");

// Mock 데이터
const posts = [
  {
    id: "1",
    title: "GraphQL 시작하기",
    content:
      "GraphQL은 Facebook에서 만든 쿼리 언어입니다. REST API의 단점을 보완하고, 클라이언트가 필요한 데이터만 정확히 요청할 수 있게 해줍니다.",
    author: "홍길동",
    createdAt: new Date("2025-11-20").toISOString(),
    updatedAt: new Date("2025-11-21").toISOString(),
  },
  {
    id: "2",
    title: "Apollo Client 활용법",
    content:
      "Apollo Client는 GraphQL을 사용하는 가장 인기있는 클라이언트 라이브러리입니다. 캐싱, 상태관리, 에러 핸들링 등 다양한 기능을 제공합니다.",
    author: "김철수",
    createdAt: new Date("2025-11-22").toISOString(),
  },
  {
    id: "3",
    title: "Next.js App Router와 GraphQL",
    content:
      "Next.js 13 이상의 App Router에서 GraphQL을 사용하는 방법을 알아봅니다. 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 활용하는 것이 중요합니다.",
    author: "이영희",
    createdAt: new Date("2025-11-23").toISOString(),
  },
  {
    id: "4",
    title: "TypeScript와 GraphQL 타입 안정성",
    content:
      "GraphQL과 TypeScript를 함께 사용하면 강력한 타입 안정성을 얻을 수 있습니다. codegen을 활용하면 자동으로 타입을 생성할 수 있습니다.",
    author: "박민수",
    createdAt: new Date("2025-11-24").toISOString(),
  },
];

// GraphQL Schema
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
    updatedAt: String
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Boolean!
  }
`;

// 디버그 미들웨어 - 간결한 로깅
const debugMiddleware = {
  async requestDidStart(requestContext) {
    const operation = requestContext.request.operationName || "Anonymous";
    const timestamp = new Date().toLocaleTimeString("ko-KR");
    const { request } = requestContext;

    // HTTP 헤더에서 요청 출처 확인
    const headers = request.http?.headers;
    const userAgent = headers?.get("user-agent") || "";
    const referer = headers?.get("referer") || "";

    // Next.js 서버 컴포넌트 요청 감지
    const isServerComponent =
      userAgent.includes("undici") ||
      userAgent.includes("node-fetch") ||
      !userAgent.includes("Mozilla");

    const source = isServerComponent ? "🖥️  [Server Component]" : "🌐 [Client]";

    console.log(`\n${"━".repeat(50)}`);
    console.log(`[${timestamp}] ${source} ${operation}`);
    if (referer) {
      console.log(`   From: ${referer}`);
    }

    return {
      async willSendResponse({ response }) {
        if (response.errors) {
          console.log(
            "❌ Errors:",
            response.errors.map((e) => e.message).join(", ")
          );
        } else {
          console.log("✅ Success");
        }
        console.log("━".repeat(50));
      },
    };
  },
};

// Resolvers with logging
const resolvers = {
  Query: {
    posts: () => {
      console.log("📥 Query.posts");
      console.log(`   → ${posts.length} posts`);
      return posts;
    },
    post: (_, { id }) => {
      console.log(`📥 Query.post(id: ${id})`);
      const result = posts.find((post) => post.id === id);
      console.log(`   → ${result ? `"${result.title}"` : "Not found"}`);
      return result;
    },
  },
  Mutation: {
    createPost: (_, { title, content, author }) => {
      console.log(`✏️  Mutation.createPost`);
      console.log(`   → "${title}" by ${author}`);
      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
      };
      posts.push(newPost);
      console.log(`   → Created #${newPost.id} (Total: ${posts.length})`);
      return newPost;
    },
    updatePost: (_, { id, title, content }) => {
      console.log(`🔄 Mutation.updatePost(id: ${id})`);
      const post = posts.find((p) => p.id === id);
      if (!post) {
        console.log("   → Not found ❌");
        return null;
      }

      if (title) post.title = title;
      if (content) post.content = content;
      post.updatedAt = new Date().toISOString();
      console.log(`   → Updated "${post.title}"`);
      return post;
    },
    deletePost: (_, { id }) => {
      console.log(`🗑️  Mutation.deletePost(id: ${id})`);
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) {
        console.log("   → Not found ❌");
        return false;
      }

      const deleted = posts[index];
      posts.splice(index, 1);
      console.log(`   → Deleted "${deleted.title}" (Total: ${posts.length})`);
      return true;
    },
  },
};

// Apollo Server 설정
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*",
    credentials: true,
  },
  plugins: [debugMiddleware],
});

// 서버 시작
server.listen({ port: 4000 }).then(({ url }) => {
  console.log("\n" + "🚀".repeat(30));
  console.log(`🚀 GraphQL Server ready at ${url}`);
  console.log(`📝 GraphQL Playground available at ${url}`);
  console.log(`🔍 Debug mode: ENABLED`);
  console.log("🚀".repeat(30) + "\n");
});
