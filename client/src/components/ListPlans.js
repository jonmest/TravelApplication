import { json } from "body-parser";
import React, { Fragment, useEffect, useState } from "react";
import EditPlan from "./EditPlan";
import ShowPlan from "./ShowPlan";
const ListPlans = () => {
  const [plans, setPlans] = useState([]);
  const [experience, setExperience] = useState([]);

  const getPlans = async () => {
    const response = await fetch("http://localhost:8080/plan");
    const jsonData = await response.json();
    console.log(jsonData[0].experiences[0].description);
    setPlans(jsonData);
  };

  const getPlansBySearch = async (search) => {
    const response = await fetch(
      `http://localhost:8080/plan?country=${search}`
    );
    const jsonData = await response.json();
    setPlans(jsonData);
  };

  const getExperiences = async (search) => {
    const response = await fetch(`http://localhost:8080/experience${search}`);
    const jsonData = await response.json();
    setExperience(jsonData);
  };

  const deletePlan = async (id) => {
    const deletePlan = await fetch(`http://localhost:8080/plan/${id}`, {
      method: "DELETE",
    });
    window.location.href = "/";
  };

  useEffect(() => {
    getPlans();
    getExperiences();
  }, []);
  return (
    <div class="container">
      <div>
        <input
          class="form-control mt-5"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => getPlansBySearch(e.target.value)}
        />
      </div>
      <div className="plan"></div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>ID (DEV)</th>
            <th>Title</th>
            <th>Description</th>
            <th>Country</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Expand</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.id}</td>
              <td>{plan.title}</td>
              <td>{plan.description}</td>
              <td>{plan.country}</td>
              <td>{plan.start_date}</td>
              <td>{plan.end_date}</td>
              {console.log({ plan })}
              <td>
                <EditPlan plan={plan}></EditPlan>
              </td>
              <td>
                <button
                  className="brn btn-danger"
                  onClick={() => deletePlan(plan.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                {" "}
                <ShowPlan props={plan}></ShowPlan>
              </td>
            </tr>
          ))}
        </tbody>

        <h1>EXPERIENCES NO IDEA</h1>
        <tbody>
          <tr>
            <th>ID (DEV)</th>
            <th>Title</th>
            <th>Description</th>
            <th>Tied to plan</th>
          </tr>
          {experience.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.id}</td>
              <td>{exp.title}</td>
              <td>{exp.description}</td>
              <td>{exp.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListPlans;
