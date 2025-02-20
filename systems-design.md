## Systems Design Considerations:

1. Key Requirements & Constraints:

- Scale: 2,500 simultaneous users
- Limited WiFi infrastructure (this is critical!)
- Need for precise timing/synchronization
- One-way communication (server → clients) for most operations
- Short duration of actual show (intermission period)
- Simple payload (primarily color/timing data)

2. Let's analyze different architectural approaches:

a) WebSocket Architecture:
Pros:

- Real-time bidirectional communication
- Maintains persistent connection
- Good for frequent updates

Cons:

- Maintains persistent connections (2,500 concurrent connections)
- More server resources required
- More sensitive to poor network conditions
- Overkill for mostly one-way communication

b) Server-Sent Events (SSE):
Pros:

- Lightweight one-way communication
- Better for broadcast scenarios
- Less overhead than WebSockets
- Works well with HTTP/2

Cons:

- Still requires persistent connection
- No built-in reconnection handling

c) HTTP Long Polling:
Pros:

- Works well with unreliable connections
- Simple to implement
- Fallback-friendly

Cons:

- Higher latency
- More HTTP overhead
- Not ideal for precise timing

d) gRPC:
Pros:

- Efficient protocol
- Good for bidirectional streaming
- Binary protocol (less bandwidth)

Cons:

- Overkill for simple color changes
- Requires HTTP/2
- More complex client implementation
- May have browser compatibility issues

Given these constraints, I would actually recommend a different approach altogether:

Recommended Architecture: Time-Synchronized State Machine

1. Initial Load:

- Each phone loads a complete state machine of the show
- Includes all timing/color transitions
- Uses absolute timestamps for synchronization

2. Synchronization:

- Simple HTTP endpoint provides current server time
- Clients perform NTP-style clock synchronization
- Multiple time checks to account for network latency

3. Show Control:

- Manual trigger sends a simple "start" signal
- Backup method: Visual/audio cue for manual sync
- Each client runs independently once synchronized

Benefits of this approach:

1. Minimal network dependency during the show
2. Works even with poor/intermittent WiFi
3. Scales extremely well (no persistent connections)
4. Simple fallback mechanisms
5. Reduced server complexity
6. More resilient to network issues
