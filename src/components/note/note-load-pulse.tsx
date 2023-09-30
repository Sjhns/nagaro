export const NoteLoadPulse = () => {
  return (
    <div className="border-b border-white-transparent p-4 py-5 mx-auto">
      <div className="animate-pulse space-y-3">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-slate-800 h-12 w-12"></div>
          <div className="h-4 w-20 bg-slate-800 rounded"></div>
        </div>

        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-800 rounded col-span-2"></div>
              <div className="h-2 bg-slate-800 rounded col-span-1"></div>
              <div className="h-2 bg-slate-800 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-800 rounded"></div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="bg-slate-800 rounded w-10 h-4"></div>
            <div className="bg-slate-800 rounded w-10 h-4"></div>

            <div className="bg-slate-800 rounded w-10 h-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
