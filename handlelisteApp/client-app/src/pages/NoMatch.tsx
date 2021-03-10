import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const NoMatch: React.FC<Props> = () => {
  return <div>{activeLanguage.noMatch}</div>;
};
