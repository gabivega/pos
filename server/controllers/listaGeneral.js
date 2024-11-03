import ListadoGeneral from "../models/listadoGeneral.js";

export const getListadoGeneral = async (req, res) => {
  try {
    const listadoGeneral = await ListadoGeneral.find();
    res.status(200).json(listadoGeneral);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
