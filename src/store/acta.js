import axios from 'axios'

//mediante este endpoint puedo obtener todos los candidatos
export const createActa = (set) => ({
    votesPerProvince: null,

    //mediante este metodo puedo subir un acta
    postActa: async (data) => {
        try {
            const response = await axios.post('http://52.200.0.69:5000/api/v1/votes/', data)
            if (response.ok) {
                return true
            }
        } catch (error) {
            console.error(error)
        }
    },

    //mediante este metodo puedo obtener los votos por provincia
    getVotesPerProvince: async (province) => {
        try {
            const response = await axios.get(`http://52.200.0.69:5000/api/v1/votes/${province}`)
            if (response.ok) {
                set({ votesPerProvince: response.data })
            }
        } catch (error) {
            console.error(error)
        }
    }

    
})