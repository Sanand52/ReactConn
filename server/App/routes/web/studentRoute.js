let express=require('express');
let studentRoute=express.Router();
const { stdInsert, stdView, DeletebyId, singlestd, updatestd } = require('../../controller/web/studentController');

studentRoute.post('/insert', stdInsert);

studentRoute.get('/view', stdView);

studentRoute.delete('/delete/:id', DeletebyId)

studentRoute.get('/singlestd/:id', singlestd);

studentRoute.put('/update/:id', updatestd);

module.exports=studentRoute;