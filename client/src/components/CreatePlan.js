import React, { useState } from "react";

const AddPlan = () => {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const createPlan = async (e) => {
    try {
      const body = {
        description,
        title,
        start_date: start,
        end_date: end,
        country,
        location,
      };
      const response = await fetch(`http://localhost:8080/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(() => {
        window.location.href = '/'
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5 text-center">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
      >
        Create new plan!
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add new plan</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              Country
              <input
                type="text"
                className="form-control"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
              Location
              <input
                type="text"
                className="form-control"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
              Start Date
              <input
                type="text"
                className="form-control"
                onChange={(e) => setStart(e.target.value)}
              ></input>
              End Date
              <input
                type="text"
                className="form-control"
                onChange={(e) => setEnd(e.target.value)}
              ></input>
              Title
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              Description
              <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea
                  class="form-control"
                  rows="5"
                  id="comment"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>{" "}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => createPlan(e.target.value)}
              >
                Create new plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
