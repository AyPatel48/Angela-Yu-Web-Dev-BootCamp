// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import {createRoot} from "react-dom/client";
import { cars } from "./practice";

const [honda, tesla] = cars;

const {coloursByPopularity: [hondaTopColour,], speedStats: {topSpeed : hondaTopSpeed}} = honda;
const {coloursByPopularity: [teslaTopColour,], speedStats: {topSpeed : teslaTopSpeed}} = tesla;

const root = createRoot(document.getElementById("root"));

root.render(
    <table>
      <tr>
        <th>Brand</th>
        <th>Top Speed</th>
      </tr>
      <tr>
        <td>{tesla.model}</td>
        <td>{teslaTopSpeed}</td>
        <td>{teslaTopColour}</td>
      </tr>
      <tr>
        <td>{honda.model}</td>
        <td>{hondaTopSpeed}</td>
        <td>{hondaTopColour}</td>
      </tr>
    </table>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
