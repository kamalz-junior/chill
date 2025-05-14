import "~/assets/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import UserLayout from "~/layouts/user-layout";
import Checkout from "~/pages/checkout";
import Home from "~/pages/home";
import Movies from "~/pages/movies";
import Payment from "~/pages/payment";
import Profile from "~/pages/profile";
import Series from "~/pages/series";
import SignIn from "~/pages/sign-in";
import SignUp from "~/pages/sign-up";
import Watch from "~/pages/watch";
import Watchlist from "~/pages/watchlist";
import CardSubscibe from "./components/card-subscribe";
import Premium from "./pages/premium";
import WatchMovie from "./pages/watch-movie";
import MovieDetail from "~/pages/movie-detail";
import SeriesDetail from "~/pages/series-detail";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="card-subscribe" element={<CardSubscibe />} />
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
          <Route path="series" element={<Series />} />
          <Route path="series/:seriesId" element={<SeriesDetail />} />
          <Route path="watch" element={<Watch />} />
          <Route path="watch-movie" element={<WatchMovie />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="premium" element={<Premium />} />
          <Route path="checkout/:checkoutId" element={<Checkout />} />
          <Route path="checkout/:checkoutId/pay" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
