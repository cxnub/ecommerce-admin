import { useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "./StatusFilter.module.css";

const data = ["All", "Active", "Inactive", "Pending"];

type StatusFilterProps = {
  statusFilter: number;
  setStatusFilter: React.Dispatch<React.SetStateAction<number>>;
};

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setStatusFilter(index)}
      mod={{ active: statusFilter === index }}
      c={
        item === "All"
            ? "gray"
            : item === "Active"
                ? "green"
                : item === "Inactive"
                    ? "gray.5"
                    : "blue.3"


      }
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[statusFilter]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
