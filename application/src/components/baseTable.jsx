import React from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import Icon from "awesome-react-icons";

export const BaseTable = (props) => {
  const [values, setValues] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const history = useHistory();
  React.useEffect(() => {
    setValues(props.values);
    setColumns(props.columns);
  }, [props]);

  const sortValues = (column) => {
    if (values.length > 0) {
      let sortedValues = _.sortBy(values, [function (o) { return o[column].value; }]);
      if (_.isEqual(sortedValues, values)) {
        sortedValues = sortedValues.reverse();
      }
      setValues(sortedValues);
    }
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="px-4 py-2" style={{ cursor: "pointer" }} onClick={() => sortValues(column)}>{column}</th>
          ))}
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {values.map((row) => (
          <tr>
            {
              columns.map((column, index) => (
                <td className="border px-4 py-2">
                  {
                    index === 0 && <a href="#" onClick={() => history.push(row[column].url, row)}>{row[column].value}</a>
                  }
                  {
                    index > 0 && column !== "updated_at" && row[column].value
                  }
                  {
                    column === "updated_at" && new Date(row[column].value).toLocaleString()
                  }
                </td>
              ))
            }
            <td>
              {
                row.buttons.map((button) => {
                  console.log(button);
                  console.log(props);
                  console.log(props[button.onClick]);
                  return (
                    <Icon name={button.icon} style={{cursor: "pointer"}} onClick={() => props[button.onClick](button.args)} />
                  )
                })
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
