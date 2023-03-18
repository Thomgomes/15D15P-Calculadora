import { ACTIONS } from "../container/Calculator"

export const Btns = ({ dispatch, digit }) => {
  return (
    <>
      <button className="bg-[gray] rounded-lg border border-white/20 min-w-[60px] min-h-[60px] transition-all duration-75 hover:bg-gray-400 focus:bg-gray-400"
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      >
        {digit}
      </button>
    </>
  )
}