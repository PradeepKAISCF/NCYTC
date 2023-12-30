import React from "react";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {auth} from '../../firebase.config'
import { useDispatch, useSelector } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { otpverify } from "../../actions/auth";
import "./otp.css"
function Otp({ otp }) {

  const dispatch = useDispatch();
  const [phn,setPhn] = useState('')
  const [Otp,setOtp] = useState('')
  const [user,setUser] = useState(null)

  const sendOtp = async() => {
    try {
      const recaptacha = new RecaptchaVerifier(auth,"recaptacha",{})
      const confirmation = await signInWithPhoneNumber(auth,phn,recaptacha)
      setUser(confirmation)
    } catch (error) {
      console.error(error)
    }
  }
  
  const verifyOtp = async()=>{
    try {
      await user.confirm(Otp)
      console.log("Verified")
      dispatch(otpverify({phn}))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container_CreateEditChanel">
      <input
        onClick={() => otp(false)}
        type="submit"
        name="text"
        value={"X"}
        className="ibtn_x"
      />
      <div className="container2_CreateEditChanel">
        <h1>
          OTP Authentication
        </h1>
        <PhoneInput
        inputStyle={{color:'black'}}
        className = 'ibox'
        country={'in'}
        value={phn}
        onChange={(phn)=>setPhn("+"+phn)}
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={sendOtp}
          className="ibtn"
        />
        <div id="recaptacha"></div>
        <input
          type="number"
          placeholder="Enter OTP"
          className="ibox"
          name="otp"
          value={Otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={() => { verifyOtp();otp(false)}}
          className="ibtn"
        />
      </div>
    </div>
  );
}

export default Otp;
