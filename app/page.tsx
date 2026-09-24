'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getWords, checkStep } from '@/lib/soup'
import { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


export default function Home() {
  const [words, setWords] = useState(null as null | { start: string; end: string });
  useEffect(() => {
    getWords().then((s) => {
      setWords(s)
    })
  }, []);

  return (
    <div className='flex flex-col h-[100vh] justify-center items-center'>
      <p className='text-5xl m-5'>🍲SOUPLE🍜</p>
      <Card className='flex flex-col justify-center items-center mb-2'>
        <span>Start</span>
        <div className='flex flex-row gap-3 px-5'>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.start[0].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.start[1].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.start[2].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.start[3].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.start[4].toUpperCase()}</span></div>
        </div>

        <InputOTP maxLength={5} >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>

        <div className='flex flex-row gap-3 px-5'>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.end[0].toUpperCase()}</span></div>
          <div className='size-12 shadow-lg border-1  flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.end[1].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.end[2].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.end[3].toUpperCase()}</span></div>
          <div className='size-12 border-1 shadow-lg flex flex-row justify-center items-center rounded-md'><span className='text-xl'>{words?.end[4].toUpperCase()}</span></div>
        </div>
        <span>End</span>
      </Card>
      <Button>
        Check
      </Button>
    </div>
  );
}
