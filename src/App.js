import fileDownload from "js-file-download";
import React, { useState } from "react";
import './App.css'
import Loading from './loading.png'
import { saveAs } from 'file-saver'
const axios = require('axios')


export default function AddYourData() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [img, setImg] = useState(null);
  const [load, setload] = useState(0);


  const handleSubmit = async (event) => {
    setload(1)
    const response = await axios({
      method: 'post',
      url: 'https://workshop-ticket-printer.herokuapp.com/print',
      data: {
        name,
        email
      },
      headers: {
        'Access-Control-Allow-Orign': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })
    console.log(response);
    setImg(response.data.data)
    setload(0)
  };

  const saveFile = () => {
    saveAs(
      img,
      "workshop-ticket.png"
    );
  };

  return (
    <section>
      <div className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            placeholder="Rohan Kulkarni"
            onChange={(e) => {
              setImg(null)
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            required
            placeholder="rohank2502@gmail.com"
            onChange={(e) => {
              setImg(null)
              setEmail(e.target.value);
            }}
          />
        </label>
        <button className="submit" type="submit" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
      <p>It usually takes 10-20 seconds to generate ticket. Please refresh if you are waiting for more than 30 sec and try again. Sorry for delay</p>
      <img src={Loading} className={load ? 'load' : 'hide'} alt='loader' />
      <div className={img ? 'imagesection' : 'hide'}>
        <img src={img} alt=""></img>
        <button className='dt' onClick={saveFile} target='_blank' rel='noreferrer'>DOWNLOAD TICKET</button>
      </div>
      <p>This site is under development it might crash please report at rohank2502@gmail.com</p>
    </section >
  );
}

