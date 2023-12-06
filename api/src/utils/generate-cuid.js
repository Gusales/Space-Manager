import { init } from '@paralleldrive/cuid2'

export const generateCUID = init({
  random: Math.random,
  length: 5,
  fingerprint: 'space-manager'
})
