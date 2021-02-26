import React from "react";
import {Language} from '../lang/ActiveLanguage';

interface Props {}

export const HomePage: React.FC<Props> = () => {
    return <div data-testid="homepage">{Language.homePage()}</div>;
};
