import { Filter } from '@/components/Filter'
import { Summary } from '@/components/Summary'
import { DataTable } from '@/components/Table'

export default function Home() {
  return (
    <main className="flex justify-between relative p-24 min-h-full rounded-t-3xl bg-white text-zinc-900">
      <div className="flex flex-col gap-5">
        <Filter />
        <DataTable />
      </div>
      <div>
        <Summary />
      </div>
    </main>
  )
}
