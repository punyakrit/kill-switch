import { Realtime, InferRealtimeEvents } from "@upstash/realtime"
import { redis } from "./redis"
import { z } from "zod"

const messageSchema = z.object({
    id: z.string(),
    sender: z.string().max(100),
    text: z.string().max(1000),
    timestamp: z.number(),
    roomId: z.string().min(8).max(8),
    token: z.string().optional(),
})

const destroySchema = z.object({
    isDestroyed: z.literal(true),
})

const schema = {
  chat: {
    message: messageSchema,
    destroy: destroySchema,
  },
}

export const realtime = new Realtime({ schema, redis })
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>

export type Message = z.infer<typeof messageSchema>
export type Destroy = z.infer<typeof destroySchema>