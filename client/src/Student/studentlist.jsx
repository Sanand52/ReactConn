import React from 'react'
import { Table } from "flowbite-react";
import axios from 'axios';
import { toast } from 'react-toastify';


export function StudentList({data,getStdList,Swal,setFormdata}){
  
  let deleteRow=(delid)=>{

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      axios.delete(`http://localhost:3000/api/student/delete/${delid}`);
      
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    
      getStdList();
    }
  });
};

let Update=(id)=>{
  axios.get(`http://localhost:3000/api/student/singlestd/${id}`)
  .then((res)=>{
    let std = res.data.singlestd;
    setFormdata(std);
  }).catch((err)=>{
    toast.error(err.response.data.message);
});
};

    return (
      <>
      <div className='bg-gray-200 p-4'>
          <h2 className='font-bold text-3xl text-center mb-4'>Student List</h2>
          <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>
              Edit
            </Table.HeadCell>   
            <Table.HeadCell>
              Delete
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y height-[100%]">
            {
              data && data.length >= 0 ? (
              data.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.age}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <button onClick={()=>Update(item._id)} className="bg-blue-500 text-white py-2 px-2 rounded-md">Edit</button>
                    </Table.Cell>
                    <Table.Cell>
                      <button onClick={()=>deleteRow(item._id)} className="bg-red-500 text-white py-2 px-2 rounded-md">Delete</button>
                    </Table.Cell>
                  </Table.Row>
                )
              })):(
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center text-black text-2xl">No data found</Table.Cell>
              </Table.Row>
              )
            }
            
          </Table.Body>
        </Table>
        </div>
        </div>
        </>
    )
  }

export default StudentList;