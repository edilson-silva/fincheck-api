import { compare as bcryptCompare, hash as bcryptHash } from 'bcryptjs';
import { env } from '../config/env';

export class BCryptAdapter {
  static BCRYPT_SALT = env.BCRYPT_SALT;

  static async hash(value: string): Promise<string> {
    return await bcryptHash(value, this.BCRYPT_SALT);
  }

  static async compare(value: string, hashedValue: string): Promise<boolean> {
    return await bcryptCompare(value, hashedValue);
  }
}
