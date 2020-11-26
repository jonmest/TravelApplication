import React, { useState, Fragment, useEffect } from "react"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExperience = ({ plan }) => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const addExperience = () => {
        const experience = { title, description, start_datetime: start, end_datetime: end, plan: plan.id }
        fetch(`http://localhost:8080/experience/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experience),
        })
    }

    return (
        <Fragment>
            <button
                type="button"
                class="btn btn-info"
                data-toggle="modal"
                data-target={`#a${plan.id}-experience`}
            >
                Add planned experience
      </button>

            <div class="modal fade" id={`a${plan.id}-experience`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add planned experience</h4>
                            <button type="button" class="close" data-dismiss="modal">
                                &times;
              </button>
                        </div>

                        <div class="modal-body">
                            Title
              <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>{" "}
              Description
              <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></input>
              Starting
              <p><DatePicker
                                name="datetime"
                                className={"form-control"}
                                selected={start}
                                showTimeSelect
                                onChange={(date) => setStart(date)}
                                dateFormat="MM-dd-yyyy"
                            /></p>
              Ending
              <p><DatePicker
                                name="datetime"
                                className={"form-control"}
                                selected={end}
                                showTimeSelect
                                onChange={(date) => setEnd(date)}
                                dateFormat="MM-dd-yyyy"
                            /></p>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={addExperience}
                            >
                                Create Experience
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

export default AddExperience;
