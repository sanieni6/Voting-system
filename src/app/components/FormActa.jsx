"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { useStore } from "@/store/store";

import React from "react";

const FormActa = () => {
  //selector fields
  const [provincia, setProvincia] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [circunscripcion, setCircunscripcion] = useState("");
  const [zona, setZona] = useState("");
  const [canton, setCanton] = useState("");
  const [junta, setJunta] = useState("");
  const [juntaReceptora, setJuntaReceptora] = useState(0);

  //displayed fields
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [circunscripciones, setCircunscripciones] = useState([]);

  //handle textf.ield to calcule total votos
  const [totalVotos, setTotalVotos] = useState(0);
  const [votosBlancos, setVotosBlancos] = useState(0);
  const [votosNulos, setVotosNulos] = useState(0);
  const [votosCandidatos, setVotosCandidatos] = useState(0);

  //handling selector fields
  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
  };

  useEffect(() => {
    loadCanton();
  }, [provincia]);

  const handleChangeParroquia = (event) => {
    setParroquia(event.target.value);
  };

  useEffect(() => {
    loadParroquia();
  }, [provincia, canton]);

  const handleChangeCircunscripcion = (event) => {
    setCircunscripcion(event.target.value);
  };

  const handleChangeZona = (event) => {
    setZona(event.target.value);
  };

  const handleChangeCanton = (event) => {
    setCanton(event.target.value);
  };

  const handleChangeJunta = (event) => {
    setJunta(event.target.value);
  };

  //correponding to the form fields
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //store
  const {
    isLoggedIn,
    getCandidates,
    candidates,
    getTodasJuntas,
    juntasReceptoras,
    postActa,
  } = useStore();

  useEffect(() => {
    getTodasJuntas();
    getCandidates();
  }, []);

  useEffect(() => {
    loadJuntaId();
  }, [parroquia]);


  //load data
  const loadCanton = () => {
    console.log(juntasReceptoras)
    console.log(provincia)
    let cantones = [];
    juntasReceptoras.forEach((element) => {
      if (element.province == provincia) {
        cantones.push(element.city);
        console.log(element.city);
      }
    })
    setCiudades(cantones);
  };

  const loadParroquia = () => {
    console.log(juntasReceptoras)
    console.log(provincia)
    console.log(canton)
    let parroquias = [];
    juntasReceptoras.forEach((element) => {
      if (element.province == provincia && element.city == canton) {
        parroquias.push(element.parish);
        console.log(element.parish);
      }
    })
    setParroquias(parroquias);
  };

  const loadJuntaId = () => {
    juntasReceptoras.forEach((element) => {
      if (element.province == provincia && element.city == canton && element.parish == parroquia) {
        setJuntaReceptora(element.id);
      }
    })
  };

  const handleFormSubmit = (formData) => {
    let totalVotesCandidate = 0;
    const voteCandidate = [];
    for (const [key, value] of Object.entries(formData)) {
      if (key.includes("numberVotes")) {
        const candidateId = key.split("+")[0];
        const vote = {
          "candidate_id": parseInt(candidateId),
          "number_of_votes": parseInt(value)
        }
        voteCandidate.push(vote);
        totalVotesCandidate += parseInt(value);
        console.log(votosCandidatos);
      }
    }
    const submissionData = {
      "central_electoral": juntaReceptora,
      "election": 1,
      "number_of_absentees": formData["totalSufragantes"],
      "blank_votes": formData["votosBlancos"],
      "null_votes": formData["votosNulos"],
      "vote_candidate": voteCandidate,
    }
    formData["central_electoral"] = juntaReceptora;
    console.log(totalVotesCandidate + parseInt(formData["votosBlancos"]) + parseInt(formData["votosNulos"]));
    if(totalVotesCandidate + parseInt(formData["votosBlancos"]) + parseInt(formData["votosNulos"]) === parseInt(formData["totalSufragantes"])){
    //console.log(formData);
    console.log(submissionData);
    postActa(submissionData)
    }else{
      alert("Los votos no coinciden con el total de sufragantes");
    }
    return true;
  };
  return (
    <div className=" h-full">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Acta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="provincia-select-label">Provincia</InputLabel>
                  <Select
                    labelId="provincia"
                    id="provincia"
                    value={provincia}
                    label="provincia"
                    {...register("provincia", { required: true })}
                    onChange={handleChangeProvincia}
                  >
                    {juntasReceptoras.map((junta) => {
                          return (
                            <MenuItem key={junta.id} value={junta.province}>
                              {junta.province}{" "}
                            </MenuItem>
                          );
                        })}
                  </Select>
                  {errors.provincia && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="parroquia-select-label">Parroquia</InputLabel>
                  <Select
                    labelId="parroquia-select-label"
                    id="parroquia"
                    value={parroquia}
                    label="parroquia"
                    {...register("parroquia")}
                    onChange={handleChangeParroquia}
                  >
                    {parroquias.map((parroquia, id) => {
                          return (
                            <MenuItem key={id} value={parroquia}>
                              {parroquia}{" "}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="provincia-select-label">
                    Circunscripción
                  </InputLabel>
                  <Select
                    labelId="circunscripcion"
                    id="circunscripcion"
                    value={circunscripcion}
                    label="circunscripcion"
                    {...register("circunscripcion")}
                    onChange={handleChangeCircunscripcion}
                  >
                    <MenuItem value={10}>circunscripcion 1</MenuItem>
                    <MenuItem value={20}>circunscripcion 2</MenuItem>
                    <MenuItem value={30}>circunscripcion 3</MenuItem>
                  </Select>
                  {errors.circunscripcion && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="provincia-select-label">Zona</InputLabel>
                  <Select
                    labelId="zona"
                    id="zona"
                    value={zona}
                    label="zona"
                    {...register("zona")}
                    onChange={handleChangeZona}
                  >
                    <MenuItem value={10}>Zona 1</MenuItem>
                    <MenuItem value={20}>Zona 2</MenuItem>
                    <MenuItem value={30}>Zona 3</MenuItem>
                  </Select>
                  {errors.zona && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="provincia-select-label">Cantón</InputLabel>
                  <Select
                    labelId="canton"
                    id="canton"
                    value={canton}
                    label="canton"
                    {...register("canton", { required: true })}
                    onChange={handleChangeCanton}
                  >
                    {ciudades.map((ciudad, id) => {
                          return (
                            <MenuItem key={id} value={ciudad}>
                              {ciudad}{" "}
                            </MenuItem>
                          );
                        })}
                  </Select>
                  {errors.canton && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className="w-[140px]">
                  <InputLabel id="provincia-select-label">Junta n°</InputLabel>
                  <Select
                    labelId="junta"
                    id="junta"
                    value={junta}
                    label="junta"
                    {...register("junta", { required: true })}
                    onChange={handleChangeJunta}
                  >
                    <MenuItem value={10}>Junta 1</MenuItem>
                    <MenuItem value={20}>Junta 2</MenuItem>
                    <MenuItem value={30}>Junta 3</MenuItem>
                  </Select>
                  {errors.junta && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <hr className="mt-4 border" />
            <Grid container spacing={2} className="mt-3">
              <Grid item xs={12} sm={6} className="flex items-center">
                <Typography component="h2" variant="h5" className=" text-center content-center">
                  Total sufragantes
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                        
                        autoComplete="given-name"
                        {...register('totalSufragantes', { required: true })}
                        required
                        fullWidth
                        id="totalSufragantes"
                        label="Total Sufragantes"
                        onChange={(e) => setTotalVotos(e.target.value)}
                        autoFocus
                    />
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center">
                <Typography component="h2" variant="h5" className=" text-center content-center">
                  Votos Blancos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                        
                        autoComplete="given-name"
                        {...register('votosBlancos', { required: true })}
                        required
                        fullWidth
                        id="votosBlancos"
                        label="Votos Blancos"
                        onChange={(e) => setVotosBlancos(e.target.value)}
                        autoFocus
                    />
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center">
                <Typography component="h2" variant="h5" className=" text-center content-center">
                  Votos Nulos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                        
                        autoComplete="given-name"
                        {...register('votosNulos', { required: true })}
                        required
                        fullWidth
                        id="votosNulos"
                        label="Votos Nulos"
                        onChange={(e) => setVotosNulos(e.target.value)}
                        autoFocus
                    />
              </Grid>
            </Grid>
            <hr className="my-4 border" />
            <Typography component="h2" variant="h7" className=" text-center content-center mb-3">
                      VOTACIÓN OBTENIDA POR LAS O LOS CANDIDATOS
                    </Typography>
            <Grid container spacing={2} className="mt-3">
              {candidates.map((candidate) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} className="flex items-center">
                    <Typography component="h2" variant="h7" className=" text-center content-center">
                      {candidate.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                            
                            autoComplete="given-name"
                            {...register(`${candidate.id}+numberVotes`, { required: true })}
                            required
                            fullWidth
                            id={candidate.id}
                            label="N° votos"
                            autoFocus
                        />
                  </Grid>
                  </>
                )

              })}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={"bg-blue-500"}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default FormActa;
