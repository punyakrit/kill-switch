import { redis } from '@/lib/redis'
import { auth } from './auth'
import { Elysia, t } from 'elysia'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const ROOM_TTL_SECONDS = 60 * 10

const rooms = new Elysia({ prefix: '/room' })
    .post("/create", async () => {
        const roomId = nanoid(8)

        await redis.hset(`meta:${roomId}`, {
            connected: [],
            createdAt: Date.now()
        })

        await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS)

        return { roomId }
    })

const messages = new Elysia({ prefix: '/messages' })
    .use(auth)
    .post("/", async ({ body, auth }) => {
        const { sender, text } = body
        const { roomId } = auth
        const roomExists = await redis.exists(`meta:${roomId}`)
        if(!roomExists){
            throw new Error("Room not found")
        }

        const message = await redis.lpush(`messages:${roomId}`, JSON.stringify({ sender, text }))
        return { message }

    },{
        query: z.object({
            roomId: z.string().min(8).max(8),
        }),
        body: z.object({
            sender: z.string().max(100),
            text: z.string().max(1000),
        })
    })

const app = new Elysia({ prefix: '/api' })
    .use(rooms)
    .use(messages)

export type app = typeof app


export const GET = app.fetch
export const POST = app.fetch 