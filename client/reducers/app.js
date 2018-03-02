import {ADD_DATA, EDIT_DATA, DELETE_DATA, DELETE_ALL, LOAD_PHONEBOOKS_SUCESS, LOAD_PHONEBOOKS_FAILURE, ADD_PHONEBOOKS_SUCESS, ADD_PHONEBOOKS_FAILURE} from '../constants/ActionTypes'

export default function data(state = [], action){
  switch (action.type) {
    case ADD_PHONEBOOKS_SUCESS:
    let phonebooks = state
    let idObject = phonebooks.map(function(x){
      return x.id
    }).indexOf(parseInt(action.phonebook.id))
    if(idObject > -1){
      return state
    }else{
      return [action.phonebook, ...state]
    }
    case LOAD_PHONEBOOKS_SUCESS:
    return action.phonebooks
    case ADD_DATA:
    return [
      {
        id: action.id,
        name: action.name,
        phone: action.phone
      },
      ...state
    ]
    case EDIT_DATA:
    return state.map(data => data.id === action.id ? Object.assign({}, data, {name: action.name, phone: action.phone}) : data)
    case DELETE_DATA:
    return state.filter(data => data.id !== action.id)

    case DELETE_ALL:
    return []

    case LOAD_PHONEBOOKS_FAILURE:
    return state

    default:
    return state

  }
}
