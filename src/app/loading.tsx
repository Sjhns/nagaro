import { Spinner } from '@/components/spinner'

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center  relative min-h-screen">
      <Spinner />
    </div>
  )
}
