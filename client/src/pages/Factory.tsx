import React from "react";
import { CatFactory } from "../components/CatFactory/CatFactory";

interface FactoryProps {}

export const Factory = ({}: FactoryProps) => {
  return (
    <div>
      <CatFactory />
    </div>
  );
};
