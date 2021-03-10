import React from "react";
import {activeLanguage} from '../lang/ActiveLanguage';

interface Props {}

export const HomePage: React.FC<Props> = () => {
    return <div data-testid="homepage">{activeLanguage.homePage}</div>;
};
