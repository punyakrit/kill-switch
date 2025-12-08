import { Elysia, t } from 'elysia'

const rooms = new Elysia({ prefix: '/room' })
    .post("/", () => {
        console.log("Room created")
        {msg:"hello"}
    })

const app = new Elysia({ prefix: '/api' })
    .use(rooms)

export type app = typeof app


export const GET = app.fetch
export const POST = app.fetch 