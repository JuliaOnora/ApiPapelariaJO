import crypto  from "crypto";

interface CryptData{
    hash: string, 
    salt: string
}

export function crypt(pass: string): CryptData{
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');

    return { hash: hash, salt: salt };
}