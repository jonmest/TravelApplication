import "./App.css";
import "./components/ListPlans";
import ListPlans from "./components/ListPlans";
import EditPlan from "./components/EditPlan";
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
