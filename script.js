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
const totalLikes = document.querySelector(".like-counter")
const emojis = document.querySelectorAll(".emoji")
const posts = document.querySelectorAll(".post")
const replyNotification = document.querySelectorAll(".reply-notification")
const replyButton = document.querySelectorAll(".comment-reaction-reply")
const userCommentText = document.querySelectorAll(".user-comment-text")
const sameCommentLine = document.querySelector("#same-command")
const repliesSection = document.querySelectorAll(".replies-section")
const userCommentInput = document.querySelectorAll(".user-comment-input")
const commentTemplate = document.querySelector("#comment-template")
const replyCommentTemplate = document.querySelector("#reply-comment-template")
const repliedReplyTemplate = document.querySelector("#replied-reply-template")
const postCommentInput = document.querySelectorAll(".post-comment")
const commentReaction = document.querySelectorAll(".comment-reaction-like")
let handleLikeExecute = false

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

      if (handleLikeExecute === false) {
        handleTotalLikes(e)
      } else {
        decreaseTotalLikes(e)
      }

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
      if (handleLikeExecute === false) {
        handleTotalLikes(e)
      } else {
        decreaseTotalLikes(e)
      }
    } else if (!e.target.matches("[data-reaction-emoji]")) {
      buttonText.textContent === "Like"
      buttonText.style.color = "inherit"

      reactionBtn.removeAttribute("class")
      reactionBtn.classList.add("reaction-emoji-btn")
      reactionBtn.classList.add("like-btn")
      handleReaction(e, "data-reaction-like")
      if (handleLikeExecute === false) {
        handleTotalLikes(e)
      } else {
        decreaseTotalLikes(e)
      }
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

    if (handleLikeExecute === false) {
      handleTotalLikes(e)
    } else {
      decreaseTotalLikes(e)
    }
  })
}

postCommentInput.forEach(comment => {
  comment.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      const value = comment.value
      const container = e.target.closest(".comment-section")
      const replyContainer = container.querySelector(".replies-container")
      const commentContainer = replyCommentTemplate.content.cloneNode(true)

      const input = commentContainer.querySelector("[data-comment]")
      input.textContent = value

      replyContainer.appendChild(commentContainer)
    }
  })
})

document.addEventListener("click", e => {
  if (
    e.target.matches(".reply-notification") ||
    e.target.matches(".reply-logo") ||
    e.target.matches(".reply-notification-text")
  ) {
    const container = e.target.closest(".reply")
    const repliedMessage = container.querySelector(".replies-container-replied")
    const replyNotification = container.querySelector(".reply-notification")

    repliedMessage.classList.remove("hide")
    replyNotification.style.display = "none"
  }

  if (e.target.matches(".comment-reaction-reply")) {
    const container = e.target.closest(".reply")
    const userInput = container.querySelector(".user-comment-reply")
    const notification = container.querySelector(".reply-notification")

    userInput.style.display = ""
  }
})

replyButton.forEach(button => {
  button.addEventListener("click", e => {
    const container = e.target.closest(".reply")
    const userInputArea = container.querySelector(".user-comment-reply")
    userInputArea.style.display = ""
  })
})

document.addEventListener("click", e => {
  const post = e.target.closest(".post")
  if (e.target.matches(".user-comment-input")) {
    const inputArea = e.target

    inputArea.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        const value = inputArea.value
        const container = e.target.closest(".reply")

        if (container != null) {
          const userInputArea = container.querySelector(".user-comment-reply")
          const replyContainer = container.querySelector(
            ".replies-container-replied"
          )
          inputArea.value = ""

          if (replyContainer != null) {
            const replyComment = replyCommentTemplate.content.cloneNode(true)

            const input = replyComment.querySelector("[data-comment]")
            input.textContent = value

            replyContainer.appendChild(replyComment)
          }

          if (replyContainer == null) {
            const repliedReplyContainer =
              repliedReplyTemplate.content.cloneNode(true)

            const input = repliedReplyContainer.querySelector("[data-comment]")
            input.textContent = value
            console.log(container)
            container.appendChild(repliedReplyContainer)
          }
          inputArea.value = ""
          userInputArea.style.display = "none"
        }
        showCommentCounter(post)

        inputArea.value = ""
      }
    })
  }
})

