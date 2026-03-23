const modelschuma = require("../model/Food");

const create = async (req, res) => {
  try {
    const newitem = await modelschuma.create({
      name: req.body.name,
      price: req.body.price,
      image: req.file ? req.file.filename : "", 
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
    res.status(201).json(Read);
  }catch(err){
     res.status(401).json({message : err.message})
  }
}
const getbyid=async (req,res)=>{
  try{
    const ReadbyId=await modelschuma.findById(req.params.id)
    res.status(201).json(ReadbyId)
  }catch(err){
    res.status(404).json({message:"User Not fond"})
  }
}

const Deleteuser=async(req,res)=>{
  try{
    const deleteuser=await modelschuma.findByIdAndDelete(req.params.id);
    res.status(201).json({message:"User deleted successfully"})
  }catch(err){
    res.status(404).json({message:"user not fond"})
  }
}

const Updatefoodt=async (req,res)=>{
    try{
        const Updatefods=await modelschuma.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json(Updatefods)
    }catch(err){
        console.log(err)
    }if(req.file){
        try{
        const Updatefod=await modelschuma.findByIdAndUpdate(req.params.id,{image:req.file.filename},{new:true})
        res.status(201).json(Updatefod)
    }catch(err){
        console.log(err)
    }
    }

}

module.exports = { 
  create,
  getAll,
  getbyid,
  Deleteuser,
Updatefoodt
 };