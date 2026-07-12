import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/fonts.css';
import './overlay-base.css'
import './themes/default.css'
import TimerOverlay from './components/overlay/TimerOverlay'

ReactDOM.createRoot(document.getElementById('root')!).render(<TimerOverlay />)
