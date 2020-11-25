import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/ListPlans";
import ListPlans from "./components/ListPlans";
import AddPlan from "./components/CreatePlan";

function App() {
  return (
    <div className="container">
      <ListPlans />
      <AddPlan />
    </div>
  );
}

export default App;
