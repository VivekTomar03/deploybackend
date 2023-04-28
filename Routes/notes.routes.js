//Notes.route.js
const express=require("express")
const { NoteModel } = require("../model/notes.model")

const notesRouter=express.Router()
//for all the following things authenticatio n is required.
notesRouter.get("/", async(req,res)=>{
    // console.log(req.body)
    try {
        const data = await NoteModel.find({authorID:req.body.authorID})
        res.send(data)
    } catch (error) { 
        res.send({
            msg:"something went wrong while fething"
        })
    }
})

notesRouter.get("/:id", async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        const data = await NoteModel.findOne({authorID:req.body.authorID, _id:id})
        res.send(data)
    } catch (error) {
        res.send({
            msg:"something went wrong while fething"
        }) 
    }
})


notesRouter.post("/create", async (req,res)=>{
const payload=req.body
// console.log("payload",payload);
const new_note=new NoteModel(payload)
await new_note.save()
res.send({"msg":"Note Created"})
})


 

notesRouter.patch("/update/:noteID", async(req,res)=>{
    const {noteID} = req.params
    const notes = await NoteModel.findOne({_id:noteID})
   try {
    if(req.body.authorID!=notes.authorID){
        res.send({
            msg:"you are not authorize to do thia action"
        })
    }
    else{
        console.log(req.body);
        const data = await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
        if(data){
          res.send({
              message:"notes updated",
              data
          })
        }
        else{
          res.send({
              message:"wrong credential"
          })
        }
    }
 
   } catch (error) {
    res.send({
        msg:error.message
    })
   }
})
notesRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const notes = await NoteModel.findOne({_id:noteID})
    // console.log(noteID);
   try {
    if(req.body.authorID!=notes.authorID){
        res.send({
            msg:"you are not authorize to do thia action"
        })
    }
    else{
        const data = await NoteModel.findByIdAndDelete({_id:noteID})
        if(data){
          res.send({
              message:"notes deleted"
          })
        }
        else{
          res.send({
              message:"wrong credential"
          })
        }
    }
     
   } catch (error) {
    res.send({
        msg:error.message 
    })
   }
})
module.exports={
notesRouter
}
