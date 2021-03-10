import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const Household: React.FC<Props> = () => {
  return <div>{activeLanguage.household}</div>;
};
