export const data = [
    {
      key: "KEY-1",
      parent: "root",
      summary: "aaa",
      children: [
        {
          key: "Key-4",
          parent: "KEY-1",
          summary: "child"
        },
        {
          key: "Key-5",
          parent: "KEY-1",
          summary: "child"
        }
      ]
    },
    {
      key: "KEY-2",
      parent: "root",
      summary: "bbb"
    },
    {
      key: "KEY-3",
      parent: "root",
      summary: "ccc"
    }
  ];
  
  export const tableColumns = [
    {
      title: "Issue Key",
      dataIndex: "key"
    },
    {
      title: "Summary",
      dataIndex: "summary"
    }
  ];
  