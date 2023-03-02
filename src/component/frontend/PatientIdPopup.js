import React, { Component } from 'react';
import { scAxios, scAxiosSMS, scAxiosAdmin } from '../..';
import { startUserSession } from '../../userSession';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import PopupIndex4 from '../../component/frontend/PopupIndex4';
import $ from 'jquery';
import PopupOTP from './PopupOTP';
import axios from 'axios';


const alertStyle = {
  color: 'red',
};

const input_field_css = {
  maxHeight: '50px',
  fontSize: '14px',
  borderColor: '#cccccc',
  borderRadius: '30px'
};

const PatientIdRegister= (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/save-patient-id', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
class PatientIdPopup extends Component {
  state = {
    fields: {},
    errors: {},
    patient_id: '',
    showPatientIdPopup:false,
    showLoginPopup:false,
    showPopup:false,
  };

// Validation..
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let patient_id = '';

    if(patient_id != null || ""){
      errors["patient_id"] = " ";
      formIsValid = true; 
    }

    if(patient_id == ""){
      errors["patient_id"] = "*Please enter your patient Id.";
      formIsValid = true;
    }
        this.setState({
        errors: errors
    });
    return formIsValid;
  }

  handleChange = event => {
    // /*this.setState({ errors:''});
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
      this.validateForm();
    /*this.setState({
        fields
    }, () => this.validateForm());*/
    // document.getElementById("black-btn").disabled = false;
    let patient_id = document.getElementById("patient_id").value;
    console.log(patient_id);
    // if(patient_id){
      document.getElementById("black-btn").style.background = "#fb6201";
    // }
   
    
    this.setState({
        [event.target.name]: event.target.value
    });
  }
//   onKeyUpMoveInputfocus = event =>{
//     if (event.target.value.length === event.target.maxLength) {
//       var $next = $(event.target).next('.otp_input');
//       if ($next.length){
//         $(event.target).next('.otp_input').focus();
//       } else {
//         $(event.target).blur();
//       }
//     }
//   }
 
  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(this.props.userId.id);
    // const res = await axios.post('http://localhost/reactjs/unitedhospitalapi/api/user/save-patient-id',{patient_id:this.state.patient_id});
    // const result = res.data;
    // if(result.status === true){
    //   alert('patient id successfully stored');
    //     this.setState({showLoginPopup:true});
    // }else{
    //     alert('patient id not matched');
    // }
    if (this.validateForm()) {
    const user = {
      PatientId: this.state.patient_id,
      register_user_id:this.props.userId.id,
    }
    PatientIdRegister(user)
    .then(res => {
      const patient_user = {
        patient_id:this.state.patient_id,
        register_user_id:this.props.userId.id,
      }
      console.log(res);
      this.SubmitRegisterPatientId(user);
    })
    .catch(err => {
      console.log(err);
    });
  }
  else{

  }
  }

  SubmitRegisterPatientId = (data) => {
    PatientIdRegister(data)
    .then(res => {
    console.log(res);
      if(res.status === true){
        this.setState({register_user_id:res.data.id});
        toast.success('Patient Id Registered SuccessFully!', {
          position: toast.POSITION.TOP_LEFT
        });
      } else {
        toast.error('Patient Id Registered not SuccessFully!', {
          position: toast.POSITION.TOP_LEFT
        });
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
 
    ShowLoginPopup = (e) =>{
    $(".register_popup").css("visibility", 'hidden');
    $(".register_popup").removeClass('show');
    $(".login_popup").css("visibility", 'visible');
    $(".login_popup").addClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
      showLoginPopup: true,
    })
  }
  showPatientIdPopup = (e) =>{
    $(".patient_id_poppup").css("visibility", 'hidden');
    $(".patient_id_poppup").removeClass('show');
    $(".register_popup").css("visibility", 'visible');
    $(".register_popup").addClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
    this.setState({
        showPatientIdPopup: true
    })
  }
  closePopup = event => {
    $(".patient_id_poppup").css("visibility", 'hidden');
    $(".patient_id_poppup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }

  
  render() {
    // const user_data = {
    //   Username:this.state.patient_id,
    // }
    return(
      <div>
        <div className="offcanvas offcanvas-start show patient_id_poppup" tabIndex={-1} id="offcanvasRegister" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel"> </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={this.closePopup} />
          </div>
          <div className="offcanvas-body">
            <div className="row text-center" id="logos">
              <div className="col-4">
                <img src={uhlcare_logo} alt="uhlcare-logo" />
              </div>
              <div className="col-4">
                <img src={uhl_logo} alt="uhl-logo" />
              </div>
              <div className="col-4">
                <img src={medix_logo} alt="medix-logo" />
              </div>
            </div>
            <div className="left-offcanvas">
              <h4>PATIENT DETAILS</h4> 
              <form onSubmit={this.handleSubmit} id="registerform" className="needs-validation" noValidate>
              
                <div className="row">
                  <div className="input-group mt-2">
                  <input placeholder="Enter Your Patient ID" type="text" id="patient_id" name="patient_id" onChange={this.handleChange} autoComplete="off" className="form-control" maxLength="10" required/>
                <p>To get Your Patient ID Please Contact with Hospital Administration.</p>
               
                <span style={alertStyle}>{this.state.errors.district}</span>
                  </div>
                  
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="black-btn"> Save </button>
                  </div> 
                </div>
              </form>
              <p><label className="dont">Don't have a patient I.D? <br/><button className="nav-link active" onClick={this.ShowLoginPopup} style={{"background": "none", "border": "none", "padding": "0px", "color": "rgb(251, 98, 1)"}}>Login here.</button></label></p>
            </div>
          </div>
        </div>
        {
          this.state.showLoginPopup
          ?
            <PopupIndex4 showPopup={this.state.showLoginPopup}/>
          :
            null
        }
        {
          this.state.showOtpPopup
          ?
            <PopupOTP showPopup={this.state.showOtpPopup}  />
          :
            null
        }
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PatientIdPopup;