import * as bcrypt from 'bcrypt';

// 비밀번호 암호화 및 소금값 생성
export async function saltHashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt)
  return {
    salt: salt,
    hashedPassword: hashedPassword
  };
}

// 비밀번호 검증함수
export async function validatePassword(
  password: string,
  hashedPassword: string,
) {
  return bcrypt.compare(password, hashedPassword);
}
