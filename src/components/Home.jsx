import React from "react";
import { data } from "../data";
import Table from "./Table/Table";
import GammaTable from "./Table/GammaTable";
import { groupByClassHelper } from "../utils/helperFunctions";

// The Component parents both tables and class filtered data is being hydrated and supplied from here.
export default function Home() {
  // Assigning the data to a normal variable as data remains static so not going with state, but useState and hydration in useEffect can also be used.
  let groupedByClass = groupByClassHelper(data);

  return (
    <div>
      <h3> Manufac Task </h3>
      <Table groupedByClass={groupedByClass} />
      <GammaTable groupedByClass={groupedByClass} />
    </div>
  );
}
