import { useReducer } from "react"
import { Btns } from "../components/DigitButtons"
import { OperationsBtns } from "../components/OperationsButtons"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

export const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
      <div className="m-0 w-72 text-center border-8 border-[#003c6b] bg-[#003c6b] rounded-lg">

        <div className="flex mb-2 min-h-[120px] rounded bg-[#042d4dc4] flex-col items-end justify-around p-3 break-words break-all">
          <div className="text-white/70 text-base">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="text-white text-2xl">{formatOperand(currentOperand)}</div>
        </div>

        <div className="text-white grid grid-cols-4 gap-1">
          <button
            className="col-span-2 rounded-lg border border-white/20 bg-red-400 min-w-[60px] min-h-[60px] transition-all duration-75 hover:bg-red-300 focus:bg-red-300"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            C
          </button>
          <button
            className="bg-red-300/80 rounded-lg border border-white/20 min-w-[60px] min-h-[60px] transition-all duration-75 hover:bg-red-200/80 focus:bg-red-200/80"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
            DEL
          </button>
          
          <OperationsBtns operation="÷" dispatch={dispatch} />
          <Btns digit="7" dispatch={dispatch} />
          <Btns digit="8" dispatch={dispatch} />
          <Btns digit="9" dispatch={dispatch} />
          <OperationsBtns operation="*" dispatch={dispatch} />
          <Btns digit="4" dispatch={dispatch} />
          <Btns digit="5" dispatch={dispatch} />
          <Btns digit="6" dispatch={dispatch} />
          <OperationsBtns operation="+" dispatch={dispatch} />
          <Btns digit="1" dispatch={dispatch} />
          <Btns digit="2" dispatch={dispatch} />
          <Btns digit="3" dispatch={dispatch} />
          <OperationsBtns operation="-" dispatch={dispatch} />
          <Btns digit="." dispatch={dispatch} />
          <Btns digit="0" dispatch={dispatch} />
          <button
            className="col-span-2 rounded-lg border border-white/20 bg-blue-400 min-w-[60px] min-h-[60px] transition-all duration-75 hover:bg-blue-300 focus:bg-blue-300"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
        </div>

      </div>

  )
}