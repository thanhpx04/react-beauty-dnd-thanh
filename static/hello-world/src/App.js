import React, { useState, Fragment } from "react";
import { Table } from "antd";
import { data, tableColumns } from "./data/data.js";
import { searchTree, removeDraggingItem } from "./utility/utility.js";
import { DragDropContext } from "react-beautiful-dnd";
import { components } from "./components/CustomTableWrapper.js";

const App = () => {
  const [tableData, setTableData] = useState(data);

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        components={components}
        onRow={(record, index) => ({
          index,
          record
        })}
        pagination={false}
      />
    </DragDropContext>
  );
};

export default App;
