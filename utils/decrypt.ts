import crypto from "crypto";

const decrypt = (encryptedText: string, password: string) => {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift() ?? "", "hex");

  const encryptedData = Buffer.from(textParts.join(":"), "hex");
  const key = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64")
    .substring(0, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  const decrypted = decipher.update(encryptedData);
  const decryptedText = Buffer.concat([decrypted, decipher.final()]);
  return decryptedText.toString();
};

export default decrypt;
