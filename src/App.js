import React from "react";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import AppFooter from "./Components/AppFooter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex flex-col bg-gray-300">
          <AppHeader />
          <PageContent />
          <AppFooter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
