import {
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainRoutes } from "./routes/MainRoutes.jsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={MainRoutes} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
