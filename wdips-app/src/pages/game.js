import { collection, getDoc, doc, connectFirestoreEmulator } from 'firebase/firestore'; 
import React,{ useState, useEffect} from 'react';
import db from '../firebase.js';
import { useParams } from 'react-router-dom';
import "./game.css"
import {useNavigate} from 'react-router-dom';

const Game = () => {
    let { appid } = useParams();
    const imgURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appid + "/header.jpg"
    const pageURL = "https://store.steampowered.com/app/" + appid
    const [info , setInfo] = useState([]);
    const [recomm, setRecomm] = useState([]);
    const [recList, setRecList] = useState([]);

    const FetchRecomm = async()=>{
        let list = [];
        var docRef = doc(db, "recommendation", appid);
        var docSnap = await getDoc(docRef);
        const recommData = docSnap.exists() ? docSnap.data() : null
        if (recommData === null || recommData === undefined) return null
        console.log(recommData);
        for (let i = 1; i < 11; i++) {
            console.log(recommData.topRecommend[i]);
            docRef = doc(db, "games", recommData.topRecommend[i]);
            docSnap = await getDoc(docRef);
            const gData = docSnap.exists() ? docSnap.data() : null
            if (gData === null || gData === undefined){ 
                console.log("null");
                continue;
            }
            list.push(gData);
            //setRecList([...recList,gData]);
            console.log(recList);
            //list.push(gData);
        }
        setRecomm([...recomm,recommData]);
        //list = recommData.topRecommend;
        setRecList([...Object.values(list)]);
        //setRecList([...recList,list]);
        console.log(recList);
    }
    
    const Fetchdata = async()=>{
        const docRef = doc(db, "games", appid);
        const docSnap = await getDoc(docRef);
        const gData = docSnap.exists() ? docSnap.data() : null

        if (gData === null || gData === undefined) return null
        console.log(gData);
        setInfo([...info,gData]);
    }

    useEffect(() => {
        Fetchdata();
        FetchRecomm();
      }, [])
     
    // Display the result on the page
    return (
        <div>   
        {
            info.map((data) => (
            <Frame  key={data.appID} 
                    appID={data.appID}
                    name={data.name}
                    developer={data.developer}
                    publisher={data.publisher}
                    release_date={data.release_date}
                    price={data.price}/>
            ))
        }
            <FrameRecommendation data={recList}/>
        </div>
 
    );
}

const FrameRecommendation = ({data}) => {
    console.log(data);
    return (
        <center>
            <div className="container">
            <h3 className="p-3 text-center">Your Top Recommendations</h3>
            <table className='table table-striped table-bordered' style = {{width: '75%'}}>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.map((dataR) => (
                            <tr key={data.appID}>
                                <td>
                                    <a href={"https://store.steampowered.com/app/" + dataR.appID}>
                                        <img className="gameImg" src= {"https://steamcdn-a.akamaihd.net/steam/apps/" + dataR.appID + "/header.jpg"}/>
                                    </a>
                                </td>
                                <td style={{textAlign: 'center'}}>{dataR.name}</td>
                                <td>{dataR.price}</td>
                                <td>{dataR.publisher}</td>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
            </div>
        </center>
    );
}
 
// Define how each display entry will be structured
const Frame = ({appID , name, developer, publisher, release_date, price}) => {
    let navigate = useNavigate();
    const imgURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appID + "/header.jpg"
    const pageURL = "https://store.steampowered.com/app/" + appID
    console.log(appID + " " + name + " " + price + " " + developer + " " + publisher + " " + release_date);
    return (
        <div>
            <center>
                <button className="btnSteam" onClick={() => navigate('/')}>
                    Go Back
                </button>
            </center>
            <center>
                <a href={pageURL}>
                    <img className="gameImg" src= {imgURL}/>
                </a>
            </center>
            <center>
            <div className="div">
                 
                <p>Developer: {developer}   Publisher: {publisher}</p>
                
                                
                <p>Release Date: {release_date}</p>
                
                                
                <p>price : {price}</p>
            </div>
        </center>
        </div>
    );
}
 
export default Game;