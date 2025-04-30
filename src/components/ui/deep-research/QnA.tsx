import { useDeepResearchStore } from '@/store/deepResearch'
import React, { useEffect } from 'react'
import QuestionForm from './QuestionForm';
import {useChat} from '@ai-sdk/react'

const QnA = () => {

    const {questions, isCompleted, topic , answers  } = useDeepResearchStore();

    const {append} = useChat({
      api: "/api/deep-research"
    });

    useEffect(() => {
      if(isCompleted && questions.length > 0){

      const clarifications = questions.map((question, index) => ({
        question: question,
        answer: answers[index]
      }))

    append({
      role: "user",
      content: JSON.stringify({
        topic: topic,
        clarifications: clarifications
      })
    })

      }
    }, [isCompleted, questions, answers, topic, append])

    //if(questions.length === 0) return null;

  return (
    <div>
        <QuestionForm/>
    </div>
  )
}

export default QnA