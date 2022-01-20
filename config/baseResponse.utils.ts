export const baseResponse = {
  SUCCESS: { isSuccess: true, code: 1000, message: '성공' },
  USER_ID_EMPTY: {
    isSuccess: false,
    code: 2000,
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
};
