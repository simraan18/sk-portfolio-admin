import type { PropsWithChildren } from "react";

const Pagelayout = ({ children }: PropsWithChildren) => {
  return <div className="px-7 py-5 max-w-5xl mx-auto">{children}</div>;
};

export default Pagelayout;
