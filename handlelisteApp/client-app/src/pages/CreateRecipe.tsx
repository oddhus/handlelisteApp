import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const CreateRecipe: React.FC<Props> = () => {
  return <div>{activeLanguage.createRecipe}</div>;
};
