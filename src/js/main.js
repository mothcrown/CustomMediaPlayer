import $ from 'jquery'
import './modernizr-custom.min'

// IMAGES
import audio1 from '../images/audio1.jpg'
import audio2 from '../images/audio2.jpg'
import audio3 from '../images/audio3.jpg'

const playlist = ['audio1', 'video1', 'audio2', 'video2', 'audio3', 'video3']

const getAudioImg = audio => ({
  audio1: `${audio1}`,
  audio2: `${audio2}`,
  audio3: `${audio3}`
})[audio]

const getAudioSrc = audio => ({
  audio1: 'js/audio/audio1.mp3',
  audio2: 'js/audio/audio2.mp3',
  audio3: 'js/audio/audio3.mp3'
})[audio]

const getVideoSrc = video => ({
  video1: 'js/video/video1',
  video2: 'js/video/video2',
  video3: 'js/video/video3',
})[video]

$(document).ready(() => {

})
