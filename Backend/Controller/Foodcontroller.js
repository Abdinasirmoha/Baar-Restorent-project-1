const modelschuma = require("../model/Food");

const create = async (req, res) => {
  try {
    const newitem = await modelschuma.create({
      name: req.body.name,
      price: req.body.price,
      image: req.file ? req.file.filename : req.body.image || "",
      category: req.body.category
    });

    res.status(201).json(newitem);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const getAll=async(req,res)=>{
  try{
    const Read=await modelschuma.find();
    res.status(200).json(Read);
  }catch(err){
     res.status(500).json({message : err.message})
  }
}
const getbyid=async (req,res)=>{
  try{
    const ReadbyId=await modelschuma.findById(req.params.id)
    if (!ReadbyId) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(ReadbyId)
  }catch(err){
    res.status(400).json({message:err.message})
  }
}

const Deleteuser=async(req,res)=>{
  try{
    const deleteuser=await modelschuma.findByIdAndDelete(req.params.id);
    if (!deleteuser) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({message:"Food deleted successfully"})
  }catch(err){
    res.status(400).json({message:err.message})
  }
}

const Updatefoodt=async (req,res)=>{
    try{
        const updateData = {
          ...req.body,
        };

        if (req.file) {
          updateData.image = req.file.filename;
        }

        const Updatefods=await modelschuma.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true, runValidators: true }
        )

        if (!Updatefods) {
          return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json(Updatefods)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

module.exports = { 
  create,
  getAll,
  getbyid,
  Deleteuser,
Updatefoodt
 };