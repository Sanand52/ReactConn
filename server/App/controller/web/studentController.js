const stdModel = require("../../model/stdModel");


let stdInsert = (req, res) => {
    let {name,age,email,message} = req.body;
    let student = new stdModel({
        name:name,
        age:age,
        email:email,
        message:message
    });
    student.save().then(() => {
        res.status(200).send({
            status:200,
            message:"data uploaded successfully",
        });
    }).catch((err) => {
        res.status(400).send({
            status:400,
            message: 'Data Upload failed', 
            err:err.message
        });
    });
};

let stdView = async (req, res) => {
    try {
        let students = await stdModel.find();
        if(students.length > 0) {
            res.send({
                status:200,
                message:"Data fetched successfully",
                StudentList:students
            });
        } else {
            res.send({
                status:404,
                message: 'No students found'
            });
        }
    } catch { (err) => {
        res.send({
            status:500,
            message: 'Data fetch failed', 
            err
        });
    }
}};

let singlestd = async (req, res) => {
    let id = req.params.id;
    await stdModel.findOne({_id:id})
    .then((std) => {
        res.status(200).send({
            message: "Data fetched successfully",
            singlestd: std
        });
    }).catch((err) => {
        res.status(400).send({
            message: 'Data fetch failed', 
            err:err.message
        });
    });
}

let updatestd = async (req, res) => {
    let id = req.params.id;
    let {name,age,email,message} = req.body;
    let std = {
        name,
        age,
        email,
        message};

    await stdModel.updateOne({_id:id},std)
    .then((success) => {
        res.status(200).send({
            message: "Data updated successfully",
            success
        });
    }).catch((err) => {
        res.status(400).send({
            message: 'Data update failed', 
            err:err.message
        });
    });
}

let DeletebyId = async (req, res) => {
    let id = req.params.id;
    await stdModel.deleteOne({_id:id})
    .then((success) => {
        res.status(200).send({
            message: "Data deleted successfully",
            success
        });
    }).catch((err) => {
        res.status(400).send({
            message: 'Data delete failed', 
            err:err.message
        });
    });
}
 

module.exports = {stdInsert,stdView,DeletebyId,singlestd,updatestd};