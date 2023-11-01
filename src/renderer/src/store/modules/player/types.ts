export interface MusicProps {
  id: string
  src: string
  name: string
  cover: string
  author: string
  album: string
  duration: string
  isLike?: boolean
}

export type ModeOptions = 0 | 1 | 2

export type VolumeOptions = 0 | 1
