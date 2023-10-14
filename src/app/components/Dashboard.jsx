"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import { useForm } from "react-hook-form";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const Dashboard = () => {
  const router = useRouter();
  const [provincia, setProvincia] = useState("");
  const [candidatos, setCandidatos] = useState([
    "Daniel Noboa",
    "Fernando Villavicencio",
    "Luisa Gonzalez",
  ]);
  const [serie, setSerie] = useState([1, 6, 3]);
  const {
    isLoggedIn,
    getTodasJuntas,
    juntasReceptoras,
    getVotesPerProvince,
    votesPerProvince,
  } = useStore();
  useEffect(() => {
    getTodasJuntas();
    console.log(votesPerProvince);
    if (votesPerProvince) {
      reloadCharts();
    }
  }, [votesPerProvince]);

  const reloadCharts = () => {
    let candidatos = [];
    let serie = [];
    votesPerProvince.forEach((element) => {
      candidatos.push(element.candidate.name);
      serie.push(element.votes.percentage);
    });
    setCandidatos(candidatos);
    setSerie(serie);
  };

  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
  };

  const handleFormSubmit = (formData) => {
    getVotesPerProvince(formData.provincia);
    console.log(formData);
    console.log(votesPerProvince);
    return true;
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <section className="flex flex-col">
      <div className="flex justify-between">
        {/*first container: province selector*/}
        <div className="flex flex-col justify-center items-center">
          <h2 className=" bg-gray-200 p-5">Presidente/a</h2>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth className="w-[150px]">
                      <InputLabel
                        id="provincia-select-label"
                        className="w-[150px]"
                      >
                        Provincia
                      </InputLabel>
                      <Select
                        labelId="provincia"
                        id="provincia"
                        value={provincia}
                        label="provincia"
                        {...register("provincia", { required: true })}
                        onChange={handleChangeProvincia}
                        className="w-[150px]"
                      >
                        <MenuItem value={"Ecuador"}>Ecuador</MenuItem>
                        {juntasReceptoras.map((junta) => {
                          return (
                            <MenuItem key={junta.id} value={junta.province}>
                              {junta.province}{" "}
                            </MenuItem>
                          );
                        })}
                        {/* 
                        <MenuItem value={20}>Guayas</MenuItem>
                        <MenuItem value={30}>Esmeraldas</MenuItem> */}
                      </Select>
                      {errors.provincia && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className={"bg-blue-500"}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Container>
          <div>
            <ul className="flex gap-4">
              <li className="p-2 border-2 border-solid">
                <h4>Sufragantes</h4>
                <h6>10812321</h6>
              </li>
              <li className="p-2 border-2 border-solid">
                <h4>Ausentismo</h4>
                <h6>10812321</h6>
              </li>
              <li className="p-2 border-2 border-solid">
                <h4>Electores</h4>
                <h6>10812321</h6>
              </li>
            </ul>
          </div>
        </div>

        {/*second container: votes and actas*/}
        <div className="flex justify-center items-center">
          {/*first container: votes pie*/}
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Votos Válidos" },
                    { id: 1, value: 15, label: "Votos Blancos" },
                    { id: 2, value: 20, label: "Votos Nulos" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>

          {/*second container: actas*/}
          <div>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Actas Pendientes" },
                    { id: 1, value: 15, label: "Actas Novedad" },
                    { id: 2, value: 20, label: "Actas Válidas" },
                  ],
                },
              ]}
              width={450}
              height={200}
            />
          </div>
        </div>
      </div>

      {/*third container: Elecciones generales: porcentaje por candidato*/}
      <div className="flex flex-col mt-3 justify-center items-center">
        {/*first container: header*/}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[20px] font-bold leading-4">
            Elecciones Generales - Presidente/a
          </h2>
          <h6>Fecha Corte: Jueves 12 de Octubre del 2023 15:45:04 </h6>
        </div>
        {/*second container: table*/}
        <div>
          <BarChart
            xAxis={[{ scaleType: "band", data: candidatos }]}
            series={[{ data: serie }]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
