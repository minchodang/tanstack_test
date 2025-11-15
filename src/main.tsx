import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError: true,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div style={{ padding: '20px' }}>
          <h1>에러가 발생했습니다!</h1>
          <p>ErrorBoundary에서 에러를 캐치했습니다.</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      }
      onError={(error) => {
        console.log('ErrorBoundary에서 캐치한 에러:', error);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
