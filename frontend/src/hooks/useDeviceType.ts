import { useEffect, useLayoutEffect, useState } from 'react'

export enum DeviceType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  BigDesktop = 'bigDesktop',
}

export const useDeviceType = (): DeviceType => {
  const [deviceWidth, setDeviceWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    setDeviceWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setDeviceWidth(window.innerWidth)
  }

  const getDeviceType = () => {
    if (!deviceWidth) return DeviceType.Desktop

    if (deviceWidth < 720) return DeviceType.Mobile

    if (deviceWidth < 1200) return DeviceType.Tablet

    if (deviceWidth < 1800) return DeviceType.Desktop

    return DeviceType.BigDesktop
  }

  return getDeviceType()
}