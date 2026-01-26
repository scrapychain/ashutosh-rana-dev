import Card from './Card'
import ProgressBar from './ProgressBar'
import { skills } from '@/data/siteData'

export default function SkillsMatrix() {
  return (
    <div className="grid gap-6">
      {skills.map((s) => (
        <Card key={s.name} className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-lg tracking-widest text-emerald-200">{s.name}</div>
            <div className="text-sm tracking-widest text-emerald-200/80">{s.value}%</div>
          </div>
          <ProgressBar value={s.value} />
        </Card>
      ))}
    </div>
  )
}
