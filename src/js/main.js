import $ from 'jquery'
import svg from './svglib'

// IMAGES
import audio1 from '../images/audio1.jpg'
import audio2 from '../images/audio2.jpg'
import audio3 from '../images/audio3.jpg'

const playlist = ['audio1', 'video1', 'audio2', 'video2', 'audio3', 'video3']
const playlistLength = playlist.length

let counter
let playpauseStatus = 'play'

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
  video1: [
    '<source src="js/video/video1.mp4" type="video/mp4">',
    '<source src="js/video/video1.webm" type="video/webm">',
    '<source src="js/video/video1.ogg" type="video/webm">'
  ],
  video2: [
    '<source src="js/video/video2.mp4" type="video/mp4">'
  ],
  video3: [
    '<source src="js/video/video3-HD.mp4" type="video/mp4">'
  ]
})[video]

function playAudio(newTrack) {
  $('audio').attr('src', getAudioSrc(newTrack))
  $(`#${newTrack}`).closest('li').addClass('played')
  $('audio').addClass('playing')
  $('.screen').css('background-image', `url(${getAudioImg(newTrack)})`)
  $('audio')[0].play()
}

function playVideo(newTrack) {
  $('audio')[0].pause()
  $('.screen').append('<video class="playing"></video>')
  const sources = getVideoSrc(newTrack)
  sources.map((src) => {
    $('video').append(src)
  })

  if (newTrack === 'video3') {
    if (window.innerWidth <= 480) {
      $('source').attr('src', 'js/video/video3-VGA.mp4')
    }
    const sub = '<track label="Subtitulos" kind="subtitulos" srclang="es" src="js/subtitle/video3.vtt" default>'
    $('video').append(sub)
  }

  $('video').on('ended', () => {
    counter += 1
    nextTrack()
  })

  $(`#${newTrack}`).closest('li').addClass('played')
  $('video')[0].play()
}

function nextTrack() {
  $('video').remove()
  $('audio').removeAttr('src')
  $('video').removeClass('playing')
  $('audio').removeClass('playing')
  $('li').removeClass('played')
  $('.screen').css('background-image', '')

  if (counter !== 0) {
    const oldTrack = playlist[counter - 1]
    $(`#${oldTrack}`).closest('li').removeClass('played')
  }
  counter = (counter === playlistLength) ? 0 : counter
  const newTrack = playlist[counter]

  if (newTrack.substring(0, 5) === 'audio') {
    playAudio(newTrack)
  } else {
    playVideo(newTrack)
  }
}

function addAVEvents() {
  $('audio').on('ended', () => {
    counter += 1
    nextTrack()
  })
  $('video').on('ended', () => {
    counter += 1
    nextTrack()
  })
}

function activatePlaylist() {
  $('li p').click((event) => {
    const media = event.currentTarget.id
    for (let i = 0; i < playlistLength; i += 1) {
      if (playlist[i] === media) {
        counter = i
      }
    }

    playpauseStatus = 'play'
    $('#playpause').empty()
    $('#playpause').append($(svg.lib.pause))

    nextTrack()
  })
}

function activateControls() {
  $('#playpause').click(() => {
    $('#playpause').empty()
    if (playpauseStatus === 'play') {
      playpauseStatus = 'pause'
      $('.playing')[0].pause()
      $('#playpause').append($(svg.lib.play))
    } else {
      playpauseStatus = 'play'
      $('.playing')[0].play()
      $('#playpause').append($(svg.lib.pause))
    }
  })
  $('#backward').click(() => {
    $('.playing')[0].currentTime -= 10
  })
  $('#forward').click(() => {
    $('.playing')[0].currentTime += 10
  })
}

$(document).ready(() => {
  counter = 0
  activateControls()
  activatePlaylist()
  addAVEvents()
  nextTrack()
})
