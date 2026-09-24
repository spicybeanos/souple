'use server';
import { createHash } from 'crypto';
import { fiveLetterWords } from '@/lib/words';

const wordSet = new Set(fiveLetterWords);

function sha1(input: string): string {
    return createHash('sha1').update(input).digest('hex');
}
function sha256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}
function sha1ToSafeNumber(sha1Hex: string): number {
    const substring = sha1Hex.substring(0, 13);
    return parseInt(substring, 16);
}

export async function getWords() {
    const secret = process.env.API_GEN_SECRET;
    const today: Date = new Date();

    const date: string = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(today);

    let words = createWordPair(secret + "", date);
    let ctr = 1;
    let possible = canTransform(words.start, words.end);
    while (!possible) {
        words = createWordPair(secret + "-" + ctr, date);
        possible = canTransform(words.start, words.end);
        ctr++;
    }

    return { start: words.start, end: words.end };
}

export async function checkStep(prevWord: string, nextWord: string): Promise<{ result: boolean, reason: string }> {
    const normalizedPrev = prevWord.toLowerCase();
    const normalizedNext = nextWord.toLowerCase();

    if (normalizedPrev.length !== 5 || normalizedNext.length !== 5) {
        return { result: false, reason: 'Words must be 5 letters long.' };
    }

    let dif = 0;
    for (let i = 0; i < 5; i++) {
        if (!/^[a-z]$/.test(normalizedPrev[i]) || !/^[a-z]$/.test(normalizedNext[i])) {
            return { result: false, reason: 'Words must contain only letters.' };
        }

        if (normalizedPrev[i] !== normalizedNext[i]) dif++;
    }

    if (dif !== 1) {
        return { result: false, reason: 'Only one letter can change at a time.' };
    }
    if (!wordSet.has(normalizedPrev)) {
        return { result: false, reason: 'Starting word is not in the dictionary.' };
    }
    if (!wordSet.has(normalizedNext)) {
        return { result: false, reason: 'Next word is not in the dictionary.' };
    }

    return { result: true, reason: 'Valid step.' };
}

function canTransform(start: string, end: string): boolean {
    if (!wordSet.has(start) || !wordSet.has(end)) return false;
    if (start === end) return true;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const queue: string[] = [start];
    const visited = new Set<string>([start]);

    while (queue.length > 0) {
        const current = queue.shift()!;

        for (let i = 0; i < current.length; i++) {
            for (const c of alphabet) {
                if (c === current[i]) continue;

                const candidate = current.slice(0, i) + c + current.slice(i + 1);

                if (candidate === end) return true;

                if (wordSet.has(candidate) && !visited.has(candidate)) {
                    visited.add(candidate);
                    queue.push(candidate);
                }
            }
        }
    }

    return false;
}

function createWordPair(secret: string, date: string): { start: string, startIndex: number, end: string, endIndex: number } {
    const fromWordInd = sha1ToSafeNumber(sha1(sha256(secret + date + "this is the starting word"))) % fiveLetterWords.length;
    const toWordInd = sha1ToSafeNumber(sha1(sha256(date + "this is the ending word" + secret))) % fiveLetterWords.length;

    return { start: fiveLetterWords[fromWordInd], startIndex: fromWordInd, endIndex: toWordInd, end: fiveLetterWords[toWordInd] };
}

