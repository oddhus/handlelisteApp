import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const Recipe: React.FC<Props> = () => {
  return <div>{activeLanguage.recipe}</div>;
};
