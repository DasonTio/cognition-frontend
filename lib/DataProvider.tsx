"use client";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Data {
  [key: string]: any;
}

interface DataContextType {
  data: Data | null;
  setData: (data: Data | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Data | null>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("data");
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
