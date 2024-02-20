import bcrypt from 'bcryptjs';

function generateSalt() {
    const salt = bcrypt.genSaltSync();
    return salt;
}

export function passwordHash(password) {
    const salt = generateSalt();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { salt, hashedPassword };
}

export function loginHash(salt, password) {
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
}
