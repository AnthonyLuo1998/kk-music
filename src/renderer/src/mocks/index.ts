import { registerMusic } from './modules/music'
import { registerUser } from './modules/user'

export function setupMock() {
  registerUser()
  registerMusic()
}
