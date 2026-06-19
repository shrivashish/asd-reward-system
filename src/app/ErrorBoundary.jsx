import { Component } from 'react';

// Global error boundary: catches render/runtime errors anywhere in the tree
// and logs them to the console so failures are visible instead of a blank screen.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[Star Board] Uncaught render error:', error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1>Something went wrong</h1>
          <p>Please reload the app. The error has been logged to the console.</p>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#b00' }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
