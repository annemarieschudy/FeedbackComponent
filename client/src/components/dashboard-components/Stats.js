import React from "react";
import StatBlock from "./StatBlock";

const Stats = data => {
  console.log(data.data);
  return (
    <div className="row numbers-row">
      <StatBlock value={data.data[0]} label={"left feedback"} />
      <StatBlock value={data.data[1]} label="positive reviews" />
      <StatBlock value={data.data[2]} label="neutral reviews" />
      <StatBlock value={data.data[3]} label="negative reviews" />
    </div>
  );
};
export default Stats;
