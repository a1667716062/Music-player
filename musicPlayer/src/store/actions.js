/*
 * @Author: 李浩栋
 * @Begin: 2019-09-12 14:11:33
 * @Update: 2019-09-21 16:27:01
 * @Update log: 更新日志
 */
import {
  SET_PLAY_SATE,
  SET_FULL_SCREEN,
  SET_AUDIO_LIST,
  SET_AUDIO_INDEX,
  SET_AUDIO_MODE,
  SET_PLAY_LIST
} from './mutation-types'

/**
 * 获取随机值
 */
function getRandomIndex (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 打乱一个数组
 */
function shuffle (arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  selectPlay ({commit, state}, {list, index}) {
    commit(SET_AUDIO_LIST, list)
    if (state.mode === 2) {
      const randomList = shuffle(list)
      commit(SET_PLAY_LIST, randomList)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit(SET_PLAY_LIST, list)
    }
    commit(SET_AUDIO_INDEX, index)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
  },
  startPlayAll ({commit}, {list}) {
    commit(SET_AUDIO_LIST, list)
    commit(SET_AUDIO_INDEX, 0)
    commit(SET_PLAY_LIST, list)
    commit(SET_PLAY_SATE, true)
    commit(SET_FULL_SCREEN, true)
    commit(SET_AUDIO_MODE, 0)
  },
  deleteSong ({commit, state}, song) {
    let audioList = state.audioList.slice()
    let playList = state.playList.slice()
    let currentIndex = state.audioIngIndex
    // 删除的歌曲是当前播放歌曲之前
    let pIndex = findIndex(audioList, song)
    audioList.splice(pIndex, 1)
    // 删除的歌曲是当前歌曲之后
    let sIndex = findIndex(playList, song)
    playList.splice(sIndex, 1)

    if (currentIndex > pIndex || currentIndex === audioList.length) {
      currentIndex--
    }

    commit(SET_AUDIO_LIST, audioList)
    commit(SET_PLAY_LIST, playList)
    commit(SET_AUDIO_INDEX, currentIndex)

    if (!audioList.length) {
      commit(SET_PLAY_SATE, false)
    }
  }
}
