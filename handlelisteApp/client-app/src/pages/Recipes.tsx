import React from "react";
import {useStore} from "../stores/store";

interface Props {}

export const Recipes: React.FC<Props> = () => {
  const {settingStore} = useStore()

  return <div>{settingStore.language.recipes}</div>;
};
