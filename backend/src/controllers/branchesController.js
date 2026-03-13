const branchesController = {};

import branchesModel from "../models/branches.js"

//SELECT        
branchesController.getBranches = async(req, res) => {
    const branches = await branchesModel.find()
    res.json(branches)
}

//insert
branchesController.insertBranches = async(req, res) => {
    const{name, adress, schedule, isActive} = req.body;
    const newBranch = new branchesModel({name, adress, schedule, isActive})
    await newBranch.save()
    res.json({message: "Product save"})
}

//update
branchesController.updateBranches = async (req, res) => {
    const {name, adress, schedule, isActive} = req.body;
    await branchesModel.findByIdAndUpdate(req.params.id, {
        name, adress, schedule, isActive
    }, {new: true})

    res.json({message: "product update"})
}

//eliminar
branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Product deleted"})
}

export default branchesController;