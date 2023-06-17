import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    const pacienteGuardado = await paciente.save();
    res.json(pacienteGuardado);
    console.log(paciente);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);
  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id.trim());
  console.log(paciente.veterinario._id);
  console.log(req.veterinario._id);
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }
  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }
    res.json(paciente);
};
const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id.trim());

  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }

    //Actualizar Paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.nombre = req.body.propietario || paciente.propietario;
    paciente.email = req.body.nombre || paciente.email;
    paciente.telefono = req.body.telefono || paciente.telefono;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    
    try {
      const pacienteActualizado = await paciente.save();
      res.json(pacienteActualizado);
    } catch (error) {
      console.log(error);
    }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id.trim());

  if (!paciente) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: "Paciente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
