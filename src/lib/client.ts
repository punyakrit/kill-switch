import { treaty } from '@elysiajs/eden'
import type { app } from '../app/api/[[...slugs]]/route'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'
}

export const client = treaty<app>(getBaseUrl()).api

