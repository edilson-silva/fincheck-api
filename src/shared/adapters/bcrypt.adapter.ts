import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';

export class BCryptAdapter {
  static BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT) || 10;

  static async hash(value: string): Promise<string> {
    return await bcryptHash(value, this.BCRYPT_SALT);
  }

  static async compare(value: string, hashedValue: string): Promise<boolean> {
    return await bcryptCompare(value, hashedValue);
  }
}
