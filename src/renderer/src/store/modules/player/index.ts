import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { throttle } from '@renderer/utils'
import { getStore, setStore } from '@renderer/utils/localStore'
import { createTrackAnimation } from '@renderer/utils/track/track'
import type { MusicProps, ModeOptions } from './types'
import type { CustomElectronApi } from '@renderer/electron/api/types'

export const usePlayerStore = defineStore('player', () => {
  /**
   * ===============变量===============
   */

  // 当前播放音乐信息
  const music = ref<MusicProps | null>(null)

  // 当前音乐加载中进度
  const progress = ref<number>(0)

  // 播放模式
  const playMode = ref<ModeOptions>(0)

  // 是否已经初始化播放器
  const isInitPlayer = ref<boolean>(false)

  // 音量
  const volume = ref<number>(1)

  // 总时长
  const duration = ref<number>(0)

  // 当前播放进度
  const currentTime = ref<number>(0)

  // 播放状态
  const playStatus = ref<boolean>(false)

  // 进度状态 是否在加快进度
  const isMove = ref<boolean>(false)

  // 待播放音乐列表
  const playList = ref<MusicProps[]>([])

  // 当前播放音乐索引
  const playListIdx = ref<number>(-1)

  // 音乐列表歌曲数目
  const playListNumber = computed(() => playList.value.length)

  // 列表是否为空
  const isPlayListEmptied = computed(() => playList.value.length === 0)

  // 播放器
  const player = ref<HTMLAudioElement>(new Audio())

  // 恢复状态
  restoreState()

  /**
   * ===============以下是缓存相关函数===============
   */

  // 恢复缓存状态
  function restoreState() {
    setMusic(getStore('music'))
    setPlayMode(+getStore('play-mode') as ModeOptions)
    setVolume(+getStore('volume'))
    setDuration(+getStore('duration'))
    setCurrentTime(+getStore('current-time'))
    setPlayList(getStore('play-list'))
    getStore('play-list-idx')
  }

  // 缓存状态
  function cacheState() {
    setStore('music', music.value)
    setStore('play-mode', playMode.value)
    setStore('volume', volume.value)
    setStore('duration', duration.value)
    setStore('current-time', currentTime.value)
    setStore('play-list', playList.value)
    setStore('play-list-idx', playListIdx.value)
  }

  /**
   * ===============以下是监听===============
   */

  // 监听窗口关闭前，缓存数据
  ;(window.api as CustomElectronApi).beforeWindowClose(() => {
    cacheState()
  })

  // 监听媒体文件加载进度
  player.value.addEventListener('progress', () => {
    if (player.value.buffered.length > 0) {
      const loaded = (player.value.buffered.end(0) / player.value.duration) * 100
      setProgress(loaded)
    }
  })

  // 监听播放时间更新
  player.value.addEventListener(
    'timeupdate',
    throttle(() => {
      if (!isMove.value) {
        setCurrentTime(player.value.currentTime)
        setDuration(player.value.duration)
      }
    }, 1000)
  )

  // 监听播放结束
  player.value.addEventListener('ended', () => {
    switch (playMode.value) {
      case 0:
        playNext()
        break
      case 1:
        playMusic()
        break
      case 2:
        playRandom()
        break
    }
  })

  // 监听音量
  watchEffect(() => {
    changePlayerVolume(volume.value)
  })

  /**
   * ===============以下是功能函数===============
   */

  // 添加音乐到播放列表
  function addPlayList(e: MouseEvent, m: MusicProps) {
    if (playListNumber.value === 0) {
      playList.value.push(m)
      setPlayListIdx(0)
      playMusic()
    } else {
      if (playList.value.some((i) => i.id === m.id)) {
        return
      }
      playList.value.push(m)
    }
    createTrackAnimation(e, { x: window.innerWidth - 45, y: window.innerHeight - 40 })
  }

  // 播放音乐：功能
  function playMusic() {
    if (playListIdx.value > -1) {
      setMusic(playList.value[playListIdx.value])
      pause()
      changePlayerSrc()
      player.value.load()
      play()
      setPlayStatus(true)
    }
  }

  // play & pause
  function toggleAudio() {
    if (player.value.paused) {
      play()
    } else {
      pause()
    }
  }

  // 播放音乐：状态
  function play() {
    if (!isInitPlayer.value) {
      initPlayer()
    }
    player.value.play()
    setPlayStatus(true)
  }

  // 停止播放音乐：状态
  function pause() {
    player.value.pause()
    setPlayStatus(false)
  }

  // 随机播放音乐
  function playRandom() {
    setPlayListIdx(Math.round(Math.random() * playListNumber.value - 1))
    playMusic()
  }

  // 下一首歌曲
  function playNext() {
    if (playListNumber.value > 0) {
      setPlayListIdx((playListIdx.value + 1) % playListNumber.value)
      playMusic()
    }
  }

  // 上一首歌曲
  function playPrevious() {
    if (playListNumber.value > 0) {
      setPlayListIdx(Math.abs(playListIdx.value - 1) % playListNumber.value)
      playMusic()
    }
  }

  // 点播歌曲
  function dibbleSeeding(m: MusicProps) {
    let idx = playList.value.findIndex((el) => el.id === m.id)
    if (idx === -1) {
      idx = playList.value.push(m) - 1
    }
    setPlayListIdx(idx)
    playMusic()
  }

  // 静音
  function muteVolume(): void {
    volume.value = 0
  }

  // 初始化播放器
  function initPlayer() {
    if (music.value) {
      changePlayerSrc()
      changePlayerVolume()
      changePlayerProgress()
      isInitPlayer.value = true
    }
  }

  // 清空播放列表
  function clearPlayList() {
    pause()
    setMusic()
    setPlayList()
    setPlayListIdx()
    setDuration()
    setCurrentTime()
    setProgress()
  }

  /**
   * ===============以下是变量设置===============
   */

  // 设置播放列表
  function setPlayList(pl?: MusicProps[]) {
    playList.value = pl ?? []
  }

  // 设置播放模式
  function setPlayMode(pm?: ModeOptions) {
    playMode.value = (pm as ModeOptions) ?? 0
  }

  // 设置当前进度
  function setProgress(p?: number) {
    progress.value = p ?? 0
  }

  // 设置当前播放时间
  function setCurrentTime(t = 0) {
    currentTime.value = t ?? 0
  }

  // 设置音乐总时长
  function setDuration(d?: number) {
    duration.value = d ?? 0
  }

  // 设置音量
  function setVolume(v?: number) {
    volume.value = v ?? 1
  }

  // 设置当前播放索引
  function setPlayListIdx(idx?: number) {
    playListIdx.value = idx ?? -1
  }

  // 设置当前播放的音乐
  function setMusic(m?: MusicProps | null) {
    music.value = m ?? null
    console.log(music.value)
  }

  // 设置进度条移动状态
  function setIsMove(s: boolean) {
    isMove.value = s
  }

  // 设置播放状态
  function setPlayStatus(s: boolean) {
    playStatus.value = s
  }

  /**
   * ===============以下是播放器变量设置===============
   */

  // 改变播放器播放链接
  function changePlayerSrc(src?: string) {
    player.value.src = src || music.value?.src || ''
  }

  // 改变播放器播放进度
  function changePlayerProgress(time: number = currentTime.value) {
    player.value.currentTime = time
  }

  // 改变播放进度：通过移动进度条
  function changePlayerProgressByMove() {
    changePlayerProgress()
    setIsMove(false)
  }

  // 改变播放器音量
  function changePlayerVolume(value: number = volume.value) {
    player.value.volume = value
  }

  return {
    music,
    player,
    volume,
    playList,
    duration,
    currentTime,
    playStatus,
    playMode,
    playListNumber,
    playListIdx,
    isPlayListEmptied,
    progress,

    setIsMove,
    setPlayMode,

    toggleAudio,
    playNext,
    playPrevious,
    addPlayList,
    dibbleSeeding,
    changePlayerProgressByMove,
    changePlayerVolume,
    muteVolume,
    clearPlayList
  }
})
