import { observable, computed } from 'mobx'

class AppState {
  interval = null
  deadline = null
  num = null
  @observable timer = null

  constructor (num = 30) {
    this.num = num
    this.resetTimer()
  }

  @computed get seconds () {
    return this.leadingZero(Math.floor((this.timer / 1000) % 60))
  }

  @computed get minutes () {
    return this.leadingZero(Math.floor((this.timer / 1000 / 60) % 60))
  }

  @computed get hours () {
    return this.leadingZero(Math.floor((this.timer / (1000 * 60 * 60)) % 24))
  }

  resetTimer () {
    this.deadline = this.setMinutes(this.num)
    this.startTimer()
  }

  startTimer () {
    clearInterval(this.interval)
    this.getTimeRemaining(this.deadline)
    this.interval = setInterval(() => {
      this.getTimeRemaining(this.deadline)
    }, 1000)
  }

  getTimeRemaining () {
    this.timer = Date.parse(this.deadline) - Date.parse(new Date())
  }

  /* Util */

  setMinutes (minutes) {
    return new Date(new Date().getTime() + minutes * 60000)
  }

  leadingZero (unit) {
    return ('0' + unit).slice(-2)
  }
}

export default AppState
