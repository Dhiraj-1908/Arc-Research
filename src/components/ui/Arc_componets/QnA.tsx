import { useDeepResearchStore } from '@/store/deepResearch'
import React from 'react'
import QuestionForm from './QuestionForm';

const QnA = () => {

    const {questions} = useDeepResearchStore();

    if(questions.length === 0) return null;

  return (
    <div>
        <QuestionForm/>
    </div>
  )
}

export default QnA