import localFont from 'next/font/local'

export const pretendardFont = localFont({
  src: [
    { path: '../fonts/msg-pretendard-medium.woff2',  weight: '500' },
    { path: '../fonts/msg-pretendard-semiBold.woff2', weight: '600' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

export const konkonFont = localFont({
  src: '../fonts/msg-konkon.woff2',
  weight: '400',
  variable: '--font-konkon',
  display: 'swap',
})

export const laundryFont = localFont({
  src: [
    { path: '../fonts/msg-laundry-regular.woff', weight: '400' },
    { path: '../fonts/msg-laundry-bold.woff',    weight: '700' },
  ],
  variable: '--font-laundry',
  display: 'swap',
})

export const wishlistFont = localFont({
  src: '../fonts/msg-wishlist.woff2',
  weight: '400',
  variable: '--font-wishlist',
  display: 'swap',
})
