'use client'

import { Alfa_Slab_One, Kanit, Baloo_2 } from 'next/font/google';


export const AlfaSlabOne = Alfa_Slab_One({
    preload: false,
    weight: '400',
    variable: '--font-alfa-slab-one',
});

export const KanitFont = Kanit({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    variable: '--font-kanit',
    display: 'swap',
});

export const Baloo2Font = Baloo_2({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800'],
    style: ['normal'],
    variable: '--font-baloo-2',
    display: 'swap',
});