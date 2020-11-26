import React, { useState, Fragment } from "react"

const AddExperience = ({ plan }) => {
    const [description, setDescription] = useState(plan.description);
    const [title, setTitle] = useState(plan.title);
    const [start, setStart] = useState(plan.start_datetime);
    const [end, setEnd] = useState(plan.end_datetime);

    const addExperience = () => {

    }

    return (
        <Fragment>
            <button
                type="button"
                class="btn btn-info"
                data-toggle="modal"
                data-target={`#a${plan.id}`}
            >
                Add planned experience
      </button>

            <div class="modal fade" id={`a${plan.id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add planned experience</h4>
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
              <DatePicker
                                name="datetime"
                                className={"form-control"}
                                selected={start}
                                onChange={(date) => setStart(date)}
                                dateFormat="MM-dd-yyyy"
                            />
              Do you want to change the end date?
              <DatePicker
                                name="datetime"
                                className={"form-control"}
                                selected={start}
                                onChange={(date) => setEnd(date)}
                                dateFormat="MM-dd-yyyy"
                            />

                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-warning"
                                    data-dismiss="modal"
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

export default AddExperience;
