import User from "../models/user.js";


export const editUser = async (req, res) => {
    try {
        const { id, email, nombre, apellido, telefono, ciudad, direccion } = req.body
        console.log(req.body);
        
        const updatedUser = await User.findByIdAndUpdate(id, {
            nombre : nombre,
            apellido: apellido,
            telefono: telefono,
            ciudad: ciudad,
            direccion : direccion
        })
        const user = await User.findById(id)
        console.log(user);
        let userObject = user.toObject()
        delete userObject.password
        delete userObject.updatedAt
        console.log(userObject);

        
        res.status(200).json(userObject)
    } catch (error) {
        if (error.code == 11000) {    
            console.log(error);        
            res.status(409).json(error)
        }
        else {
        console.log(error);
        res.status(500).json({ error : error.message})}
    }
}

