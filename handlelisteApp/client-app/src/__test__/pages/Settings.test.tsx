import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Settings } from '../../pages/Settings'
import English from '../../lang/en'
import { MockLanguage } from '../MockLanguage'

jest.mock('../../stores/store', () => ({
  useStore: () => ({
    settingStore: {
      setLanguage: () => null,
      language: { ...MockLanguage },
    },
  }),
}))

describe('SettingPage', () => {
  describe('Layout', () => {
    it('has header of Settings', () => {
      const { container } = render(<Settings />)
      const div = container.querySelector('div')
      expect(div).toHaveTextContent('Settings')
    })
  })
})
