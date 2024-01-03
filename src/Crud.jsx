import React, { useEffect, useState } from 'react'

function Crud() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [salary, setSalary] = useState("");
    const [record, setRecord] = useState([]);
    const id = Math.floor(Math.random() * 10000)
    const [editid,setEdit] = useState("")


    const HandleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            id, name, email, password, city, salary
        }
        if(editid){
            let all = [...record];
            let update = all.map((val)=>{
                if(val.id == editid){
                    return{
                        ...val,
                        name : name,
                        email : email,
                        password : password,
                        city : city,
                        salary : salary
                    }
                }
                return val;
            })
            localStorage.setItem('user',JSON.stringify(update))
            setRecord(update)
            alert("Successfully Updated")
            setEdit("");
        }else{
            let all = [...record, obj]
            setRecord(all);
            alert("User Insert")
            localStorage.setItem('user', JSON.stringify(all))
        }
            setName("");
            setEmail("");
            setPassword("");
            setCity("");
            setSalary("");
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(all)
    }, [])

    const deleteData = (id) => {
        let all = [...record]
        let deleteRecord = all.filter((val) => {
            return val.id != id
        })
        setRecord(deleteRecord)
        localStorage.setItem('user', JSON.stringify(deleteRecord))
        alert("Record Successfully Deleted")
    }
    const EditData = (id) =>{
        let AllRecord = [...record];
        let Single = AllRecord.find(val=>val.id == id);
        setEdit(id)
        setName(Single.name)
        setEmail(Single.email)
        setPassword(Single.password)
        setCity(Single.city)
        setSalary(Single.salary)
    }

    return (
        <div>
            <center><h1  style={{backgroundColor:'#E3E4FA'}} className=' text-dark py-2 mb-5'>Employee Management App</h1></center>
            <div className="container">
           
                    <form onSubmit={HandleSubmit} className="m-auto rounded p-5 mb-5 text-dark  flex items-center justify-center w-50 shadow-lg" > 
                        <div className="mb-4">
                            <label htmlFor="name" className=" mb-2 me-3 d-block">Name</label>
                            <input type="text"  onChange={(e) => setName(e.target.value) } value={name} className="  border rounded w-100 py-6 px-3 " />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className=" mb-2 me-3 text-left d-block">Email</label>
                            <input type="text"  onChange={(e) => setEmail(e.target.value) } value={email}  className="  border rounded w-100 py-6 px-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className=" mb-2 me-3 d-block">Password</label>
                            <input type="text"  onChange={(e) => setPassword(e.target.value) } value={password}  className="  border rounded w-100 py-6 px-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className=" mb-2 me-3 d-block">City</label>
                            <input type="text"  onChange={(e) => setCity(e.target.value) } value={city}  className="  border rounded w-100 py-6 px-3" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className=" mb-2 me-3 d-block">Salary</label>
                            <input type="text" onChange={(e) => setSalary(e.target.value) } value={salary}  className="  border rounded w-100 py-6 px-3" />
                        </div>
                        <div className="flex items-center justify-between">
                            {
                            editid ? (<input className='btn btn-primary' type='submit' value="edit"/>) :
                            (<input className='btn btn-primary' type='submit' />) 
                            }
                        </div>
                    </form>
                    <center><h1  style={{backgroundColor:'#E3E4FA',marginTop:"100px"}} className=' w-25 text-dark py-2'>Employee List</h1></center>
                    <table className="mt-5 table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">City</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                record.map((val) => {
                                    return (
                                        <tr key={val.id}>
                                            <td>{val.id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.password}</td>
                                            <td>{val.city}</td>
                                            <td>{val.salary}</td>
                                            <td>
                                                <button onClick={() => deleteData(val.id)} className='bg-danger text-white border-0 me-2'>Delete</button>
                                                <button onClick={() => EditData(val.id)} className='bg-primary text-white border-0'>Edit</button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>


             
            </div>

        </div>
    )
}

export default Crud