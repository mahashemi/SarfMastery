import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

class AppErrorBoundary extends React.Component<React.PropsWithChildren, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error) {
    console.error('Sarf Mastery failed to render:', error)
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ maxWidth: 680, margin: '64px auto', padding: '24px', fontFamily: 'system-ui', color: '#25352f' }}>
          <h1 style={{ color: '#17483c' }}>Sarf Mastery could not start</h1>
          <p>The page loaded, but the app encountered an error while rendering. Please share the diagnostic message below so it can be fixed.</p>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', padding: 16, background: '#f4f1e9', borderRadius: 8 }}>{this.state.error.message}</pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 16px', background: '#17483c', color: 'white', border: 0, borderRadius: 6 }}>Reload page</button>
        </main>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>,
)
