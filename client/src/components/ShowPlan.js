import React, { Fragment, useEffect, useState } from "react";
const ShowPlan = ({ plan }) => {

  const [planData, setPlanData] = useState(null)


  const loadDetails = () => {
    const query = `http://localhost:8080/plan/${plan}`
    fetch(query)
      .then(r => r.json())
      .then(data => setPlanData(data))
  }

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#myModal"
        onClick={loadDetails}
      >
        Expand
      </button>

      {      planData && <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{planData.title}</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <p>
                {planData.description}
              </p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>}
    </Fragment>
  );
};

export default ShowPlan;
