# 요구사항

- 계정 로그인, 로그아웃이 가능한 프로젝트
- 타입스크립트 사용
- README 작성
- Swagger 작성
- `Passport JWT`와 `Passport local`을 사용하여 계정 인증

# 사용 기술 스택

NestJS, PostgreSQL, TypeORM, bcrypt

# DB

User 테이블을 만들고 API에 따라 자유롭게 컬럼 구성

# ERD

# API

- `/login` [GET]: 로그인 화면이 나오는 HTML 페이지 리턴
- `/login` [POST]: 로그인 요청
- `/logout` [POST]: 로그아웃 요청
- `/signup` [POST]: 회원가입 요청
