import React, { useEffect, useState } from "react";

const FilterPlans = ({ plans }) => {
  const [search, setSearch] = useState("");

  const getPlansBySearch = async () => {
    // const response = await fetch(`http://localhost:8080/plan?country=${plans}`);
    const response = await fetch(`http://localhost:8080/plan?country=SWE`);
    const jsonData = await response.json();
    setSearch(jsonData);
    console.log(response);
  };
  console.log(search);
  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div>
      <input
        class="form-control mt-5"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
};

export default FilterPlans;
