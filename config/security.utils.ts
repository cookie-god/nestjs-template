import crypto = require('crypto');

// salt 값 생성
export function generateRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// 단방향 암호화 설정해서 salt값과 암호화된 비밀번호 리턴
export function sha512(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return {
    salt: salt,
    hashedPassword: hashedPassword,
  };
}

// 단방향 암호화 함수로 전달
export function saltHashPassword(password: string) {
  const salt = generateRandomString(16);
  return sha512(password, salt);
}

// 비밀번호 검증함수
export function validatePassword(
  password: string,
  salt: string,
  hashedPassword: string,
) {
  const passwordData = sha512(password, salt);
  return passwordData.hashedPassword == hashedPassword;
}
