import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Button } from '../components/ui/button.tsx'
function Failure({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section className="status error" role="alert">
      <p>{error instanceof Error ? error.message : 'Something went wrong.'}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </section>
  )
}
export function QueryBoundary({
  children,
  resetKey,
}: {
  children: React.ReactNode
  resetKey?: string | number
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={Failure} onReset={reset} resetKeys={[resetKey]}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
