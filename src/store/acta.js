import axios from "axios";

//mediante este endpoint puedo obtener todos los candidatos
export const createActaSlice = (set) => ({
  votesPerProvince: null,
  votersTotal: null,
  votesTotal: null,
  votesInfo: null,
  //mediante este metodo puedo subir un acta
  postActa: async (data) => {
    try {
    const response = await fetch('http://54.89.73.83:5000/api/v1/votes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
      if (response.ok) {
        const data = await response.json();
        //console.log(await data);
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
    let url = `http://54.89.73.83:5000/api/v1/votes/?province=${province['province']}&only_quick_count=${province['quick_count']}`;
    if (province['province'] === "Ecuador") {
        url = `http://54.89.73.83:5000/api/v1/votes/?only_quick_count=${province['quick_count']}`;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(url, config);
      //console.log(await response);
      if (response.status === 200) {
        const votes = await response.data;
        set({ votesPerProvince: votes['candidates_result'] });
        set({ votersTotal: votes['voters_total'] });
        set({ votesTotal: votes['votes_total'] });
        set({ votesInfo: votes['votes_info'] });
        console.log(await votes);
        console.log(await votes['votes_info']);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  },
});
