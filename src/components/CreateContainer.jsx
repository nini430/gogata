import React,{useState} from 'react'
import {motion} from "framer-motion"
import {MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney} from "react-icons/md"
import { categories } from '../utils/data'
import Loader from './Loader'
import {deleteObject, getDownloadURL, ref,uploadBytesResumable} from "firebase/storage"
import { storage } from '../firebase.config'
import { getAllFoodItem, saveItem } from '../utils/firebaseFunctions'
import { useStateValue } from '../context/stateProvider'
import { actionTypes } from '../context/reducer'

const CreateContainer = () => {
  const [title,setTitle]=useState("")
  const [calories,setCalories]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("other")
  const [imageAsset,setImageAsset]=useState(null)
  const [fields,setFields]=useState(false)
  const [alertStatus,setAlertStatus]=useState("danger");
  const [msg,setMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false)
  const [progress,setProgress]=useState(0)

  const [{foodItems},dispatch]=useStateValue()
  
  const uploadImage=(e)=>{
      setIsLoading(true);
      const imageFile=e.target.files[0];
      const storageRef=ref(storage,`images/${Date.now()}-${imageFile.name}`);
      const uploadTask=uploadBytesResumable(storageRef,imageFile);
      uploadTask.on("state_changed",
      (snapshot)=>{
        const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(uploadProgress);
      },
      (error)=>{
        console.log(error);
        setFields(true);
        setMsg("Error while uploading the image: try again");
        setAlertStatus("danger");
        setTimeout(()=>{
          setFields(false);
          setMsg("");
          setIsLoading(false);
        },4000)

      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              setImageAsset(downloadURL);
              setIsLoading(false);
              setFields(true);
              setMsg("image uploaded successfully");
              setAlertStatus("success");
              setProgress(null)
              setTimeout(()=>{
                setFields(false);
                setMsg("")
              },4000)
        })
      })
      


      

  }

  const deleteImage=()=>{
    setIsLoading(true);
    const deleteRef=ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setAlertStatus("success");
        setMsg("Image deleted succesfully");
        setTimeout(()=>{
          setFields(false);
          setMsg("");
        },4000)

    })
  } 


  const fetchData=async()=>{
    await getAllFoodItem().then((data)=>{
        dispatch({type:actionTypes.SET_FOOD_ITEMS,foodItems:data});
        
    })
    
  }

  const saveDetails=()=>{
      setIsLoading(true);
        try{
          if(!title || !calories || !imageAsset || !price || category==="other") {
            setFields(true);
            setMsg("required fields must be filed");
            setAlertStatus("danger");
            setTimeout(()=>{
              setFields(false);
              setMsg("");
             setIsLoading(false);
            },4000);
            
          }else{
            const data={
              id:Date.now(),
              title,
              imgUrl:imageAsset,
              category,
              calories,
              price,
              qty:1
            }
            saveItem(data);
            setIsLoading(false);
            setFields(true);
            setMsg("Data uploaded succesfully")
            setAlertStatus("success");
            clearData();
            
            
            setTimeout(()=>{
              setFields(false);
              setMsg("");
          },4000)
         
          }
        }catch(err) {
          setFields(true);
          setMsg("error while uploading image: try again");
          setAlertStatus("danger");
          setTimeout(()=>{
              setFields(false);
              setMsg("");
              setIsLoading(false);
          },4000)
        }
        fetchData();
  }


  const clearData=()=>{
    setTitle("");
    setCalories("")
    setPrice("")
    setImageAsset(null)
    setCategory("other")
  }


 
 
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {fields && (
            <motion.p
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
             className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus==="danger"?"bg-red-400 text-red-800":"bg-emerald-400 text-emerald-800"}`}>{msg}</motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-grey-700"/>
              <input className="w-full h-full text-bg bg-transparent outline-none  border-none placeholder:text-gray-400 text-textColor" type="text" value={title} placeholder="Give me a title..." onChange={e=>setTitle(e.target.value)}/>

          </div>
          <div className="w-full">
              <select className="w-full bg-transparent p-2 outline-none text-base  border-b-2 border-gray-200 rounded-md cursor-pointer" onChange={(e)=>setCategory(e.target.value)} value={category} >
                <option value="other" className="bg-white">Select Category</option>
                {categories.map(category=>(
                  <option className=" border-0 outline-0 capitalize bg-white text-headingColor" value={category.urlParamName} key={category.id}>{category.name}</option>
                ))}
              </select>
          </div>

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
             {isLoading? <Loader progress={progress}/>:<>
                  {!imageAsset?
                  <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                          <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"/>
                          <p className="text-gray-500 hover:text-gray-700">Click Here to upload</p>
                      </div>
                      <input className="w-0 h-0" type="file" name="uploadimage" accept="image/*" onChange={uploadImage}/>
                  </label>
              </>
              :<>
              <div className="relative h-full">
                <img className="w-full h-full object-cover" src={imageAsset} alt="uploadedimage"/>
                <button className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}><MdDelete className="text-white"/></button>
              </div>
              </>
                  }
             </>}     
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFoodBank className="text-gray-700 text-2xl"/>
                    <input type="text" placeholder="Calories" className="bg-transparent outline-none w-full h-full text-lg border-none placeholder:text-gray-400 text-textColor" value={calories} onChange={e=>setCalories(e.target.value)} required/>
                </div>
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdAttachMoney className="text-gray-700 text-2xl"/>
                    <input type="text" placeholder="Price" className="bg-transparent outline-none w-full h-full text-lg border-none placeholder:text-gray-400 text-textColor" value={price} onChange={e=>setPrice(e.target.value)} required/>
                </div>
          </div>
          <div className="flex items-center w-full">
              <button className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onClick={saveDetails}>Save</button>
          </div>



      </div>
    </div>
  )
}

export default CreateContainer;
