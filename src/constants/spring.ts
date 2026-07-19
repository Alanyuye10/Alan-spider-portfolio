export const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const easeBounce: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

export const springPremium = { type: 'spring' as const, stiffness: 120, damping: 18 }
export const springGentle = { type: 'spring' as const, stiffness: 80, damping: 22 }
export const springBouncy = { type: 'spring' as const, stiffness: 200, damping: 12 }
