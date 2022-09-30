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
- Ex. Auth 도메인(폴더)안에는 auth.module.ts / auth.controller.ts / auth.service.ts 파일과 각 테스트 파일이 존재합니다.

1. Module

   - NestJS는 모듈로 구성이 되어있고, 각 도메인마다 Module을 생성한 다음 app.module.ts에 각 도메인별 모듈을 작성해줘야 한다.

2. Controller

   - Route로부터 받은 요청속의 데이터(path-variable, query-string, body 등)를 받은 뒤, Service에게 해당 데이터를 넘겨주고 비즈니스 로직을 수행하도록 합니다.

3. Service
   - 실제 어플리케이션의 핵심적인 비즈니스로직이 수행되는 영역이다. 그리고 여기서는 트랜잭션, 논리적 유효성 검사를 진행합니다.

## 폴더 구조

```
.
├── common                                                        # 공통적으로 사용하는 로직들이 있는 폴더
│   ├── logger                                                    # log관련 설정 파일들이 있는 폴더
│   │   ├── logger.function.ts                                 # logger에 작성될 내용들을 작성한 파일
│   │   ├── logger.service.ts                                     # logger 종류를 나타낸 파일
│   ├── variable.utils.ts                                         # 공통적으로 사용되는 변수가 있는 파일
│   ├── function.utils.ts                                         # 공통적으로 사용되는 함수가 있는 파일
├── config                                                        # 설정 파일들이 들어가 있는 폴더
│   ├── base.response.ts                                          # 기본 response 양식
│   ├── regularExp.ts                                             # 정규식 관련 파일
│   ├── response.utils.ts                                         # response status 관리
│   ├── secret.ts                                                 # 시크릿 키
│   ├── security.utils.ts                                         # 비밀번호 암호화 파일
├── dist                   	                                      # dist 폴더
├── logs                   	                                      # log 폴더
├── node_modules                   	                              # 노드 모듈
├── src                                                           # 소스 코드 폴더
│   ├── Admin                                                     # 관리자 페이지 관련 폴더
│   │   ├── auth                                                  # auth 관련 코드
│   │   │   ├── dto                                               # dto 폴더
│   │   │   │   ├── post-sign-in.request.ts                      # 로그인 Request
│   │   │   │   ├── post-sign-in.response.ts                     # 로그인 Response
│   │   │   │   ├── post-sign-up.request.ts                      # 회원가입 Request
│   │   │   │   ├── post-sign-up.response.ts                     # 회원가입 Response
│   │   │   ├── jwt                                               # jwt 폴더
│   │   │   │   ├── jwt.guard.ts                                  # jwt 에러 처리 파일
│   │   │   │   ├── jwt.payload.ts                                # jwt payload 파일
│   │   │   │   ├── jwt.strategy.ts                               # jwt 추출/검증 파일
│   │   │   │   ├── jwt.utils.ts                                  # jwt-decode 모듈 검증 파일
│   │   │   ├── auth.controller.spec.ts                           # auth controller 테스트 파일
│   │   │   ├── auth.controller.ts                                # auth controller 파일
│   │   │   ├── auth.module.ts                                    # auth module 파일
│   │   │   ├── auth.service.spec.ts                              # auth service 테스트 파일
│   │   │   ├── auth.service.spec.ts                              # auth service 파일
│   │   ├── user                                                  # user 관련 코드
│   │   │   ├── dto                                               # dto 폴더
│   │   │   │   ├── get-users.response.ts                   # 관리자 회원조회 response
│   │   │   ├── user.controller.spec.ts                           # user controller 테스트 파일
│   │   │   ├── user.controller.ts                                # user controller 파일
│   │   │   ├── user.module.ts                                    # user module 파일
│   │   │   ├── user.service.spec.ts                              # user service 테스트 파일
│   │   │   ├── user.service.spec.ts                              # user service 파일
│   │   ├── decorators                                            # custom decorator 관련 폴더
│   │   │   ├── auth.decorator.ts                                 # request값 검증하는 custom decorator 파일
│   ├── entity                                                    # 데이터베이스 스키마관련 코드
│   │   ├── admin-info.entity.ts                                  # AdminInfo 스키마 파일
│   │   ├── admin-salt.entity.ts                                  # AdminSalt 스키마 파일
│   │   ├── api-call-history.entity.ts                            # ApiCallHistory 스키마 파일
│   │   ├── authority.entity.ts                                   # Authority 스키마 파일
│   │   ├── user-info.entity.ts                                   # UserInfo 스키마 파일
│   │   ├── user-salt.entity.ts                                   # UserSalt 스키마 파일
│   ├── Web                                                       # 웹 페이지 관련 폴더 (기본 구조는 Admin과 비슷)
│   │   ├── auth                                                  # Auth 관련 코드 (기본 구조는 Admin/auth와 비슷)
│   │   ├── decorators                                            # custom decorator 관련 폴더
│   │   │   ├── auth.decorator.ts                                 # request값 검증하는 custom decorator 파일
│   ├── app.controller.spec.ts                                    # root controller 테스트 파일
│   ├── app.controller.ts                                         # root controller 파일
│   ├── app.module.ts                                             # root module 파일, 각 도메인별 모듈을 명시해줘야 함, typeorm 설정이 되어있는 곳
│   ├── app.service.ts                                            # root service 파일
│   ├── main.ts                                                   # 서버 시작 파일
├── .gitignore                                                    # git 에 포함되지 않아야 하는 폴더, 파일들을 작성 해놓는 곳
├── package-lock.json
├── package.json                                                  # 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술
├── tsconfig.build.json                                           # tsconfig.json 적용 범위 설정 json 파일
├── tsconfig.json                                                 # typescript 컴파일 옵션이 담긴 json 파일
└── README.md
```

## 실행 명령어

```
로컬에서 작업시 서버 실행
start: npm run start
watch-start : npm run start:dev -> 추천드립니다.


PM2 (실 서버)
시작 명령어
1. dist 폴더가 있으면 제거
2. git pull
3. npm run build를 통해 build 파일 생성
4. npm run start:prod
종료 명령어: pm2 stop main

```
