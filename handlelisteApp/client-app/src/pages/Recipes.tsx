import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const Recipes: React.FC<Props> = () => {
  return <div>{activeLanguage.recipes}</div>;
};
