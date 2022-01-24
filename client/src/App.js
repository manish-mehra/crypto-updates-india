import PriceTracker from "./components/PriceTracker"
import NewsHeadlines from "./components/NewsHeadlines"
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <PriceTracker/>
      <NewsHeadlines/>
    </div>
  );
}

export default App;
