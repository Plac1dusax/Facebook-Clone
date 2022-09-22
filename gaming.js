const video = document.querySelectorAll("video")
const videoContainer = document.querySelectorAll(".video-container")
const playPauseBtn = document.querySelectorAll(".play-pause-button")
const muteBtn = document.querySelectorAll("[data-volume]")
const miniPlayerBtn = document.querySelectorAll(".mini-player")
const currentTime = document.querySelectorAll(".current-time")
const totalTime = document.querySelectorAll(".total-time")
const timelineContainer = document.querySelectorAll(".timeline-container")

// Timeline
timelineContainer.forEach(container => {
  container.addEventListener("mousemove", e => {
    handleTimelineUpdate(e, container)
  })
})

timelineContainer.forEach(container => {
  container.addEventListener("mousemove", e => {
    const parent = e.target.closest(".video-container")
    const video = parent.querySelector("video")
    toggleScrubbing(e, container, video)
  })
})

document.addEventListener("mouseup", e => {
  videoContainer.forEach(videoContainer => {
    const container = videoContainer.querySelector(".timeline-container")
    const video = videoContainer.querySelector("video")
    if (isScrubbing) toggleScrubbing(e, container, video)
  })
})

document.addEventListener("mousemove", e => {
  videoContainer.forEach(videoContainer => {
    const container = videoContainer.querySelector(".timeline-container")
    if (isScrubbing) handleTimelineUpdate(e, container)
  })
})

let isScrubbing = false
let wasPaused

function toggleScrubbing(e, container, video) {
  const rect = container.getBoundingClientRect()
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
  isScrubbing = (e.buttons & 1) === 1
  container.classList.toggle("scrubbing", isScrubbing)

  if (isScrubbing) {
    wasPaused = video.paused
    video.pause()
  } else {
    video.currentTime = percent * video.duration
    if (!wasPaused) video.play()
  }

  handleTimelineUpdate(e, container)
}

function handleTimelineUpdate(e, container) {
  const rect = container.getBoundingClientRect()
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width

  container.style.setProperty("--preview-position", percent)

  if (isScrubbing) {
    e.preventDefault()
    container.style.setProperty("--progress-position", percent)
  }
}

// Duration
video.forEach(video => {
  video.addEventListener("loadeddata", e => {
    const container = e.target.closest(".video-container")
    const totalTime = container.querySelector(".total-time")

    totalTime.textContent = formatDuration(video.duration)
  })
})

video.forEach(video => {
  video.addEventListener("timeupdate", e => {
    const container = e.target.closest(".video-container")
    const currentTime = container.querySelector(".current-time")

    currentTime.textContent = formatDuration(video.currentTime)
    const percent = video.currentTime / video.duration
    container.style.setProperty("--progress-position", percent)
  })
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
})
function formatDuration(time) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`
  }
}

// Miniplayer
miniPlayerBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    toggleMiniPlayerMode(e)
  })
})

function toggleMiniPlayerMode(e) {
  const container = e.target.closest(".video-container")
  const video = container.querySelector("video")

  if (container.classList.contains("mini-player-mode")) {
    document.exitPictureInPicture()
  } else {
    video.requestPictureInPicture()
  }
}

document.addEventListener("enterpictureinpicture", e => {
  const container = e.target.closest(".video-container")
  container.classList.add("mini-player-mode")
})

document.addEventListener("leavepictureinpicture", e => {
  const container = e.target.closest(".video-container")
  container.classList.remove("mini-player-mode")
})

// Stream play-pause
playPauseBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    playVideo(e)
  })
})

videoContainer.forEach(container => {
  container.classList.add("paused")
})

function playVideo(e) {
  const videoContainer = e.target.closest(".video-container")
  const video = videoContainer.querySelector("video")
  const playPauseBtn = videoContainer.querySelector(".play-button")

  if (video.paused) {
    video.play()
    videoContainer.classList.add("played")
    videoContainer.classList.remove("paused")
  } else {
    video.pause()
    videoContainer.classList.add("paused")
    videoContainer.classList.remove("played")
  }
}

// Volume

muteBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    const container = e.target.closest(".video-container")
    const video = container.querySelector("video")

    toggleMute(video)
  })
})

videoContainer.forEach(container => {
  const video = container.querySelector("video")
  const volumeSlider = container.querySelector(".volume-slider")

  volumeSlider.addEventListener("input", e => {
    video.volume = e.target.value
    video.muted = e.target.value === 0
  })
})

video.forEach(video => {
  video.addEventListener("volumechange", e => {
    const container = e.target.closest(".video-container")
    const volumeSlider = container.querySelector(".volume-slider")

    volumeSlider.value = video.volume
    let volumeLevel

    if (video.muted || video.volume === 0) {
      volumeSlider.value = 0
      volumeLevel = "muted"
    } else if (video.volume > 0 && video.volume < 0.3) {
      volumeLevel = "low"
    } else if (video.volume >= 0.3 && video.volume < 0.5) {
      volumeLevel = "medium"
    } else if (video.volume >= 0.5) {
      volumeLevel = "high"
    }

    container.dataset.volumeLevel = volumeLevel
  })
})

function toggleMute(video) {
  video.muted = !video.muted
}