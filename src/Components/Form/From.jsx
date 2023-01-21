import React from 'react';
import { useState } from 'react';
import axios from "axios";
import "./Form.css";

const From = () => {
    const [studentData, setStudentData] = useState({});
    const [image,setImage] = useState(null);
    
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage(img)
      }
    }
    const handleChange = (e)=>{
        console.log("changing");
        setStudentData({...studentData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async() => {

         if(studentData["phonenumber"].length!== 10){
             console.log("please enter 10 digit phone number");
             return;
         }
    
        if (image) {
          const data = new FormData();
          const fileName = Date.now() + image.name;
          data.append("name", fileName);
          data.append("file", image);
          let obj = {...studentData}
          obj.image = fileName;
          setStudentData(obj);
         
          let me = await  axios.post("http://localhost:5001/student/register",studentData);
          try{

            await axios.post("http://localhost:5001/upload",data);
           
            console.log(me);
          }
          catch(e){
            console.log(me);
               console.log(e);
          }
          console.log(studentData);
        }
  }

  return (
    <div className='FormContainer'>
        <div className='InnerContainer'>
             <h2 className='heading'>Student Form</h2>
             <input type="text" placeholder='username' name='username' onChange={handleChange}/>
             <input type="text" placeholder='Name' name='name' onChange={handleChange}/>         
             <input type="text" placeholder='Surname' name='surname' onChange={handleChange}/>
             <input type="text" placeholder='Password' name='password' onChange={handleChange}/>
             <input type="number" placeholder='Phonenumber' name='phonenumber' onChange={handleChange}/>
             <input type="file"  onChange={onImageChange}/>
             <button onClick={handleSubmit} className="btn">submit</button> 
        </div>
    </div>
  )

}

export default From ;