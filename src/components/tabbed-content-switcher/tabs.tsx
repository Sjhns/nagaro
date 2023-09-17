type TabsProps = {
  activeTab: string
  handleTabClick: (
    tabName: 'publicacoes' | 'publicacoes-respostas' | 'gostei',
  ) => void
  totalPublications: number
}

export const Tabs = ({
  activeTab,
  handleTabClick,
  totalPublications,
}: TabsProps) => {
  return (
    <div className="mt-9 flex items-center justify-between space-x-10 px-4 py-2">
      <div
        className={`flex items-center  space-x-3 cursor-pointer pb-2 ${
          activeTab === 'publicacoes' ? 'border-b-2 border-blue-300' : ''
        }`}
        onClick={() => handleTabClick('publicacoes')}
      >
        <span className="text-gray-200 text-sm font-semibold text-center">
          Publicações
        </span>
        <span className="text-gray-500 text-sm font-semibold">
          {totalPublications}
        </span>
      </div>

      <div
        className={`flex items-center    space-x-3 cursor-pointer pb-2 ${
          activeTab === 'publicacoes-respostas'
            ? 'border-b-2 border-blue-300'
            : ''
        }`}
        onClick={() => handleTabClick('publicacoes-respostas')}
      >
        <span className="text-gray-200 text-sm font-semibold text-center">
          Publicações e respostas
        </span>
        <span className="text-gray-500 text-sm font-semibold">0</span>
      </div>

      <div
        className={`flex items-center    space-x-3 cursor-pointer pb-2 ${
          activeTab === 'gostei' ? 'border-b-2 border-blue-300' : ''
        }`}
        onClick={() => handleTabClick('gostei')}
      >
        <span className="text-gray-200 text-sm font-semibold text-center">
          Gostei
        </span>
        <span className="text-gray-500 text-sm font-semibold">0</span>
      </div>
    </div>
  )
}
