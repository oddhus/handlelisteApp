import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const Settings: React.FC<Props> = () => {
  return <div>{Language.settings()}</div>;
};
