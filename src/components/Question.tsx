import { ReactNode } from 'react'
import cx from 'classnames'

import '../styles/question.scss'


type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string
  },
  children?: ReactNode, //tipo html jsx 
  isAnswered?: boolean,
  isHighlighted?: boolean
}

export function Question(props: QuestionProps) {
  // props.isAnswered = false 
  // props.isHighlighted = false
  return(
    <div className={cx(
      'question',
      { answered: props.isAnswered},
      { highlighted: props.isHighlighted && !props.isAnswered}
    )}>
      <p>{props.content}</p>
      <footer>
        <div className="user-info">
          <img src={props.author.avatar} alt={props.author.name}/>
          <span>{props.author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer> 
    </div>
  )
}