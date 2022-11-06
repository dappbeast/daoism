import crypto from "crypto";

const encrypt = (plainText: string, password: string): string => {
  const iv = crypto.randomBytes(16);
  const key = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64")
    .substring(0, 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plainText);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export default encrypt;
