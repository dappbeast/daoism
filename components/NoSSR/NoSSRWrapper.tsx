import React from "react";

export default function NoSSR({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return children as React.ReactElement;
}
