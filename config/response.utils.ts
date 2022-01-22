export const response = {
  SUCCESS: {
    isSuccess: true,
    code: 1000,
    message: '성공',
  },
  CHECK_JWT_TOKEN: {
    isSuccess: false,
    code: 2000,
    message: 'JWT 토큰을 확인해주세요.',
  },
  USER_ID_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: '아이디가 없습니다.',
  },
  NON_EXIST_EMAIL: {
    isSuccess: false,
    code: 2002,
    message: '이메일을 확인해주세요.',
  },
  NON_MATCH_PASSWORD: {
    isSuccess: false,
    code: 2003,
    message: '비밀번호가 일치하지 않습니다.',
  },
  EMPTY_EMAIL: {
    isSuccess: false,
    code: 2004,
    message: '이메일을 입력해주세요.',
  },
  INVALID_EMAIL: {
    isSuccess: false,
    code: 2005,
    message: '유효하지 않은 이메일 입니다.',
  },
  EMPTY_PASSWORD: {
    isSuccess: false,
    code: 2006,
    message: '비밀번호를 입력해주세요.',
  },
  INVALID_PASSWORD: {
    isSuccess: false,
    code: 2007,
    message: '유효하지 않은 비밀번호 입니다.',
  },
  EMPTY_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2008,
    message: '확인 비밀번호를 입력해주세요.',
  },
  INVALID_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2009,
    message: '유효하지 않은 확인 비밀번호 입니다.',
  },
  NOT_MATCH_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2010,
    message: '확인 비밀번호와 일치하지 않습니다.',
  },
  EMPTY_NICKNAME: {
    isSuccess: false,
    code: 2011,
    message: '닉네임을 입력해주세요.',
  },
};
