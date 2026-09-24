'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWords, checkStep } from '@/lib/soup'
import { useEffect, useState } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_CHARS } from 'input-otp';


export default function HelpPage() {
    return (
        <div className='flex flex-col h-[100vh] justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>How do i play?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='flex flex-col gap-3'>
                        <li>The main challenge is to go from the start word (the one on top) to the end/goal word (the word on the bottom)</li>
                        <li>You can change exactly one letter at a time from the word before to slowly transform your word to the goal word</li>
                        <li>Each one of these new words that you write, need to be real valid words.</li>
                        <li>It is possible to repeat a word as long as you do not do it immediately afterwords</li>
                    </ul>
                    <p className='font-bold'>Words change everyday automatically according to IST, Bon apetite :)</p>
                </CardContent>

                <CardDescription className='px-5'>
                    <a href='/'>Go back</a>
                </CardDescription>
            </Card>
        </div>

    )
}