import React, { useState, Fragment } from "react";
const EditPlan = ({ plan }) => {
  const [description, setDescription] = useState(plan.description);
  const [title, setTitle] = useState(plan.title);
  const [start, setStart] = useState(plan.start_date);
  const [end, setEnd] = useState(plan.end_date);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description, title, start, end };
      const response = await fetch(`http://localhost:8080/plan/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(body);
    } catch (error) {
      console.log(error);
    }

    // window.location.href = "/";
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-info"
        data-toggle="modal"
        data-target={`#a${plan.id}`}
      >
        Edit
      </button>

      <div class="modal fade" id={`a${plan.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit plans</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              Do you want to change your title?
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>{" "}
              Do you want to change your description?
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              Do you want to change the start date?
              <input
                type="text"
                className="form-control"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              ></input>
              Do you want to change the end date?
              <input
                type="text"
                className="form-control"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              ></input>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPlan;
