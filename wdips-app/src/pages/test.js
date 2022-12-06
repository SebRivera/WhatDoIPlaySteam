//import { collection, getDocs } from 'firebase/compat/firestore';
import { collection, getDoc, doc } from 'firebase/firestore'; 
import React,{ useState, useEffect} from 'react';
import db from '../firebase.js';
import { useParams } from 'react-router-dom';


const Read = () => {
    let { appid } = useParams();
    const [info , setInfo] = useState([]);
    
    const Fetchdata = async()=>{
        const docRef = doc(db, "games", appid);
        const docSnap = await getDoc(docRef);
        const gData = docSnap.exists() ? docSnap.data() : null

        if (gData === null || gData === undefined) return null
        console.log(gData);
        setInfo([...info,gData]);
        return gData
    }

    useEffect(() => {
        Fetchdata();
      }, [])
     
    // Display the result on the page
    return (
        <div>
            <center>
            <h2>Student Details</h2>
            <h1>Id: { appid }</h1>
            </center>
         
        {
            info.map((data) => (
            <Frame appID={data.appID}
                   name={data.name}
                   price={data.price}/>
            ))
        }
        </div>
 
    );
}
 
// Define how each display entry will be structured
const Frame = ({appID , name , price}) => {
    console.log(appID + " " + name + " " + price);
    return (
        <center>
            <div className="div">
                 
<p>NAME : {name}</p>
  
                 
<p>appID : {appID}</p>
 
                 
<p>price : {price}</p>
  
            </div>
        </center>
    );
}
 
export default Read;