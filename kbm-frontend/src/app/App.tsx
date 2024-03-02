import { FC } from 'react'
import { AppRouter } from './providers/app-router'
import useAuth from '@/shared/lib/useAuth'
import { AuthRouter } from './providers/auth-router'

const App: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='app'>
      {isAuthenticated ? <AppRouter /> : <AuthRouter />}
    </div>
  )
}

export default App
