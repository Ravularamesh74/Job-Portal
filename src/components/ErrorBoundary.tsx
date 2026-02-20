import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleRefresh = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-lg">
                        <AlertCircle size={40} />
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-display text-2xl font-800 text-foreground">Something went wrong</h2>
                        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                            We encountered an unexpected error while rendering this page.
                            Don't worry, your progress is safe. Please try refreshing to continue.
                        </p>
                    </div>

                    <button
                        onClick={this.handleRefresh}
                        className="btn-cta flex items-center gap-2 px-6"
                    >
                        <RefreshCcw size={18} />
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
