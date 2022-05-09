interface AnimationState {
  changeQuestion: boolean,
  changeTotalScore: boolean,
  changeScore: boolean,
}

export const initAnimationState: AnimationState = {
  changeQuestion: false,
  changeTotalScore: false,
  changeScore: false,
}

export interface ActionTypes {
  type: string
}

interface StartQChange {
  type: 'CHANGE_Q_START'
}

interface StopQChange {
  type: 'CHANGE_Q_END'
}

interface StartChangeTotalScore {
  type: 'CHANGE_TS_START'
}

interface StopChangeTotalScore {
  type: 'CHANGE_TS_END'
}

interface StartChangeScore {
  type: 'CHANGE_S_START'
}

interface StopChangeScore {
  type: 'CHANGE_S_END'
}

export const CHANGE_Q_START = (): StartQChange => {return {type: 'CHANGE_Q_START'}};
export const CHANGE_Q_END = (): StopQChange => {return {type: 'CHANGE_Q_END'}};
export const CHANGE_TS_START = (): StartChangeTotalScore => {return {type: 'CHANGE_TS_START'}};
export const CHANGE_TS_END = (): StopChangeTotalScore => {return {type: 'CHANGE_TS_END'}};
export const CHANGE_S_START = (): StartChangeScore => {return {type: 'CHANGE_S_START'}};
export const CHANGE_S_END = (): StopChangeScore => {return {type: 'CHANGE_S_END'}};

export const animationStateReducer = (state: AnimationState, action: ActionTypes): AnimationState => {
  const types = {
    'CHANGE_Q_START': (): AnimationState => {return {...state, changeQuestion: true}},
    'CHANGE_Q_END' : (): AnimationState => {return {...state, changeQuestion: false}},
    'CHANGE_TS_START': (): AnimationState => {return {...state, changeTotalScore: true}},
    'CHANGE_TS_END': (): AnimationState => {return {...state, changeTotalScore: false}},
    'CHANGE_S_START': (): AnimationState => {return {...state, changeScore: true}},
    'CHANGE_S_END': (): AnimationState => {return {...state, changeScore: false}}
  }

  return !types[action.type] ? state : types[action.type]();
};
