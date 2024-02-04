import React from "react";

export function useDebounce(value, delay) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setText(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  });
  return text;
}
