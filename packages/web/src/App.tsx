import './App.css';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount((count) => count + 1)}>Count is {count}</Button>
    </div>
  );
}

export default App;
