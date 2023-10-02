import React, { useEffect, useState } from "react";
import "./main.css";
import axios from "axios";
function Main() {
    const [senderInput, setSenderInput] = useState("");
    const [recvInput, setRecvInput] = useState("");
    const [userObjects, setUserObjects] = useState([]);
    const [showFetchDetails, setShowFetchDetails] = useState(false);
    const [senderObj, setSenderObj] = useState(null);
    const [recvObj, setRecvObj] = useState(null);
    const [amount,setAmount] = useState('');
    const [senderBalance,setSenderBalance] = useState(0);
    const [recvBalance,setRecvBalance] = useState(0);
    const getAllUserObjects = () => {
        return axios.get("http://127.0.0.1:3001/users").then((res) => {
            setUserObjects(res.data);
            console.log("hello");
        });
    };
    useEffect(() => {
        getAllUserObjects().then((e) => console.log(userObjects));
    }, []);
    const handleFetchOnClick = () => {
        let correctSender = false;
        let correctReciever = false;
       
        for (let i = 0; i < userObjects.length; i++) {
            if (userObjects[i].accountNumber === senderInput) {
                correctSender = true;
                setSenderObj(userObjects[i]);
                setSenderBalance(userObjects[i].balance)
                
                
            }
            if (userObjects[i].accountNumber === recvInput) {
                correctReciever = true;
                setRecvObj(userObjects[i]);
                setRecvBalance(userObjects[i].balance);
                
            }
            


        }
        setShowFetchDetails(correctSender && correctReciever);
        if (!(correctSender && correctReciever)) {
            alert('Invalid Sender or Reciver Account Number')
        }
    };
    const handlePayment = ()=>{
        if(amount==='' || Number(amount)<=0){
            alert('Invalid Amount');
            return;
        }
        let data={
            sender:senderObj.accountNumber,
            reciever:recvObj.accountNumber,
            amount:amount
        }
        axios.post("http://127.0.0.1:3001/make",data=data)
        .then((res)=>{
            return res.data;
        })
        .then((data)=>{
            if(data=="successful"){
                setSenderBalance(s=>Number(s)-Number(amount))
                setRecvBalance(r=>Number(r)+Number(amount))
                
            }
            else{
                alert(data)
            }
        })
        
        
        

        
    }

    return (
        <div className="main">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            />
            <div className="navbar navbar-dark bg-dark p-3">
                <a className="navbar-brand h1" href="#">
                    Banking System
                </a>
            </div>
            <div className="dashboard">
                <div
                    className="form-control container-sm mt-4 p-4 "
                    style={{ maxWidth: "1000px", display: "flex" }}
                >
                    <div
                        className="input-group mb-3 container-lg"

                    >
                        <span className="input-group-text" id="inputGroup-sizing-default">
                            Sender
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={senderInput}
                            onChange={(e) => setSenderInput(e.target.value)}
                        />
                    </div>

                    <div
                        className="input-group mb-3 container-sm "
                        style={{ maxWidth: "500px" }}
                    >
                        <span className="input-group-text" id="inputGroup-sizing-default">
                            Reciever
                        </span>
                        <input
                            type="number"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={recvInput}
                            onChange={(e) => setRecvInput(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success btn-sm "
                        onClick={handleFetchOnClick}
                    >
                        Fetch
                    </button>
                </div>
                <div className="cards-container  mt-4 " style={{ display: showFetchDetails ? 'flex' : 'none' }}>
                    <div className="row w-100 justify-content-between">
                        <div className="col-sm-5 mb-3 mb-sm-0 ">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sender</h5>
                                    <p className="card-text">{senderObj && senderObj.name} {senderObj && senderObj.accountNumber}</p>
                                    <div className="btn btn-primary">Balance Rs.{senderBalance}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Reciever</h5>
                                    <p className="card-text">{recvObj && recvObj.name}  {recvObj && recvObj.accountNumber}</p>
                                    <div className="btn btn-primary">Balance Rs.{recvBalance}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="transaction mt-4" style={{display:showFetchDetails?'block':'none'}}>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Amount</span>
                        <input type="text" className="form-control " placeholder="Amount" aria-label="Amount" aria-describedby="addon-wrapping" value={amount} onChange={e=>setAmount(e.target.value)}/>
                    </div>
                    <button
                        type="button"
                        className="btn btn-success btn-sm "
                        onClick={handlePayment}
                    >
                        Pay
                    </button>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default Main;
