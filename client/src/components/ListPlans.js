import React, { Fragment, useEffect, useState } from "react";
import EditPlan from "./EditPlan";
import ShowPlan from "./ShowPlan";
import PlanItem from "./plan/PlanItem";
import { CardGroup } from "react-bootstrap";

const ListPlans = () => {
  const [plans, setPlans] = useState([]);
  const [count, setCount] = useState(0);

  const getPlans = (search) => {
    const query = search
      ? `http://localhost:8080/plan?country=${search}`
      : "http://localhost:8080/plan";
    fetch(query)
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setPlans(data.plans)
        setCount(data.count)
      });
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div class="container">
      <div>
        <input
          class="form-control mt-5"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => getPlans(e.target.value)}
          style={{ marginBottom: "2rem" }}
        />
      </div>
      <h1>There are currently {count} plans</h1>
      {plans.map((plan) => (
        <PlanItem {...plan} />
      ))}
      <div className="plan"></div>
    </div>
  );
};
export default ListPlans;
