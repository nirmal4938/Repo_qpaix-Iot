import { useState, useEffect } from 'react'
import { isCurrentData as initialAssets } from '../../../../constant/ComponentState'
console.log('initialAssets', initialAssets)
export const useHook = () => {
  const [systemData, setSystemData] = useState({
    persomName: '',
    isActive: true,
    rights: ['0', '1', '2', '2.5'],
    _Qsets: initialAssets,
  })

  return {
    // _Qsets: initialAssets,
    systemData,
  }
}
