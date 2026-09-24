'use client';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
                <CardDescription className='px-5'>
                    <a href='/'>Go back</a>
                </CardDescription>
            </Card>
        </div>

    )
}