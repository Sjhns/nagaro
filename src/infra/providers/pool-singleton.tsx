import { SimplePool } from 'nostr-tools'

export class NostrSingleton {
  private pool: SimplePool
  private static instance: any

  private constructor() {
    this.pool = new SimplePool()
  }

  static getInstance(): NostrSingleton {
    if (!NostrSingleton.instance) {
      NostrSingleton.instance = new NostrSingleton()
    }
    return NostrSingleton.instance
  }

  getClient(): SimplePool {
    return this.pool
  }
}
