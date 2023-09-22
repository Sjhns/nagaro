'use client'

import { useState } from 'react'

import { Publication } from './publication'
import { Tabs } from './tabs'
import { PublicationsAndAnswers } from './publications-and-answers'
import { Likes } from './likes'

type TabbedContentSwitcherProps = {
  totalPublications: number
  events: any[]
}

export const TabbedContentSwitcher = ({
  totalPublications,
  events,
}: TabbedContentSwitcherProps) => {
  const [activeTab, setActiveTab] = useState('publicacoes')

  const handleTabClick = (
    tabName: 'publicacoes' | 'publicacoes-respostas' | 'gostei',
  ) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Tabs
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        totalPublications={totalPublications}
      />

      {activeTab === 'publicacoes' && <Publication events={events} />}
      {activeTab === 'publicacoes-respostas' && (
        <PublicationsAndAnswers events={[]} />
      )}
      {activeTab === 'gostei' && <Likes events={[]} />}
    </>
  )
}
