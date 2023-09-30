'use client'

import { useState } from 'react'

import { Publication } from './publication'
import { Tabs } from './tabs'
import { PublicationsAndAnswers } from './publications-and-answers'
import { Likes } from './likes'
import { Notes } from '@/types/notes'

type TabbedContentSwitcherProps = {
  notes: Notes[]
}

export const TabbedContentSwitcher = ({
  notes,
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
        totalPublications={notes.length ?? 0}
      />

      {activeTab === 'publicacoes' && <Publication notes={notes} />}
      {activeTab === 'publicacoes-respostas' && (
        <PublicationsAndAnswers notes={[]} />
      )}
      {activeTab === 'gostei' && <Likes notes={[]} />}
    </>
  )
}
