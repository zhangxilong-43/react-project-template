import { createRoot } from 'react-dom/client';
import App from '@/App';

const root = document.querySelector('#root')
root && createRoot(root).render(<App />)
