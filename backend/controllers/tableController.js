import tableModel from "../models/tableModel.js";


const addTables = async (req,res)=>{
  const { name, capacity } = req.body;
  if(!name || name.trim() === "" && capacity === 0 || !capacity){
            return res.json({success:false,message:"Table name and capacity are required."});
        };
  try{
    const exists = await tableModel.findOne({name});
    if(exists){
        return res.json({success:false,message:`Table named ${name} already exists.`});
    } else{
        const newTable = new tableModel({
            name: name,
            // reserved: false,
            capacity: capacity
        }) 
        const table = await newTable.save();
        return res.json({success:true,message:"Table added successfully"});
    }



  } catch(err){
    return res.json({success:false,message:err.message});
  }
};

const listTables = async(req,res)=>{
    try{
      const tables = await tableModel.find({});
      res.json({success:true, data:tables})
    } catch(err){
      res.json({success:false,message:err.message});
    }
}


const deleteTable = async(req,res)=>{
  try{
    const { id } = req.body;
    if(!id){
      return res.json({success:false,message:"Table ID is required"});
    }
    const table = await tableModel.findByIdAndDelete(id);
    return res.json({success:true,message:"Table deleted successfully"});

  }catch(err){
    res.json({success:false,message:err.message});
  }
}

// controllers/tableController.js

const updateTableStatus = async(req,res)=>{
  try{
    const { id } = req.body;
    if(!id){
      return res.json({success:false,message:"Table ID is required"});
    }
    
    // First, fetch the table to get current status
    const table = await tableModel.findById(id);
    if(!table){
      return res.json({success:false,message:"Table not found"});
    }
    
    // Toggle the isReserved status
    const updatedTable = await tableModel.findByIdAndUpdate(
      id,
      {$set:{isReserved: !table.isReserved}},
      {new: true}
    );
    
    return res.json({
      success:true,
      message:"Table status updated successfully",
      data: updatedTable
    });

  }catch(err){
    res.json({success:false,message:err.message});
  }
}

export {addTables, listTables, deleteTable, updateTableStatus};