import React from "react";
import { useHistory } from "react-router-dom";

export const BaseTable = (props) => {
  const history = useHistory();
  return (
    <table className="table-auto">
      <thead>
        <tr>
          {props.columns.map((column) => (
            <th className="px-4 py-2">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.values.map((row) => (
          <tr>
            {props.columns.map((column, index) => (
              <td className="border px-4 py-2">
                  {
                  index > 0 ? 
                    row[column].value : 
                    <a href="#" onClick={() => history.push(row[column].url, row)}>{row[column].value}</a>
                  }
                </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
