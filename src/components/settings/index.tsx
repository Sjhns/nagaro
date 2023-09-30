'use client'

import { useState } from 'react'
import { Account } from './account'
import { Appearance } from './appearance'
import { Relays } from './relays'
import { Languages } from './languages'
import { Options } from './options'

export const Setting = () => {
  const [active, setActive] = useState<
    'account' | 'appearance' | 'relays' | 'languages'
  >('account')

  return (
    <div className="flex h-screen w-full">
      <Options setActive={setActive} />

      {
        {
          account: <Account />,
          appearance: <Appearance />,
          relays: <Relays />,
          languages: <Languages />,
        }[active]
      }
    </div>
  )
}
