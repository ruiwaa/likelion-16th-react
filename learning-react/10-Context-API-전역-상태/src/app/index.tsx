import { ContextAdvanced } from '@/_/learns'
import S from './style.module.css'
import { FamilyProvider } from '@/contexts/FamilyContext/provider'

export default function App() {
  return (
    <FamilyProvider>
   <div className={S.container}>
      <ContextAdvanced />
    </div>
    </FamilyProvider>
  
  )
}
