import * as bcrypt from 'bcrypt';

export const hashing = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const matching = async (password: string, hashed: string) => {
  const isMatch = await bcrypt.compare(password, hashed);
  return isMatch;
};
