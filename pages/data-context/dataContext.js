import React, { createContext, useContext, useState } from "react";

// 创建一个 Context
const DataContext = createContext();

// 创建一个提供数据的组件
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// 自定义 hook 来方便地使用上下文数据
export const useData = () => useContext(DataContext);
