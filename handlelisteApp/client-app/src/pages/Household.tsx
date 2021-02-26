import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const Household: React.FC<Props> = () => {
  return <div>{Language.household()}</div>;
};
