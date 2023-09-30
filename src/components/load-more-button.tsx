type Props = {
  //   showLoadMoreButton: boolean
  setShowLoadMoreButton: (value: boolean) => void
}

export const LoadMoreButton = () => {
  return (
    <div className="fixed bottom-16 md:bottom-8 justify-center items-center z-10 flex w-full md:w-1/2 pb-safe-area">
      <button
        className="p-2 text-xs rounded-full opacity-90 hover:opacity-100 hover:bg-iris-blue bg-iris-blue text-white font-semibold"
        style={{ transition: 'opacity 0.3s ease' }}
      >
        Carregar mais eventos
      </button>
    </div>
  )
}
