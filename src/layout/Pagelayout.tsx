import type { PropsWithChildren } from "react";

const Pagelayout = ({ children }: PropsWithChildren) => {
  return <div className="px-7 py-5 max-w-5xl mx-auto pb-15">{children}</div>;
};

export default Pagelayout;
