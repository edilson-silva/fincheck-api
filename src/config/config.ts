export class Config {
  public static PASSWORD_HASH_SALT = parseInt(
    process.env.PASSWORD_HASH_SALT || '12',
  );
}
