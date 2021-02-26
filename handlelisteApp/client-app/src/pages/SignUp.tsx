import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const SignUp: React.FC<Props> = () => {
  return <div>{Language.signUp()}</div>;
};
