import { createHmac } from 'crypto';
const hashSecret = process.env.HASH_SECRET || ''

export function genHash(data: any) {
    const hmac = createHmac('sha256', hashSecret);
    hmac.update(data + Math.floor(Math.random() * 10000));
    return hmac.digest('hex')
}