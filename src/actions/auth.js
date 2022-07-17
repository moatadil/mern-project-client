import * as api from '../api'
import { AUTH } from '../constants/actionTypes'

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        const action = { type: AUTH, data }
        dispatch(action)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}
export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        const action = { type: AUTH, data }
        dispatch(action)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}