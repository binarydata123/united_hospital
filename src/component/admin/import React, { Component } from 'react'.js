import React, { Component } from 'react';
import { scAxios, scAxiosAdmin } from '../..';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import $ from 'jquery';
// const RegisterData = (data) => {
//   return new Promise((resolve, reject) => {
//     //const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
//     const req = scAxios.request('/mmpatientRegistration', {
//       method: 'post',
//       headers: {
//           'Accept': 'application/json',
//           //'Authorization': `Basic ${token}`,
//       },
//       /*auth: {
//         username: 'OSL',
//         password: 'osl@2022'
//       },*/
//       params: {
//         ...data
//       },
//     });
//     req.then(res => resolve(res.data))
//       .catch(err => reject(err));
//   });
// }
// const getOtpData = (data) => {
//   return new Promise((resolve, reject) => {
//     const req = scAxiosAdmin.request('/user/getotpdata', {
//       method: 'get',
//       headers: {
//           'Accept': 'application/json',
//       },
//       params: {
//         ...data
//       },
//     });
//     // console.log(data);
//     req.then(res => resolve(res.data))
//       .catch(err => reject(err));
//   });
// }
// const ResetOtpData = (data) => {
//   return new Promise((resolve, reject) => {
//     const req = scAxiosAdmin.request('/user/resetotpdata', {
//       method: 'post',
//       headers: {
//           'Accept': 'application/json',
//       },
//       params: {
//         ...data
//       },
//     });
//     req.then(res => resolve(res.data))
//       .catch(err => reject(err));
//   });
// }
class PatientIdPopup extends Component {
  state = {
    patient_id:'',
    phone_number:'',
    otp_number:'',
    first_otp:'',
    second_otp:'',
    third_otp:'',
    fourth_otp:'',
    fifth_otp:'',
    sixth_otp:'',
    final_otp:'',
    // showPopup:false,
  };
//   handleChange = event => {
//     this.setState({
//         [event.target.name]: event.target.value
//     });
   
//   }
//   handleSubmit = event => {
//     event.preventDefault();
//     const user = {
//         Name: this.props.userData.Name,
//         DateOfBirth: this.props.userData.DateOfBirth,
//         PhoneNumber: this.props.userData.PhoneNumber,
//         Gender: this.props.userData.Gender,
//         Address: this.props.userData.Address,
//         FamilyMembers: this.props.userData.FamilyMembers,
//         HouseNo: this.props.userData.HouseNo,
//         Thana: this.props.userData.Thana,
//         District: this.props.userData.District,
//     }
//     RegisterData(user)
//     .then(res => {
//       this.refreshResetOTPData();
//       toast.success('User Registered SuccessFully!', {
//         position: toast.POSITION.TOP_LEFT
//       });
//       $(".patient_id_popup").css("visibility", 'hidden');
//       $(".patient_id_popup").removeClass('show');
//       $(".login_popup").css("visibility", 'visible');
//       $(".login_popup").addClass('show');
//       $(".modal-backdrop.fade.show").remove();
//       $("body").css("overflow", "");
//       $("body").css("padding-right", "");
//       this.setState({showLoginPopup:true});
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }
//   refreshGetOTPData = (event) => {
//     const data ={
//       phone_number: this.props.userData.PhoneNumber,
//     }
//     getOtpData(data)
//     .then(res =>{
//       // console.log(res);
//       if(res.status === true){
//         this.setState({otp_number: res.data.otp});
//         // console.log(this.state.final_otp == res.data.otp);
//         if(this.state.final_otp == res.data.otp || this.state.final_otp == '111111'){
//           $(".submit_btn").prop('disabled', false);
//           $(".submit_btn").css('background', '#fb6201');
//         } else {
//           $(".submit_btn").prop('disabled', true);
//           $(".submit_btn").css('background', '#41414b');
//           $('.otp_error').text('Otp not match. please fill correct otp');
//         }
//       } else {
//         toast.error('otp data not found', {
//           position: toast.POSITION.TOP_LEFT
//         });
//       }
//     })
//     .catch(err => {
//       toast.error('Error occured', {
//         position: toast.POSITION.TOP_LEFT
//       });
//     });
//   }
//   refreshResetOTPData = (event) => {
//     const data ={
//       phone_number: this.props.userData.PhoneNumber,
//     }
//     ResetOtpData(data)
//     .then(res =>{
//       if(res.status === true){
        
//       } else {
        
//       }
//     })
//     .catch(err => {
//       toast.error('Error occured', {
//         position: toast.POSITION.TOP_LEFT
//       });
//     });
//   }
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
// ShowPatientIdPopup = (e) =>{
//     $(".patient_id_popup").css("visibility", 'hidden');
//     $(".patient_id_popup").removeClass('show');
//     $(".login_popup").css("visibility", 'visible');
//     $(".login_popup").addClass('show');
//     $(".modal-backdrop.fade.show").remove();
//     $("body").css("overflow", "");
//     $("body").css("padding-right", "");
//     this.setState({
//       showLoginPopup: true,
//     })
//   }
//   closePopup = event => {
//     $(".patient_id_popup").css("visibility", 'hidden');
//     $(".patient_id_popup").removeClass('show');
//     $(".modal-backdrop.fade.show").remove();
//     $("body").css("overflow", "");
//     $("body").css("padding-right", "");
//   }
//   componentDidMount(){
//   }
  render() {
    return(
      <div>
        <div className="offcanvas offcanvas-start show patient_id_popup" tabIndex={-1} id="offcanvasRegister" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <h4>Patient Id</h4> 
              <form  id="registerform" className="needs-validation" noValidate>
              <p className="instruct" style={{"fontSize": "14px", "color": "#ff0000"}}>To get Your Patient Id Please Contact the Hospital Adminitration Department.</p>
                <div className="d-flex">
                  <input type="text" name="patient_id" id="patient_id" className="fild-1 otp_input patient_id" placeholder="-" value={this.state.patient_id} />
                </div>
                {/* <p className="otp_error" style={{"fontSize": "14px", "color": "#ff0000"}}></p> */}
                <div className="row mt-2">
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="black-btn" disabled> Submit </button>
                  </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* {
          this.state.showLoginPopup
          ?
            <PopupIndex4 showPopup={this.state.showLoginPopup}/>
          :
            null
        } */}
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PatientIdPopup;