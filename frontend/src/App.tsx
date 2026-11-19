import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./page/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}

export default App
