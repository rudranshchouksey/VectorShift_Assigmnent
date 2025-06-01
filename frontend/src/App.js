import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)',
      overflow: 'hidden' /* Hide scrollbars */
    }}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;