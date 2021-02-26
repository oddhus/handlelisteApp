import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const CreateRecipe: React.FC<Props> = () => {
  return <div>{Language.createRecipe()}</div>;
};
