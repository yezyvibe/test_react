import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import FirstCalculatorPage from "./pages/FirstCalculatorPage";
import MainPage from "./pages/MainPage";
import SecondCalculatorPage from "./pages/SecondCalculatorPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/first" element={<FirstCalculatorPage />} />
        <Route path="/second" element={<SecondCalculatorPage />} />
      </Routes>
    </>
  );
}

export default App;
