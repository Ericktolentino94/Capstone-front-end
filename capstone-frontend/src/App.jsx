import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import {
  LightTheme,
  BaseProvider,
  styled,
  DarkTheme,
  ThemeProvider,
} from "baseui";
import { StatefulInput } from "baseui/input";
import GamesSchedule from "./Pages/GamesSchedule.jsx";
const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

import "./App.scss";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import NavBar from "./Components/NavBar";
import SignUp from "./Pages/SignUp.jsx";
import Home from "./Pages/Home.jsx";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import MyChartPage from "./Pages/MyChartPage.jsx";
import InterpolationLineChart from "./Pages/InterpolationLineChart.jsx";
import PlayerExamplePage from "./Pages/PlayerExamplePage.jsx";
import TeamStandings from "./Pages/TeamStandings.jsx";
import TeamStandingsV2 from "./Pages/TeamStandingsV2.jsx";
import PlayerStats from "./Components/PlayerStatsE.jsx";
import Predict from "./Pages/Predict.jsx";

import PlayerStatsTableVariation from "./Pages/PlayerStatsTableVariation.jsx"

import SearchPage from "./Pages/SearchPage.jsx";


import FourOFour from "./Pages/FourOFour";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [currentUserPlaces, setCurrentUserPlaces] = useState(null);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        {/* <Centered> */}

        <div className="App">
          <header className="App-header"></header>
          <UserProvider>
            <Router>
              <div>
                <NavBar
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  photoURL={photoURL}
                  setPhotoURL={setPhotoURL}
                />
              </div>

              <Routes>
                {/* public route login */}
                <Route
                  path="/"
                  element={
                    <Home
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      currentUserPlaces={currentUser}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                <Route
                  path="/login"
                  element={
                    <PublicRoute
                      element={LoginPage}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      currentUserPlaces={currentUser}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/loggedInPage"
                  element={
                    <ProtectedRoute
                      element={LoggedInPage}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      currentUserPlaces={currentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/maps"
                  element={
                    <MemoGoogleMap
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      currentUserPlaces={currentUser}
                      Places
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/chart"
                  element={
                    <MyChartPage
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/chartLine"
                  element={
                    <InterpolationLineChart
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/conley_example"
                  element={
                    <PlayerStats
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route
                  path="/player/:playerid"
                  element={
                    <PlayerExamplePage
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route
                  path="/Search"
                  element={
                    <SearchPage

                    />
                  }
                />

                <Route
                  path="/teamstandingsV2"
                  element={
                    <TeamStandingsV2
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/teamstandings"
                  element={
                    <TeamStandings
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/GamesSchedule"
                  element={
                    <GamesSchedule
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/player_stats_table"
                  element={
                    <PlayerStatsTableVariation
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/predict"
                  element={
                    <Predict
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <SignUp
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                    />
                  }
                />

                {/* public route - page not found */}
                <Route
                  path="*"
                  element={
                    <FourOFour
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
              </Routes>
            </Router>
          </UserProvider>
        </div>
        {/* </Centered> */}
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
