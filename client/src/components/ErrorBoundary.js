import React from 'react';
import ErrorPage from './ErrorPage'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Render an error page
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary