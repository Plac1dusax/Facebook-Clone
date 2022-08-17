const hideDefaultShortcuts = document.querySelectorAll(".hide-default")
const hideCustomShortcuts = document.querySelectorAll(".hide-custom")
const showMoreDefaultButton = document.querySelector(".show-more-btn-default")
const showLessDefaultButton = document.querySelector(".show-less-btn-default")
const showMoreCustomButton = document.querySelector(".show-more-btn-custom")
const showLessCustomButton = document.querySelector(".show-less-btn-custom")
const randomShortcutsSection = document.querySelector("[data-custom-shortcuts]")
const customEditButton = document.querySelector(".edit")
const emotionsContainer = document.querySelector(".emotions-container")
const reactions = document.querySelector(".reactions")
const communityReaction = document.querySelectorAll(".community-reaction")
const likeButton = document.querySelector(".reaction-like")
const reactionLikeBtn = document.querySelector(".reaction-emoji-btn")
const likeBtnText = document.querySelector(".like-btn-text")
let likeCounter = parseInt(document.querySelector(".like-counter").textContent)
const totalLikes = document.querySelector(".like-counter")
const emojis = document.querySelectorAll(".emoji")
const posts = document.querySelectorAll(".post")

for (let i = 0; i < posts.length; i++) {
  posts[i].dataset.id = i
}

async function getLikes() {
  let response = await fetch("posts.json")

  const likes = await response.json()

  return likes
}
async function renderLikes() {
  let likes = await getLikes()

  for (let i = 0; i < posts.length; i++) {
    posts.forEach(post => {
      if (post.dataset.id == likes[i].id) {
        if (likes[i].like !== 0) {
          const reaction = post.querySelector(".community-reaction-like")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-like")
          reaction.classList.add("hide")
        }
        if (likes[i].love !== 0) {
          const reaction = post.querySelector(".community-reaction-love")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-love")
          reaction.classList.add("hide")
        }
        if (likes[i].care !== 0) {
          const reaction = post.querySelector(".community-reaction-care")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-care")
          reaction.classList.add("hide")
        }
        if (likes[i].smile !== 0) {
          const reaction = post.querySelector(".community-reaction-smile")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-smile")
          reaction.classList.add("hide")
        }
        if (likes[i].wow !== 0) {
          const reaction = post.querySelector(".community-reaction-wow")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-wow")
          reaction.classList.add("hide")
        }
        if (likes[i].sad !== 0) {
          const reaction = post.querySelector(".community-reaction-sad")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-sad")
          reaction.classList.add("hide")
        }
        if (likes[i].angry !== 0) {
          const reaction = post.querySelector(".community-reaction-angry")
          reaction.classList.remove("hide")
        } else {
          const reaction = post.querySelector(".community-reaction-angry")
          reaction.classList.add("hide")
        }
      }
    })
  }
}

async function handleLike() {
  let likes = await getLikes()

  emojis.forEach(emoji => {
    emoji.addEventListener("click", e => {
      addAnimation(
        e,
        "[data-reaction-like]",
        "like",
        "Like",
        "blue",
        "like-btn-like",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-love]",
        "love",
        "Love",
        "purple",
        "like-btn-love",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-care]",
        "care",
        "Care",
        "orange",
        "like-btn-care",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-smile]",
        "smile",
        "Smile",
        "orange",
        "like-btn-smile",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-wow]",
        "wow",
        "Wow",
        "orange",
        "like-btn-wow",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-sad]",
        "sad",
        "Sad",
        "orange",
        "like-btn-sad",
        likes
      )
      addAnimation(
        e,
        "[data-reaction-angry]",
        "angry",
        "Angry",
        "red",
        "like-btn-angry",
        likes
      )
    })
  })
}

handleLike()
renderLikes()

async function logLikes() {
  let likes = await getLikes()
  console.log(likes)
}

logLikes()
function addAnimation(e, dataAttribute, emoji, text, color, className, likes) {
  if (e.target.matches(dataAttribute)) {
    let postId =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.dataset.id

    let total = likes[postId][emoji]
    likes[postId][emoji] = total + 1
    console.log(likes[postId][emoji])
    playAnimation(text, color, className)
  }
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

function playAnimation(text, color, animation) {
  likeBtnText.textContent = text
  likeBtnText.style.color = color

  reactionLikeBtn.removeAttribute("class")
  emotionsContainer.classList.add("hide")
  reactionLikeBtn.classList.add("reaction-emoji-btn")
  window.requestAnimationFrame(function () {
    reactionLikeBtn.classList.add(animation)
  })
}
