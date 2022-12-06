import React from 'react';
import { useParams } from 'react-router-dom';


export default function Game(){
    let { appid } = useParams();
    return (
        <div>
            <center>
            <h2>Student Details</h2>
            <h1>Id: { appid }</h1>
            </center>
        </div>
    )
}