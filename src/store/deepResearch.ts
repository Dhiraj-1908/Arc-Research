import {create} from "zustand"

interface DeepResearchState{
    topic: string,
    questions: string[],
    answers: string[],
    currentQuestion: number,
    isCompleted: boolean,
    isLoading: boolean,

}

interface DeepResearchActions{
    setTopic: (topic: string) => void,
    setQuestions: (questions: string[]) => void,
    setAnswer: (answers: string[]) => void,
    setCurrentQuestion: (index: number) => void,
    setIsCompleted: (isCompleted: boolean) => void
    setIsLoading: (isLoading: boolean) => void

}

const intialState: DeepResearchState ={
    topic: "",              //state
    questions: [],           
    answers: [],
    currentQuestion: 0,
    isCompleted: false,
    isLoading: false,
}

// we have created a store using zustand which have some set of  states and methods 
export const useDeepResearchStore = create<DeepResearchState & DeepResearchActions>((set) => ({
    ...intialState,
    setTopic: (topic: string) => set({topic}),                 // set of methods to chnage state
    setQuestions: (questions: string[]) => set({questions}),
    setAnswer: (answers: string[]) => set({answers}),
    setCurrentQuestion: (currentQuestion: number) => set({currentQuestion}),
    setIsCompleted: (isCompleted: boolean) => set({isCompleted}),
    setIsLoading: (isLoading: boolean) => set({isLoading}),

}));

