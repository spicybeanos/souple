'use server';
import { createHash, hash } from 'crypto';

function hashString(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}

export async function getWords() {
    const key = process.env.API_GEN_SECRET;
    const hashKey = hashString(key + "")
    console.log(hashKey);
    return "amongus potion at 3 am " + hashKey;
}