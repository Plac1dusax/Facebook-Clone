const hideDefaultShortcuts = document.querySelectorAll(".hide-default")
const hideCustomShortcuts = document.querySelectorAll(".hide-custom")
const showMoreDefaultButton = document.querySelector(".show-more-btn-default")
const showLessDefaultButton = document.querySelector(".show-less-btn-default")
const showMoreCustomButton = document.querySelector(".show-more-btn-custom")
const showLessCustomButton = document.querySelector(".show-less-btn-custom")
const randomShortcutsSection = document.querySelector("[data-custom-shortcuts]")
const customEditButton = document.querySelector(".edit")
const emotionsContainer = document.querySelectorAll(".emotions-container")
const reactions = document.querySelector(".reactions")
const communityReaction = document.querySelectorAll(".community-reaction")
const likeButton = document.querySelectorAll(".reaction-like")
const reactionLikeBtn = document.querySelector(".reaction-emoji-btn")
const likeBtnText = document.querySelector(".like-btn-text")
let likeCounter = parseInt(document.querySelector(".like-counter").textContent)
const totalLikes = document.querySelector(".like-counter")
const emojis = document.querySelectorAll(".emoji")
const posts = document.querySelectorAll(".post")

for (let i = 0; i < posts.length; i++) {
  posts[i].dataset.id = i
}

hideDefaultShortcuts.forEach(shortcut => {
  shortcut.classList.add("hide")
})

showMoreDefaultButton.addEventListener("click", () => {
  hideDefaultShortcuts.forEach(shortcut => {
    shortcut.classList.remove("hide")
  })

  showMoreDefaultButton.classList.add("hide")
  showLessDefaultButton.classList.remove("hide")
})

showLessDefaultButton.addEventListener("click", () => {
  hideDefaultShortcuts.forEach(shortcut => {
    shortcut.classList.add("hide")
  })

  showLessDefaultButton.classList.add("hide")
  showMoreDefaultButton.classList.remove("hide")
})

showMoreCustomButton.addEventListener("click", () => {
  hideCustomShortcuts.forEach(shortcut => {
    shortcut.classList.remove("hide")

    showMoreCustomButton.classList.add("hide")
    showLessCustomButton.classList.remove("hide")
  })
})

showLessCustomButton.addEventListener("click", () => {
  hideCustomShortcuts.forEach(shortcut => {
    shortcut.classList.add("hide")

    showLessCustomButton.classList.add("hide")
    showMoreCustomButton.classList.remove("hide")
  })
})

randomShortcutsSection.addEventListener("mouseover", () => {
  customEditButton.classList.remove("hide")
})

randomShortcutsSection.addEventListener("mouseleave", () => {
  customEditButton.classList.add("hide")
})

for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener("mouseenter", () => {
    emotionsContainer[i].classList.remove("hide")
    emotionsContainer[i].style.transform = "translateY'(-10%)"
  })

  likeButton[i].addEventListener("mouseleave", () => {
    emotionsContainer[i].classList.add("hide")
  })

  likeButton[i].addEventListener("click", e => {
    const button = e.target.closest("[data-like-btn]")
    const reactionBtn = button.querySelector("[data-reaction]")
    const buttonText = button.querySelector("[data-like-btn-text]")

    if (
      !reactionBtn.classList.contains("reacted") &&
      buttonText.textContent === "Like"
    ) {
      buttonText.style.color = "blue"

      reactionBtn.removeAttribute("class")
      reactionBtn.classList.add("reacted")
      reactionBtn.classList.add("reaction-btn-like")
      reactionBtn.classList.add("reaction-emoji-btn")
      reactionBtn.classList.add("like-btn-like")
    } else if (
      reactionBtn.classList.contains("reacted") &&
      buttonText.textContent === "Like"
    ) {
      buttonText.style.color = "inherit"

      reactionBtn.removeAttribute("class")
      reactionBtn.classList.add("reaction-emoji-btn")
      reactionBtn.classList.add("like-btn")
    } else if (!e.target.matches("[data-reaction-emoji]")) {
      buttonText.textContent === "Like"
      buttonText.style.color = "inherit"

      reactionBtn.removeAttribute("class")
      reactionBtn.classList.add("reaction-emoji-btn")
      reactionBtn.classList.add("like-btn")
    }

    if (buttonText.style.color === "inherit") {
      buttonText.textContent = "Like"
    }
  })

  emotionsContainer[i].addEventListener("click", e => {
    addAnimation(e, "data-reaction-like", "Like", "blue", "like-btn-like")
    addAnimation(e, "data-reaction-love", "Love", "purple", "like-btn-love")
    addAnimation(e, "data-reaction-care", "Care", "orange", "like-btn-care")
    addAnimation(e, "data-reaction-smile", "Smile", "orange", "like-btn-smile")
    addAnimation(e, "data-reaction-wow", "Wow", "orange", "like-btn-wow")
    addAnimation(e, "data-reaction-sad", "Sad", "orange", "like-btn-sad")
    addAnimation(e, "data-reaction-angry", "Angry", "red", "like-btn-angry")
  })
}

function playAnimation(e, dataAttribute, text, color, animation) {
  const button = e.target.closest("[data-like-btn]")
  const reactionBtn = button.querySelector("[data-reaction]")
  const buttonText = button.querySelector("[data-like-btn-text]")
  buttonText.textContent = text
  buttonText.style.color = color

  e.target.closest("[data-emotions]").classList.add("hide")

  window.requestAnimationFrame(function () {
    reactionBtn.removeAttribute("class")
    reactionBtn.classList.add("reacted")
    reactionBtn.classList.add("reaction-emoji-btn")
    reactionBtn.classList.add(animation)
  })
}

function addAnimation(e, dataAttribute, text, color, animation) {
  if (e.target.hasAttribute(dataAttribute)) {
    playAnimation(e, dataAttribute, text, color, animation)
  }
}
