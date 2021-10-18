// Encryption function
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.secret;
const encrypt = (password) =>{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(secret),iv);
    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    return {iv: iv.toString("hex"), password: encryptedPassword.toString("hex")};
}

const decrypt = (encryption) =>{

    const decipher = crypto.createDecipheriv("aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv, "hex"));
    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, "hex")), decipher.final()]);
    return decryptedPassword.toString();
    // return 'const decrypt()'

}

module.exports = {encrypt,decrypt};