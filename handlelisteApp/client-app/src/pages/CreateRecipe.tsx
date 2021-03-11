import React from "react";
import {useStore} from "../stores/store";

interface Props {}

export const CreateRecipe: React.FC<Props> = () => {
  const {settingStore} = useStore()

  return <div>{settingStore.language.createRecipe}</div>;
};
