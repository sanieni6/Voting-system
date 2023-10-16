import { create } from 'zustand'
import axios from 'axios'

//mediante este endpoint puedo obtener todos los candidatos
export const createCandidateSlice = (set) => ({
    candidates: [],
    getCandidates: async () => {
        try {
        const response = await axios.get('http://54.89.73.83:5000/api/v1/candidates/election/1')
        set({ candidates: response.data })
        } catch (error) {
            console.error(error)
        }
    }
})