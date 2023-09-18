import { Event, EventTemplate } from 'nostr-tools'

type Nostr = {
  getPublicKey(): Promise<string>
  signEvent(event: EventTemplate): Promise<Event>
}

declare global {
  interface Window {
    nostr: Nostr
  }
}
