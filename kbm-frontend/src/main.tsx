import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './app/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store/index.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { ModalProvider } from '@/app/providers/modal-provider'
import { PrimeReactProvider } from 'primereact/api'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PrimeReactProvider>
          <ToastContainer />
          <ModalProvider />

          <App />
        </PrimeReactProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
