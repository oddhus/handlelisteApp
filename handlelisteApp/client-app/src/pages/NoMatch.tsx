import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const NoMatch: React.FC<Props> = () => {
  return <div>{Language.noMatch()}</div>;
};
