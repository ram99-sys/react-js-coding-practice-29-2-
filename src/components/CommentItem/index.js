import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {username, comment, time, initialLetter, id, isLiked} = commentDetails
  const getInitial = username.slice(0, 1).toUpperCase()
  const onClickLikeButton = () => {
    toggleIsLiked(id)
  }

  const onClickDeleteComment = () => {
    deleteComment(id)
  }
  const postedTime = formatDistanceToNow(time)
  const isLikedText = isLiked ? 'apply-color' : ''
  const isLikedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li>
      <div className="initial-username-container">
        <p className={`initial ${initialLetter}`}>{getInitial}</p>
        <p className="username">{username}</p>
        <p className="time">{postedTime} ago</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="likes-container">
        <div>
          <img src={isLikedImage} className="like-image" alt="like" />
          <button
            type="button"
            className={`button ${isLikedText}`}
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDeleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
