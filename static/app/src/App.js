import React, { useState } from "react";
import { Table } from "antd";
import { data, tableColumns } from "./data/data.js";
import { searchTree, removeDraggingItem } from "./utility/utility.js";
import { DragDropContext } from "react-beautiful-dnd";
import { components } from "./components/CustomTableWrapper.js";
import DropdownMenu, {
  DropdownItemCheckbox,
  DropdownItemCheckboxGroup
} from "@atlaskit/dropdown-menu";

const App = () => {
  const [tableData, setTableData] = useState(data);
  const [columns, setColumns] = useState(tableColumns);

  const toggle = (name) => {
    const newColumns = Array.from(columns);
    const foundColumn = newColumns.find((column) => column.dataIndex === name);
    foundColumn.isDisplayed = !foundColumn.isDisplayed;
    setColumns(newColumns);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, combine } = result;
    if (!combine) {
      // not implement drop in between rows
      console.log("not implement drop in between rows");
      return;
    }

    const newTableData = Array.from(tableData);
    let sourceItem = searchTree(newTableData, draggableId);
    if (sourceItem.parent === "root") {
      const index = newTableData.indexOf(sourceItem);
      newTableData.splice(index, 1);
    } else {
      let parentOfSurceItem = searchTree(newTableData, sourceItem.parent);
      removeDraggingItem(parentOfSurceItem, sourceItem);
    }

    if (combine) {
      // drop item on item
      let targetItem = searchTree(newTableData, combine.draggableId);
      // update parent of source
      sourceItem.parent = targetItem.key;
      if (targetItem.hasOwnProperty("children")) {
        targetItem.children.push(sourceItem);
      } else {
        targetItem.children = [sourceItem];
      }
    } else {
      // not implement drop in between rows
      console.log("not implement drop in between rows");
      return;
    }
    setTableData(newTableData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table
          dataSource={tableData}
          columns={columns.filter((column) => column.isDisplayed === true)}
          components={components}
          onRow={(record, index) => ({
            index,
            record
          })}
          pagination={false}
        />
      </DragDropContext>
      <br />
      <DropdownMenu trigger="Select display columns">
        <DropdownItemCheckboxGroup title="Column" id="actions">
          <DropdownItemCheckbox
            id="type"
            onClick={(e) => toggle("type")}
            isSelected={
              columns.find((column) => column.dataIndex === "type").isDisplayed
            }
          >
            Type
          </DropdownItemCheckbox>
          <DropdownItemCheckbox
            id="summary"
            onClick={(e) => toggle("summary")}
            isSelected={
              tableColumns.find((column) => column.dataIndex === "summary")
                .isDisplayed
            }
          >
            Summary
          </DropdownItemCheckbox>
          <DropdownItemCheckbox
            id="storypoint"
            onClick={(e) => toggle("storypoint")}
            isSelected={
              columns.find((column) => column.dataIndex === "storypoint")
                .isDisplayed
            }
          >
            Story Point
          </DropdownItemCheckbox>
          <DropdownItemCheckbox
            id="assignee"
            onClick={(e) => toggle("assignee")}
            isSelected={
              columns.find((column) => column.dataIndex === "assignee")
                .isDisplayed
            }
          >
            Owner By
          </DropdownItemCheckbox>
          <DropdownItemCheckbox
            id="status"
            onClick={(e) => toggle("status")}
            isSelected={
              columns.find((column) => column.dataIndex === "status")
                .isDisplayed
            }
          >
            Status
          </DropdownItemCheckbox>
        </DropdownItemCheckboxGroup>
      </DropdownMenu>
    </div>
  );
};

export default App;
