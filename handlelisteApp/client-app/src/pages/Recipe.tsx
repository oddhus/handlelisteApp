import React from 'react'
import { useStore } from '../stores/store'

interface Props {}

export const Recipe: React.FC<Props> = () => {
  const { settingStore } = useStore()

  return <div>{settingStore.language.recipe}</div>
}
