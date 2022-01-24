import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import FirstCalculator from "./pages/FirstCalculator";
import MainPage from "./pages/MainPage";
import SecondCalculator from "./pages/SecondCalculator";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/first" element={<FirstCalculator />} />
        <Route path="/second" element={<SecondCalculator />} />
      </Routes>
    </>
  );
}

export default App;
