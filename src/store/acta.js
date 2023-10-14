import axios from "axios";

//mediante este endpoint puedo obtener todos los candidatos
export const createActaSlice = (set) => ({
  votesPerProvince: null,

  //mediante este metodo puedo subir un acta
  postActa: async (data) => {
    try {
    //   const response = await axios.post(
    //     "http://52.200.0.69:5000/api/v1/votes/",
    //     data
    //   );
    const response = await fetch('http://52.200.0.69:5000/api/v1/votes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
      if (response.ok) {
        const data = await response.json();
        console.log(await data);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  },

  //mediante este metodo puedo obtener los votos por provincia
  getVotesPerProvince: async (province) => {
    console.log(province);
    // URL de la solicitud GET
    let url = `http://52.200.0.69:5000/api/v1/votes/?province=${province}`;
    if (province === "Ecuador") {
        url = `http://52.200.0.69:5000/api/v1/votes/`;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(url, config);
      console.log(await response);
      if (response.status === 201) {
        const votes = await response.data;
        set({ votesPerProvince: votes });
        //console.log(await votes);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  },
});
