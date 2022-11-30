import React,{ useState, useEffect} from 'react';
import db from './firebase.js';

const Read = () => {
 
    const [info , setInfo] = useState([]);
 

    useEffect(() => {
        fetchBlogs();
      }, [])
    
    // Start the fetch operation as soon as
    // the page loads
    // window.addEventListener('load', () => {
    //     Fetchdata();
    //   });

    const fetchBlogs=async()=>{
        const response=db.collection('games');
        const data=await response.get();
        data.docs.forEach(item=>{
            setInfo([...info,item.data()])
        })
    }
 
    // Fetch the required data using the get() method
    const Fetchdata = async()=>{
        db.collection("games").get().then((querySnapshot) => {
            
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
                 
            });
        })
    }
     
    // Display the result on the page
    return (
        <div>
            <center>
            <h2>Student Details</h2>
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