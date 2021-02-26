import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const Recipe: React.FC<Props> = () => {
  return <div>{Language.recipe()}</div>;
};
