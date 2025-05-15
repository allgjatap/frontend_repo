import React, { Component, ErrorInfo } from 'react';
import { Button } from '@nextui-org/react';

interface Props {
  onReset: () => void;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex w-[500px] flex-col items-center gap-5'>
            <p className='text-3xl font-bold'>Something went wrong.</p>
            <p>
              We apologize, but it seems that something went wrong. Our team is
              working to resolve the issue. Please try again later. Thank you
              for your understanding.
            </p>
            <Button color='primary' onClick={this.props.onReset}>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
