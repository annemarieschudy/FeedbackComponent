import React from "react";

const TabRow = toggler => {
  return (
    <div className="row tab-row">
      <ul>
        <li id="two-weeks" onClick={toggler.toggler} className="active-tab">
          Past 2 Weeks
        </li>
        <li id="this-quarter" onClick={toggler.toggler}>
          This Quarter
        </li>
        <li id="this-year" onClick={toggler.toggler}>
          This Year
        </li>
        <li id="custom" onClick={toggler.toggler}>
          Custom...
        </li>
      </ul>
    </div>
  );
};

export default TabRow;
