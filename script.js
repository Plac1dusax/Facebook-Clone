const hideDefaultShortcuts = document.querySelectorAll(".hide-default")
const hideCustomShortcuts = document.querySelectorAll(".hide-custom")
const showMoreDefaultButton = document.querySelector(".show-more-btn-default")
const showLessDefaultButton = document.querySelector(".show-less-btn-default")
const showMoreCustomButton = document.querySelector(".show-more-btn-custom")
const showLessCustomButton = document.querySelector(".show-less-btn-custom")
const randomShortcutsSection = document.querySelector("[data-custom-shortcuts]")
const customEditButton = document.querySelector(".edit")
const emotionsContainer = document.querySelector(".emotions-container")
const likeButton = document.querySelector(".reaction-like")
const reactionLikeBtn = document.querySelector(".reaction-btn-like")
const emojis = document.querySelectorAll(".emoji")

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

likeButton.addEventListener("mouseenter", () => {
  emotionsContainer.classList.remove("hide")
  emotionsContainer.style.transform = "translateY'(-10%)'"
})

likeButton.addEventListener("mouseleave", () => {
  emotionsContainer.classList.add("hide")
})

emotionsContainer.addEventListener("mouseenter", () => {
  emotionsContainer.classList.remove("hide")
})

emotionsContainer.addEventListener("mouseleave", () => {
  emotionsContainer.classList.remove("hide")
})

likeButton.addEventListener("click", () => {
  reactionLikeBtn.removeAttribute("class")
  emotionsContainer.classList.add("hide")
  reactionLikeBtn.classList.add("reaction-btn")
  window.requestAnimationFrame(function () {
    reactionLikeBtn.classList.add("like-btn-like")
  })
})

emojis.forEach(emoji => {
  emoji.addEventListener("click", e => {
    if (e.target.matches("[data-reaction-like]")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-like")
      })
    } else if (e.target.matches("[data-reaction-love]")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-love")
      })
    } else if (e.target.matches("[data-reaction-care")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-care")
      })
    } else if (e.target.matches("[data-reaction-smile")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-smile")
      })
    } else if (e.target.matches("[data-reaction-wow")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-wow")
      })
    } else if (e.target.matches("[data-reaction-sad")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-sad")
      })
    } else if (e.target.matches("[data-reaction-angry")) {
      reactionLikeBtn.removeAttribute("class")
      emotionsContainer.classList.add("hide")
      reactionLikeBtn.classList.add("reaction-btn")
      window.requestAnimationFrame(function () {
        reactionLikeBtn.classList.add("like-btn-angry")
      })
    }
  })
})
