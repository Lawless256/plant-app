import { useEffect, useState } from 'react'
import QuizTab from './components/QuizTab.jsx'
import GardenTab from './components/GardenTab.jsx'
import RemindersTab from './components/RemindersTab.jsx'
import JournalTab from './components/JournalTab.jsx'

const TABS = [
  { id: 'quiz', label: 'Find My Plant', ico: '🌸' },
  { id: 'garden', label: 'My Garden', ico: '🪴' },
  { id: 'reminders', label: 'Water Time', ico: '💧' },
  { id: 'journal', label: 'Plant Diary', ico: '📓' },
]

export default function App() {
  const [tab, setTab] = useState('quiz')

  useEffect(() => {
    document.body.scrollTo?.({ top: 0 })
    window.scrollTo?.({ top: 0 })
  }, [tab])

  return (
    <div className="app">
      {tab === 'quiz' && <QuizTab onGoToGarden={() => setTab('garden')} />}
      {tab === 'garden' && <GardenTab />}
      {tab === 'reminders' && <RemindersTab />}
      {tab === 'journal' && <JournalTab />}

      <nav className="nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
          >
            <span className="ico">{t.ico}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
