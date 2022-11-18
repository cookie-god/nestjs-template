import crypto = require('crypto');

export function generateRandomString(length: number) {
  return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
}

export function sha512(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');

  return {
    salt: salt,
    hashedPassword: hashedPassword,
  };
}

export function saltHashPassword(password: string) {
  const salt = generateRandomString(16);
  return sha512(password, salt);
}

export function validatePassword(password: string, salt: string, hashedPassword: string) {
  const passwordData = sha512(password, salt);
  return passwordData.hashedPassword == hashedPassword;
}
