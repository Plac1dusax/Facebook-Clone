const videoContainer = document.querySelectorAll(".video-container")
const video = document.querySelectorAll("video")
const playBtn = document.querySelectorAll(".play-button")

playBtn.forEach(btn => {
  btn.addEventListener("click", e => {
    playVideo(e)
  })
})

function playVideo(e) {
  const videoContainer = e.target.closest(".video-container")
  const video = videoContainer.querySelector("video")
  const playBtn = videoContainer.querySelector(".play-button")

  video.play()
  playBtn.style.display = "none"
}
