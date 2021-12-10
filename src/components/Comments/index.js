import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {username: '', comment: '', commentsList: [], commentsCount: 0}

  onChangeNameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const newCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: newCommentsList})
    this.setState(prevState => ({commentsCount: prevState.commentsCount - 1}))
  }

  addComment = event => {
    event.preventDefault()
    const {username, comment} = this.state
    const initialBackgroundClassNames =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: uuidv4(),
      username,
      comment,
      isLiked: false,
      time: new Date(),
      initialLetter: initialBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
    this.setState(prevState => ({commentsCount: prevState.commentsCount + 1}))
  }

  render() {
    const {commentsList, commentsCount, username, comment} = this.state
    return (
      <div className="app-container">
        <h1 className="comments-heading">Comments</h1>
        <div className="comments-container">
          <div className="form-container">
            <form onSubmit={this.addComment}>
              <p className="text">Say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
                value={username}
                onChange={this.onChangeNameInput}
              />
              <br />
              <textarea
                rows="8"
                cols="28"
                className="textarea-input-field"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeCommentInput}
              />
              <br />
              <button type="submit" className="submit-button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image-sizing"
            />
          </div>
        </div>
        <hr className="seperator" />

        <div className="comments-count">
          <p className="count">{commentsCount}</p>
          <p className="count-text">Comments</p>
        </div>
        <ul className="comments-list-container">
          {commentsList.map(eachComment => (
            <CommentItem
              commentDetails={eachComment}
              key={eachComment.id}
              toggleIsLiked={this.toggleIsLiked}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
