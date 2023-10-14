'use client'
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/user';
import { useRouter } from 'next/router';


export const IsAuth = () => {
    const { isLoggedIn } = useAuthStore();
  return isLoggedIn;
}

export const GetRole = () => {
    const { currentUser } = useAuthStore();
    return currentUser.role;
}

export const GetUserId = () => {
    const { currentUser } = useAuthStore();
    return currentUser.id;
}

export const GetUser = () => {
    const { currentUser } = useAuthStore();
    return currentUser;
}

export const AutoRedirect = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn]);
}