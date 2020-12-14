import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddPlan = () => {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("AFG");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [allCountries, setAllCountries] = useState(null);

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
        window.location.href = "/";
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCountries = () => {
    const query = `http://localhost:8080/country`;
    fetch(query)
      .then((r) => r.json())
      .then((data) => setAllCountries(data));
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="mt-5 text-center mb-5">
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
              <div>
                <select
                  type="text"
                  name="field3"
                  class="field-style field-full align-none"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  {allCountries &&
                    allCountries.map((country) => (
                      <option value={country.country_code}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
              Location
              <input
                type="text"
                className="form-control"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
              Start Date
              <div>
                <DatePicker
                  utcOffset={0}
                  name="datetime"
                  className={"form-control"}
                  selected={start}
                  onChange={(date) => {
                    setStart(
                      new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      )
                    )
                  }
                  }
                  dateFormat="MM-dd-yyyy"
                  utcOffset={0}
                />

                {""}
              </div>
              End Date
              <div>
                <DatePicker
                  name="datetime"
                  className={"form-control"}
                  selected={end}
                  onChange={(date) => {
                    setEnd(
                      new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      )
                    )
                  }
                  }
                  dateFormat="MM-dd-yyyy"
                />
              </div>
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
