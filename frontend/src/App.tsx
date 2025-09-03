import { RouterProvider } from 'react-router';
import { router } from './routes/router';

function App() {
  return (
    <div style={{ background: "#000526ff", minHeight: "100vh", width: "100vw", padding: 0, margin: 0 }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
