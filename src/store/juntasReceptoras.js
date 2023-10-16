import axios from 'axios'

//mediante este endpoint puedo obtener todos los candidatos
export const createJuntasReceptorasSlice = (set) => ({
    juntasReceptoras: [],
    junta: null,
    //Mediante esta función obtengo todas las juntas receptoras
    getTodasJuntas: async () => {
        try {
        const response = await axios.get('http://54.89.73.83:5000/api/v1/central_electorals/')
        set({ juntasReceptoras: response.data })
        } catch (error) {
            console.error(error)
        }
    },
    //Mediante esta función obtengo una junta receptora en específico, necesito proporcionar el id de la junta
    getJunta: async (id) => {
        try {
        const response = await axios.get(`http://54.89.73.83:5000/api/v1/central_electorals/${id}`)
        set({ junta: response.data })
        } catch (error) {
            console.error(error)
        }
    }
})