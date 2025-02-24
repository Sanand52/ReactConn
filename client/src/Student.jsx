import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { StudentList } from './Student/studentlist';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'

export default function Student() {

const [studentlist, setStudentlist] = useState([]);

let [formdata, setFormdata] = useState({
  name: '',
  age: '',
  email: '',
  message: '',
  _id: ''
});

let savedata = (e) => {
  e.preventDefault();

  {formdata._id ? updateData() : insertData()}
};

let insertData = () => {
  axios.post("http://localhost:3000/api/student/insert", formdata)
    .then((res) => {
      // console.log("Upload successful:", res.data); // for testing
      toast.success(res.data.message);

      // Reset form data ONLY if the upload is successful
      setFormdata({
        name: '',
        age: '',
        email: '',
        message: ''
      });

      // Refresh the student list
      getStdList();
    })
    .catch((err) => {
      // console.log("Upload failed:", err); //for testing error
      toast.error(err.res.data.message);
    });
};

let updateData = () => {

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    axios.put(`http://localhost:3000/api/student/update/${formdata._id}`,formdata)
    .then((res) => {
      // console.log("Data updated successfully:", res.data);// for testing
      // toast.success(res.data.message);

      // Reset form data ONLY if the upload is successful
      setFormdata({
        name: '',
        age: '',
        email: '',
        message: ''
      });

      // Refresh the student list
      getStdList();
    })
    .catch((err) => {
      // console.log("data update failed", err); // for testing error
      // toast.error(err.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    });

    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });


  /* axios.put(`http://localhost:3000/api/student/update/${formdata._id}`,formdata)
    .then((res) => {
      // console.log("Data updated successfully:", res.data);// for testing
      // toast.success(res.data.message);

      // Reset form data ONLY if the upload is successful
      setFormdata({
        name: '',
        age: '',
        email: '',
        message: ''
      });

      // Refresh the student list
      getStdList();
    })
    .catch((err) => {
      console.log("data update failed", err); // for testing error
      toast.error(err.response.data.message);
    });*/
}


let getStdList = () => {
  axios.get("http://localhost:3000/api/student/view").then((res) => {
    return res.data;
  }).then((finaldata) => {
    if (finaldata.status) {
      setStudentlist(finaldata.StudentList);
    }
})}


let getValue = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  let olddata = { ...formdata };
  olddata[name] = value;
  setFormdata(olddata);
}

useEffect(() => {getStdList()}, []);

 return (
    <>
    <ToastContainer/>
      <div className='font-bold text-center text-[40px]'>Student Data</div>
      <div className='grid grid-cols-[25%_auto] gap-4 p-4'>
        <div className='bg-gray-200 p-4'>
        <h2 className='font-bold text-center text-3xl'>Student form</h2>
        <form action='' onSubmit={savedata}>
          <div className='mb-4 py-1'>
          <Label htmlFor="name" value="Name" />
          <TextInput id="name" onChange={getValue} value={formdata.name} name='name' type="text" placeholder="enter name" required shadow />
          </div>
          <div className='mb-4 py-1'>
          <Label htmlFor="age" value="Age" />
          <TextInput id="age" onChange={getValue} value={formdata.age} name='age' type="number" placeholder="enter age" required shadow />
          </div>
          <div className='mb-4 py-1'>
          <Label htmlFor="email" value="Email" />
          <TextInput id="email" onChange={getValue} value={formdata.email} name='email' type="email" placeholder="enter email" required shadow />
          </div>
          <div className='mb-4 py-1'>
          <Label htmlFor="message" value="Message" />
          <Textarea name='message' onChange={getValue} value={formdata.message} placeholder="enter message...." required rows={3} />
          </div>
          <div className='py-1'>
           <Button type="submit" color='blue' className='w-[100%]'>
            {formdata._id ? 'Update' : 'Save'}
           </Button>
          </div>
        </form>
        </div>
        <StudentList data={studentlist} getStdList={getStdList} Swal={Swal} setFormdata={setFormdata}/>
      </div>
    </>
  )
}



















