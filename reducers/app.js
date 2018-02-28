import {ADD_DATA, EDIT_DATA, DELETE_DATA, DELETE_ALL} from '../constants/ActionTypes'

const initialState = [{
  id: 1,
  name: 'Rubi Henjaya',
  phone: '08112237786'
}]

export default function data(state = initialState, action){
  switch (action.type) {
    case ADD_DATA:
    return [
      {
        id: state.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1,
        name: action.name,
        phone: action.phone
      },
      ...state
    ]
    case DELETE_DATA:
    return state.filter(data => data.id !== action.id)

    case DELETE_ALL:
    return []

    default:
    return state

  }
}
