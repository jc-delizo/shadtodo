import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";


export const useTodosContext = () => {
    const context = useContext(TodosContext)

    if (!context) {
        throw Error('useContext Error') 
    }

    return context
}