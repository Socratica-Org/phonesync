import { ConnectionStatus } from "./Display";

export const StatusIndicator = ({ status }: { status: ConnectionStatus }) => {
  if (status === "in-progress") {
    // We might actually not want to show this at all
    return (
      <div className="flex items-center gap-2 text-white-500 text-sm font-mono">
        <svg
          className="w-2.5 h-2.5 animate-pulse"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" />
        </svg>
        In Progress
      </div>
    );
  }

  if (status === "disconnected") {
    return (
      <div className="flex items-center gap-2 text-red-500 text-sm font-mono">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Disconnected
      </div>
    );
  }

  if (status === "connected") {
    return (
      <div className="flex items-center gap-2 text-emerald-500 text-sm font-mono">
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Connected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm font-mono opacity-65">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      <div>Connecting</div>
    </div>
  );
};
