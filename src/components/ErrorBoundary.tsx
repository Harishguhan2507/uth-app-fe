import { Component, type ReactNode } from "react";
import { Card } from "@/components/ui/primitives";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // no-op for mock app
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6"><Card className="p-4">Something went wrong.</Card></div>;
    }
    return this.props.children;
  }
}
