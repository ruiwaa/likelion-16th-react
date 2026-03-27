// import Login from "./pages/Login";
// import MovieDetail from "./pages/MovieDetail";
// import NotFound from "./pages/NotFound";
// import MyPage from "./pages/MyPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import CommonLayout from "./layouts/CommonLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
