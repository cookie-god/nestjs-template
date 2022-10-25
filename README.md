## 프로젝트 명

- NestJS 템플릿

## 프레임워크

- NestJS

## 내용

- 템플릿 구조
- 폴더 구조
- 실행 명령어

## 템플릿 구조

- 각 도메인별로 Module / Controller / Service 파일이 존재하며 파일명 규칙은 '도메인명 + module / controller / service' 입니다.
- Ex. Auth 도메인(폴더)안에는 auth.module.ts / auth.controller.ts / auth.service.ts 파일이 존재합니다.

1. Module

   - NestJS는 모듈로 구성이 되어있고, 각 도메인마다 Module을 생성한 다음 app.module.ts에 각 도메인별 모듈을 작성해줘야 한다.

2. Controller

   - Route로부터 받은 요청속의 데이터(path-variable, query-string, body 등)를 각 도메인의 검증 Decorator 거친 뒤, Service에게 해당 데이터를 넘겨주고 비즈니스 로직을 수행하도록 합니다.

3. Service
   - 실제 어플리케이션의 핵심적인 비즈니스로직이 수행되는 영역이다. 그리고 여기서는 트랜잭션, 논리적 유효성 검사를 진행합니다.

## 폴더 구조

```
.
├── common                                                        # 공통적으로 사용하는 로직들이 있는 폴더
│   ├── variable.utils.ts                                         # 공통적으로 사용되는 변수가 있는 파일
│   ├── function.utils.ts                                         # 공통적으로 사용되는 함수가 있는 파일
├── config                                                        # 설정 파일들이 들어가 있는 폴더
│   ├── env                                                       # env 설정 파일들이 있는 폴더
│   │   ├── .dev.env                                              # dev 환경의 env 파일
│   │   ├── .local.env                                            # local 환경의 env 파일
│   ├── logger                                                    # log관련 설정 파일들이 있는 폴더
│   │   ├── logger.function.ts                                    # logger 작성시 request와 response를 파싱해서 기록하게 하는 함수
│   │   ├── logger.service.ts                                     # logger 작성 및 생성 관련된 함수들을 담은 파일
│   ├── base.response.ts                                          # 기본 response class가 담겨있는 파일
│   ├── regularExp.ts                                             # 정규식 관련 파일
│   ├── response.utils.ts                                         # response status들이 작성되어 있는 파일
│   ├── secret.ts                                                 # 서버에서 비밀리에 관리되어야 하는 키값들이 담긴 파일
│   ├── security.utils.ts                                         # 비밀번호 암호화 및 인증 함수가 담긴 파일
├── dist                   	                                      # 빌드시 생성되는 dist 폴더
├── logs                   	                                      # log 폴더
├── node_modules                   	                              # 노드 모듈
├── src                                                           # 소스 코드 폴더                                                  # 관리자 페이지 관련 폴더
│   ├── auth                                                      # Auth 관련 코드
│   │   ├── dto                                                   # dto 폴더
│   │   │   ├── request                                           # Auth Request 폴더
│   │   │   │   ├── patch-auth-info.request.ts                    # 회원정보 수정 Request 클래스 파일
│   │   │   │   ├── post-sign-in.request.ts                       # 로그인 Request 클래스 파일
│   │   │   │   ├── post-sign-up.request.ts                       # 회원가입 Request 클래스 파일
│   │   │   ├── response                                          # Auth Response 폴더
│   │   │   │   ├── post-sign-in.request.ts                       # 로그인 Response 클래스 파일
│   │   │   │   ├── post-sign-up.request.ts                       # 회원가입 Response 클래스 파일
│   │   ├── jwt                                                   # JWT 폴더
│   │   │   ├── jwt.guard.ts                                      # JWT 에러 처리 함수 파일
│   │   │   ├── jwt.payload.ts                                    # JWT payload 클래스 파일
│   │   │   ├── jwt.strategy.ts                                   # JWT 추출/검증 함수 파일
│   │   ├── auth.controller.ts                                    # Auth Controller 파일
│   │   ├── auth.service.ts                                       # Auth Service 파일
│   ├── decorators                                                # Request의 유효성 검증을 진행하는 Custom Decorator 폴더
│   │   ├── auth.module.ts                                        # Auth 도메인의 Request의 유효성을 검증하는 Decorator들이 담긴 파일
│   │   ├── user.decorator.ts                                     # User 도메인의 Request의 유효성을 검증하는 Decorator들이 담긴 파일
│   ├── entity                                                    # 데이터베이스 스키마관련 폴더
│   │   ├── api-call-history.entity.ts                            # ApiCallHistory 스키마 클래스 파일
│   │   ├── user-info.entity.ts                                   # UserInfo 스키마 클래스 파일
│   │   ├── user-salt.entity.ts                                   # UserSalt 스키마 클래스 파일
│   ├── user                                                      # User 관련 코드
│   │   ├── dto                                                   # dto 폴더
│   │   │   ├── request                                           # User Request 폴더
│   │   │   │   ├── get-users.request.ts                          # 회원 리스트 조회 Request 클래스 파일
│   │   │   │   ├── get-users-detail.request.ts                   # 회원 상세 조회 Request 클래스 파일
│   │   │   ├── response                                          # User Response 폴더
│   │   │   │   ├── get-users.request.ts                          # 회원 리스트 조회 Response 클래스 파일
│   │   │   │   ├── get-users-detail.request.ts                   # 회원 상세 조회 Response 클래스 파일
│   │   ├── user.controller.ts                                    # User Controller 파일
│   │   ├── user.module.ts                                        # User Module 파일
│   │   ├── user.service.ts                                       # User Service 파일
├── api-save.service.ts                                           # Api 호출시 ApiSaveService 테이블에 저장하는 함수가 담긴 파일
├── app.controller.ts                                             # Root Controller 파일
├── app.module.ts                                                 # Root Module 파일, 각 도메인별 모듈을 import 해야하고 typeorm 관련 설정이 되어있음
├── app.service.ts                                                # Root Service 파일
├── main.ts                                                       # 서버의 시작 파일, Swagger와 같은 환경 파일들 설정이 되어 있음
├── .eslintrc.js                                                  # eslint 설정 파일
├── .gitignore                                                    # git 에 포함되지 않아야 하는 폴더, 파일들을 작성 해놓는 곳
├── .prettierrc                                                   # prettier 설정 파일
├── nest-cli.json                                                 # nest cli 관련 json 파일
├── package.json                                                  # 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술
├── package-lock.json                                             # 빌드시 생성되는 package-lock.json 파일
├── README.md                                                     # README 파일
├── tsconfig.build.json                                           # tsconfig.json 적용 범위 설정 json 파일
└── tsconfig.json                                                 # typescript 컴파일 옵션이 담긴 json 파일
```

## 실행 명령어

```
local 환경에서 서버 실행
start: npm run start

dev 환경에서 서버 실행
dev: npm run dev
```
