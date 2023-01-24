import Home from "./pages/Home";
import { ContextProvider } from "./Context";

export default function App() {
  return (
    <ContextProvider>
      <div className="App">
        <header className="p-10 bg-purple-700 text-white">
          <h1>React-Table-Server-Side</h1>
          <p>
            A react-table with server-side pagination, sorting and filtering
          </p>
        </header>
        <Home />
      </div>
    </ContextProvider>
  );
}
