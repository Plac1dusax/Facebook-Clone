const video = document.querySelectorAll("video")
const videoContainer = document.querySelectorAll(".video-container")
const playPauseBtn = document.querySelectorAll(".play-pause-button")
const muteBtn = document.querySelectorAll("[data-volume]")

// Play-pause
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
