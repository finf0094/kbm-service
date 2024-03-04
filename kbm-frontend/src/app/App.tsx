import { FC } from 'react'
import { AppRouter } from './providers/app-router/AppRouter'
import useAuth from '@/shared/lib/useAuth'
import { AuthRouter } from './providers/auth-router/AuthRouter'

const App: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='app'>
      {isAuthenticated ? <AppRouter /> : <AuthRouter />}
    </div>
  )
}

export default App
