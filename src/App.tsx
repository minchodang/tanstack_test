import { useMutation } from '@tanstack/react-query';
import { failingMutationApi } from './api/mockApi';

function App() {
  // 케이스 1: onError 없이 사용 - ErrorBoundary에서 캐치되어야 함
  const mutationWithoutOnError = useMutation({
    mutationFn: failingMutationApi,
  });

  // 케이스 2: onError 있지만 에러를 다시 throw - ErrorBoundary에서도 캐치되어야 함
  const mutationWithOnErrorThrow = useMutation({
    mutationFn: failingMutationApi,
    onError: (error) => {
      console.log('onError에서 캐치한 에러:', error);
      // 에러를 다시 throw하여 ErrorBoundary로 전달
      throw error;
    },
  });

  // 케이스 3: onError에서 에러를 처리하고 throw하지 않음 - ErrorBoundary에서 캐치되지 않음
  const mutationWithOnErrorNoThrow = useMutation({
    mutationFn: failingMutationApi,
    throwOnError: false, // 이 mutation은 에러를 throw하지 않음
    onError: (error) => {
      console.log('onError에서 에러 처리 (throw 안함):', error);
      alert('onError에서 에러를 처리했습니다: ' + error.message);
    },
  });

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>TanStack Query + ErrorBoundary 테스트</h1>
      <p>각 버튼을 클릭하여 에러 처리 동작을 확인하세요.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        {/* 케이스 1 */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>케이스 1: onError 없음</h3>
          <p>throwOnError: true이므로 ErrorBoundary에서 캐치되어야 합니다.</p>
          <button
            onClick={() => mutationWithoutOnError.mutate({ message: '케이스 1 테스트' })}
            disabled={mutationWithoutOnError.isPending}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {mutationWithoutOnError.isPending ? '처리 중...' : '에러 발생시키기 (onError 없음)'}
          </button>
        </div>

        {/* 케이스 2 */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>케이스 2: onError 있음 + throw</h3>
          <p>
            onError에서 에러를 로그한 후 다시 throw하므로 ErrorBoundary에서도 캐치되어야 합니다.
          </p>
          <button
            onClick={() => mutationWithOnErrorThrow.mutate({ message: '케이스 2 테스트' })}
            disabled={mutationWithOnErrorThrow.isPending}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {mutationWithOnErrorThrow.isPending
              ? '처리 중...'
              : '에러 발생시키기 (onError + throw)'}
          </button>
        </div>

        {/* 케이스 3 */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>케이스 3: onError 있음 + throw 안함</h3>
          <p>
            onError에서 에러를 처리하고 throw하지 않으므로 ErrorBoundary에서 캐치되지 않습니다.
            <br />
            (throwOnError: true여도 onError가 있으면 해당 핸들러에서 처리 가능)
          </p>
          <button
            onClick={() => mutationWithOnErrorNoThrow.mutate({ message: '케이스 3 테스트' })}
            disabled={mutationWithOnErrorNoThrow.isPending}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {mutationWithOnErrorNoThrow.isPending ? '처리 중...' : '에러 발생시키기 (onError만)'}
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3>💡 예상 동작</h3>
        <ul>
          <li>
            <strong>케이스 1</strong>: ErrorBoundary fallback UI가 표시됨
          </li>
          <li>
            <strong>케이스 2</strong>: 콘솔에 onError에서 캐치한 에러 출력 후 ErrorBoundary fallback
            UI가 표시됨
          </li>
          <li>
            <strong>케이스 3</strong>: alert만 표시되고 ErrorBoundary는 동작하지 않음
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
