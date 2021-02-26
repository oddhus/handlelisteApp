import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const Recipes: React.FC<Props> = () => {
  return <div>{Language.recipes()}</div>;
};
