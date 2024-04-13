'use client';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


export default function Page() {
    const router = useRouter()

    useEffect(() => {
        console.log('LOGOUT');
        try {
            localStorage.setItem("NEXT_PUBLIC_MY_USERNAME", '')
            localStorage.setItem("NEXT_PUBLIC_MY_TOKEN", '')
            router.push('/login')
            if (typeof window !== "undefined") {
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }, []);

    return <h1>Success</h1>;
}

