'use client';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { getWords, checkStep, checkGame } from '@/lib/soup'
import { use, useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_CHARS } from 'input-otp';
import { CodeSquareIcon, HelpCircle } from 'lucide-react';

const COOKIE_NAME = 'souple-state';

export default function Home() {
  const [challenge, setChallenge] = useState(null as null | { start: string; end: string });
  const [words, setWords] = useState([] as string[]);
  const [guess, setGuess] = useState("");
  const [verdict, setVerdict] = useState(null as null | { result: boolean, reason: string });

  useEffect(() => {
    getWords().then((s) => {
      setChallenge(s)
    })
  }, []);

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));

    if (!cookie) return;

    try {
      const parsed = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      if (Array.isArray(parsed.words)) {
        setWords(parsed.words);
      }
      if (typeof parsed.guess === 'string') {
        setGuess(parsed.guess);
      }
    } catch {
      // Ignore malformed cookie data.
    }
  }, []);
  const [win, setWin] = useState(false);
  useEffect(() => {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify({ words, guess }))}; path=/; max-age=${60 * 60}`;
  }, [words, guess]);

  useEffect(() => {
    checkGame(words).then(
      r => { setWin(r); console.log("You win! 🥳🥳🥳") }
    )
  }, [words])

  async function checkWord() {
    if (challenge == null) {
      return;
    }
    // const game = await checkGame(words);
    // if (game) {
    //   console.log("you win!")
    // }
    const verd = await checkStep(words.length > 0 ? words[words.length - 1] : challenge?.start, guess);
    if (verd.result) {
      setWords([...words, guess]);
      console.log('guess accepted')
      setGuess("")
      setVerdict(verd)
    } else {
      console.log('not accepted:' + verd.reason)
      setVerdict(verd);
    }

  }
  

  function copyWords() {
    let str = "";
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      str = str + build(w) + '\n';
    }
    
    navigator.clipboard.writeText(str);
  }
  function build(word: string) {
    let s = "";
    for (let i = 0; i < word.length; i++) {
      if (word[i] != challenge?.end[i]){
        s = s + "⬛"
      }else{
        s = s + '🟩';
      }
    }

    return s;
  }

  return (
    <div className='flex flex-col h-[100vh] justify-center items-center'>
      <p className='text-5xl m-5'>🍲SOUPLE🍜</p>
      <div className='flex flex-row mb-3 gap-9'>
        <a href='/help'><HelpCircle /></a>
        <a href='https://github.com/spicybeanos/souple'><CodeSquareIcon /></a>
      </div>
      <Card className='flex flex-col justify-center items-center mb-2'>
        {
          verdict?.result == false && win &&
          <span>{verdict.reason}</span>
        }
        {
          win &&
          <span className='text-3xl text-green-500'>🥳🥳 You win! 🥳🥳</span>
        }
        <div className='flex flex-row gap-3 px-5'>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.start[0].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.start[1].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.start[2].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.start[3].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.start[4].toUpperCase()}</span></div>
        </div>

        <div className='flex flex-col justify-center items-center gap-1 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {
            words.map((w, i) =>
              <div className='flex flex-row gap-3 px-5' key={i}>
                <div className={`size-12 bg-${w[0] == challenge?.end[0] ? "green-400" : "gray-100"} flex flex-row justify-center items-center rounded-md`}><span className='text-xl'>{w[0].toUpperCase()}</span></div>
                <div className={`size-12 bg-${w[1] == challenge?.end[1] ? "green-400" : "gray-100"} flex flex-row justify-center items-center rounded-md`}><span className='text-xl'>{w[1].toUpperCase()}</span></div>
                <div className={`size-12 bg-${w[2] == challenge?.end[2] ? "green-400" : "gray-100"} flex flex-row justify-center items-center rounded-md`}><span className='text-xl'>{w[2].toUpperCase()}</span></div>
                <div className={`size-12 bg-${w[3] == challenge?.end[3] ? "green-400" : "gray-100"} flex flex-row justify-center items-center rounded-md`}><span className='text-xl'>{w[3].toUpperCase()}</span></div>
                <div className={`size-12 bg-${w[4] == challenge?.end[4] ? "green-400" : "gray-100"} flex flex-row justify-center items-center rounded-md`}><span className='text-xl'>{w[4].toUpperCase()}</span></div>
              </div>
            )
          }
        </div>

        {
          !win &&
          <InputOTP maxLength={5} pattern={REGEXP_ONLY_CHARS} onChange={(v) => setGuess(v)} value={guess}>
            <InputOTPGroup className='gap-5'>
              {
                verdict?.result == true || words.length < 1 ?
                  <><InputOTPSlot index={0} className='text-2xl' />
                    <InputOTPSlot index={1} className='text-2xl' />
                    <InputOTPSlot index={2} className='text-2xl' />
                    <InputOTPSlot index={3} className='text-2xl' />
                    <InputOTPSlot index={4} className='text-2xl' /></> :

                  <><InputOTPSlot index={0} className='text-2xl' aria-invalid />
                    <InputOTPSlot index={1} className='text-2xl' aria-invalid />
                    <InputOTPSlot index={2} className='text-2xl' aria-invalid />
                    <InputOTPSlot index={3} className='text-2xl' aria-invalid />
                    <InputOTPSlot index={4} className='text-2xl' aria-invalid /></>
              }
            </InputOTPGroup>
          </InputOTP>
        }


        <div className='flex flex-row gap-3 px-5'>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.end[0].toUpperCase()}</span></div>
          <div className='size-12 shadow-lg border-1  flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.end[1].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.end[2].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.end[3].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{challenge?.end[4].toUpperCase()}</span></div>
        </div>
        <CardFooter className='flex flex-row gap-3'>
          {
            !win &&
            <Button onClick={() => checkWord()}>
              Check
            </Button>
          }
          {
            win &&
            <Button onClick={() => copyWords()}>
              Copy
            </Button>
          }

        </CardFooter>
      </Card>

    </div>
  );
}
