# NestJS GraphQL Backend

## 📁 프로젝트 구조

\\\
apps/back/
├── src/
│   ├── schema.gql           # 자동 생성된 GraphQL 스키마
│   ├── app.module.ts        # 메인 모듈
│   ├── main.ts              # 애플리케이션 진입점
│   │
│   ├── users/               # Users 모듈
│   │   ├── user.entity.ts        # GraphQL 타입 정의
│   │   ├── user.input.ts         # Input 타입
│   │   ├── users.resolver.ts     # Resolver (엔드포인트)
│   │   ├── users.service.ts      # Service (비즈니스 로직)
│   │   └── users.module.ts       # Module
│   │
│   └── posts/               # Posts 모듈
│       ├── post.entity.ts
│       ├── post.input.ts
│       ├── posts.resolver.ts
│       ├── posts.service.ts
│       └── posts.module.ts
\\\

## 🔍 파일 역할

### schema.gql (자동 생성)
- **위치**: \src/schema.gql\
- **역할**: 전체 GraphQL API 명세서
- **특징**: 
  - 자동 생성되므로 직접 수정하지 않음
  - Entity와 Resolver에서 정의한 내용이 자동으로 반영됨
  - Swagger 문서처럼 API 구조를 한눈에 볼 수 있음

### Entity (*.entity.ts)
- **역할**: GraphQL 타입 정의
- **데코레이터**: \@ObjectType()\, \@Field()\
- **예시**: User, Post, Comment 등
- **결과**: schema.gql에 \	ype User\ 생성

### Input (*.input.ts)
- **역할**: Mutation 입력 데이터 타입
- **데코레이터**: \@InputType()\, \@Field()\
- **예시**: CreateUserInput, UpdateUserInput
- **결과**: schema.gql에 \input CreateUserInput\ 생성

### Resolver (*.resolver.ts)
- **역할**: GraphQL 엔드포인트 (REST의 Controller)
- **데코레이터**: \@Resolver()\, \@Query()\, \@Mutation()\, \@ResolveField()\
- **동작**: 요청 받아서 Service 호출
- **결과**: schema.gql에 Query/Mutation 추가

### Service (*.service.ts)
- **역할**: 비즈니스 로직 처리
- **내용**: CRUD 작업, 데이터 검증, DB 접근
- **특징**: GraphQL과 무관하게 재사용 가능

### Module (*.module.ts)
- **역할**: NestJS 모듈 정의
- **내용**: providers, imports, exports

## 🚀 실행 방법

\\\ash
# 개발 모드
pnpm run start:dev

# 빌드
pnpm run build

# 프로덕션 실행
pnpm run start:prod
\\\

서버 실행 후: http://localhost:4000/graphql

## 📝 새 API 추가 단계

### 1. 폴더 생성
\\\ash
mkdir src/comments
\\\

### 2. 파일 생성 (순서대로)
1. \comment.entity.ts\ - 데이터 모델
2. \comment.input.ts\ - 입력 타입
3. \comments.service.ts\ - 비즈니스 로직
4. \comments.resolver.ts\ - API 엔드포인트
5. \comments.module.ts\ - 모듈 정의

### 3. AppModule에 추가
\\\	ypescript
@Module({
  imports: [
    GraphQLModule.forRoot({...}),
    UsersModule,
    PostsModule,
    CommentsModule,  // 추가
  ],
})
\\\

### 4. 빌드
\\\ash
pnpm run build
\\\

→ \src/schema.gql\이 자동으로 업데이트됨

## 🎯 GraphQL 쿼리 예시

### 모든 게시글과 작성자 조회
\\\graphql
query {
  posts {
    id
    title
    content
    author {
      name
      email
    }
  }
}
\\\

### 게시글 생성
\\\graphql
mutation {
  createPost(createPostInput: {
    title: "My Post"
    content: "Content here"
    authorId: 1
  }) {
    id
    title
  }
}
\\\

### 특정 사용자의 게시글 조회
\\\graphql
query {
  postsByAuthor(authorId: 1) {
    id
    title
    createdAt
  }
}
\\\

## 💡 핵심 개념

### Schema, Resolver, Service 관계

\\\
Client Request
     ↓
schema.gql (API 명세서)
     ↓
Resolver (엔드포인트)
     ↓
Service (비즈니스 로직)
     ↓
Entity (데이터 모델)
\\\

### REST vs GraphQL

| REST | GraphQL |
|------|---------|
| GET /users | Query: users |
| GET /users/:id | Query: user(id) |
| POST /users | Mutation: createUser |
| PUT /users/:id | Mutation: updateUser |
| DELETE /users/:id | Mutation: deleteUser |

### 스키마 자동 생성

\\\	ypescript
// Entity 작성
@ObjectType()
class User {
  @Field() name!: string;
}

// Resolver 작성
@Query(() => [User])
users() { ... }

// 빌드 → schema.gql에 자동 추가
type User { name: String! }
type Query { users: [User!]! }
\\\

## 🔧 설정 정보

### autoSchemaFile 경로
- **현재**: \src/schema.gql\ (소스코드와 함께 관리)
- **변경 가능**: \join(__dirname, '..', 'schema.gql')\ 수정

### playground
- **활성화**: \playground: true\
- **접속**: http://localhost:4000/graphql

## 📚 참고 자료

- [NestJS GraphQL 문서](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL 공식 문서](https://graphql.org/)
