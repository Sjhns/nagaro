import { Event, EventTemplate } from 'nostr-tools'

type Nostr = {
  getPublicKey(): Promise<string>
  signEvent(event: EventTemplate): Promise<Event>
}

declare global {
  interface Window {
    nostr: Nostr
  }

  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
    }
  }
}