commentReaction.forEach(react => {
  react.addEventListener("mouseenter", e => {
    const container = e.target.closest(".profile-picture-and-content")
    const emotions = container.querySelector(".emotions-container-comment")

    emotions.classList.remove("hide")
  })

  react.addEventListener("mouseleave", e => {
    const container = e.target.closest(".profile-picture-and-content")
    const emotions = container.querySelector(".emotions-container-comment")

    emotions.classList.add("hide")
  })

  react.addEventListener("click", e => {
    if (e.target.matches(".comment-reaction-like-text")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-like",
        "Like",
        "blue"
      )
    }

    if (e.target.matches("[data-reaction-like]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-like",
        "Like",
        "blue"
      )
    }

    if (e.target.matches("[data-reaction-love]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-love",
        "Love",
        "pink"
      )
    }

    if (e.target.matches("[data-reaction-care]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-care",
        "Care",
        "orange"
      )
    }

    if (e.target.matches("[data-reaction-smile]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-smile",
        "HaHa",
        "orange"
      )
    }

    if (e.target.matches("[data-reaction-wow]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-wow",
        "Wow",
        "orange"
      )
    }

    if (e.target.matches("[data-reaction-sad]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-sad",
        "Sad",
        "orange"
      )
    }

    if (e.target.matches("[data-reaction-angry]")) {
      commentReact(
        e,
        ".comment-like-btn-container",
        ".community-reaction-angry",
        "Angry",
        "red"
      )
    }
  })
})

function commentReact(e, selectedEmojiContainer, selectedEmoji, text, color) {
  const container = e.target.closest(".content")
  const emojiContainer = container.querySelector(selectedEmojiContainer)
  const emoji = container.querySelector(selectedEmoji)
  let likeText = container.querySelector(".comment-reaction-like-text")
  let likeCounter = container.querySelector(".comment-like-counter")

  if (likeText.style.color != "") {
    likeCounter.textContent = parseInt(likeCounter.textContent) - 1
    likeText.style.color = ""
    likeText.textContent = "Like"

    container.querySelectorAll("[data-reaction-class]").forEach(reaction => {
      if (!reaction.classList.contains("community-reaction-like")) {
        reaction.classList.add("hide")
      }

      if (likeCounter.textContent == 0) {
        emoji.classList.add("hide")
        likeCounter.classList.add("hide")
      }
    })
  } else {
    likeText.textContent = text
    likeText.style.color = color

    emojiContainer.classList.remove("hide")
    emoji.classList.remove("hide")
    likeCounter.textContent = parseInt(likeCounter.textContent) + 1
  }
}

posts.forEach(post => {
  showCommentCounter(post)
})

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
    handleReaction(e, dataAttribute)
    playAnimation(e, dataAttribute, text, color, animation)
  }
}

function handleReaction(e, dataAttribute) {
  const postContainer = e.target.closest(".post-container")
  const reactionsContainer = postContainer.querySelector(".reactions")

  switch (dataAttribute) {
    case "data-reaction-like":
      removeReactions(postContainer)
      showReaction(
        postContainer,
        reactionsContainer,
        ".community-reaction-like"
      )
      break

    case "data-reaction-love":
      removeReactions(postContainer)
      showReaction(
        postContainer,
        reactionsContainer,
        ".community-reaction-love"
      )
      break

    case "data-reaction-care":
      removeReactions(postContainer)
      showReaction(
        postContainer,
        reactionsContainer,
        ".community-reaction-care"
      )
      break

    case "data-reaction-wow":
      removeReactions(postContainer)
      showReaction(postContainer, reactionsContainer, ".community-reaction-wow")
      break

    case "data-reaction-smile":
      removeReactions(postContainer)
      showReaction(
        postContainer,
        reactionsContainer,
        ".community-reaction-smile"
      )
      break

    case "data-reaction-sad":
      removeReactions(postContainer)
      showReaction(postContainer, reactionsContainer, ".community-reaction-sad")
      break

    case "data-reaction-angry":
      removeReactions(postContainer)
      showReaction(
        postContainer,
        reactionsContainer,
        ".community-reaction-angry"
      )
      break
  }
}

function removeReactions(postContainer) {
  const reactions = postContainer.querySelectorAll("[data-reaction-class]")
  reactions.forEach(reaction => {
    if (!reaction.classList.contains("community-reaction-like")) {
      reaction.classList.add("hide")
    }
  })
}

function showReaction(postContainer, reactionsContainer, className) {
  reactionsContainer.querySelector(className).classList.remove("hide")
}

function showCommentCounter(post) {
  const commentsContainer = post.querySelector(".replies-container")
  const totalComments = commentsContainer.querySelectorAll(".reply")
  const commentCounter = post.querySelector(".comments")

  if (totalComments.length < 1) {
    commentCounter.classList.add("hide")
  }

  if (totalComments.length === 1) {
    commentCounter.classList.remove("hide")
    commentCounter.textContent = "1 comment"
  }

  if (totalComments.length > 1) {
    commentCounter.classList.remove("hide")
    commentCounter.textContent = `${totalComments.length} comments`
  }
}

function handleTotalLikes(e) {
  const container = e.target.closest(".post")
  const likeCounter = container.querySelector(".like-counter")
  const number = parseInt(likeCounter.textContent)

  likeCounter.textContent = number + 1

  handleLikeExecute = true
}

function decreaseTotalLikes(e) {
  const container = e.target.closest(".post")
  const likeCounter = container.querySelector(".like-counter")
  const number = parseInt(likeCounter.textContent)

  if (e.target.matches("[data-reaction-emoji]")) return

  likeCounter.textContent = number - 1

  handleLikeExecute = false
}
