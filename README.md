# Kill Switch

A private, self-destructing chat application built with Next.js and real-time messaging capabilities. Create secure chat rooms that automatically expire after 10 minutes, ensuring your conversations are temporary and private.

## Features

- 🔒 **Self-Destructing Rooms**: Chat rooms automatically expire after 10 minutes
- ⚡ **Real-Time Messaging**: Instant message delivery using Upstash Realtime
- 👥 **Private Rooms**: Maximum 2 users per room for intimate conversations
- 🎭 **Anonymous Identity**: Auto-generated anonymous usernames
- 💣 **Manual Destruction**: Destroy rooms instantly with a single click
- 🕐 **Live Countdown**: Real-time countdown timer showing room expiration
- 🍪 **Token-Based Auth**: Secure cookie-based authentication per room


## Installation

1. Clone the repository:
```bash
git clone https://github.com/punyakrit/kill-switch
cd kill-switch
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables (see above)

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

### Room Creation
1. Users visit the home page and are assigned an anonymous username (stored in localStorage)
2. Clicking "CREATE SECURE ROOM" generates a unique 8-character room ID
3. Room metadata is stored in Redis with a 10-minute TTL
4. User is redirected to `/room/[roomId]`

### Room Access
1. The `proxy.ts` middleware intercepts room access requests
2. Validates room existence and capacity (max 2 users)
3. Issues a unique authentication token stored in an HTTP-only cookie
4. Token is added to the room's connected users list

### Messaging
1. Messages are sent via POST to `/api/messages`
2. Messages are stored in Redis lists with room-scoped keys
3. Realtime events are emitted to all connected users
4. Messages automatically expire with the room TTL

### Room Destruction
- **Automatic**: Rooms expire after 10 minutes (600 seconds)
- **Manual**: Users can click "DESTROY NOW" to instantly delete the room
- On destruction, all messages and metadata are permanently deleted from Redis
- All connected users are notified via realtime events
