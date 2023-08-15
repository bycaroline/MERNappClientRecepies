import React from 'react'
import CommentItem from './CommentItem'

const CommentList = (props) => {

    return (
        <div>
            <ul>{
                props.items.map(comment => (
                    <CommentItem
                        key={comment.id}
                        id={comment._id}
                        name={comment.commentCreator.name}
                        commentCreatorId={comment.commentCreator._id}
                        recipeCommentTitle={comment.recipeComment.title}
                        recipeCommentId={comment.recipeComment._id}
                        text={comment.text}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CommentList