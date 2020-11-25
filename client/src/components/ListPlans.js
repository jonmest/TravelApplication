import React, { Fragment, useEffect, useState } from "react"
import EditPlan from "./EditPlan"
import ShowPlan from "./ShowPlan"
import PlanItem from './plan/PlanItem'
import { CardGroup } from 'react-bootstrap';

const ListPlans = () => {
  const [plans, setPlans] = useState([])
  const [experience, setExperience] = useState([])

  const getPlans = search => {
    const query = search ? `http://localhost:8080/plan?country=${search}` : "http://localhost:8080/plan"
    fetch(query)
      .then(r => r.json())
      .then(data => setPlans(data))
  }

  const getExperiences = search => {
    const query = search ? `http://localhost:8080/experience${search}` : "http://localhost:8080/experience"
    fetch(query)
      .then(r => r.json())
      .then(data => setExperience(data))
  }


  useEffect(() => {
    getPlans()
    getExperiences()
  }, [])

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
      {plans.map((plan) => (
        <PlanItem {...plan} />
      ))}
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
