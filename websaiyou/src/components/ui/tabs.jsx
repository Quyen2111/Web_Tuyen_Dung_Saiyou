import { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return children({ value, setValue });
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, current, setCurrent, children }) {
  const isActive = current === value;
  return (
    <button
      onClick={() => setCurrent(value)}
      className={`px-4 py-2 rounded ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, current, children }) {
  return value === current ? <div>{children}</div> : null;
}