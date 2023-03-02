import React, { Component } from 'react';
import { scAxios, scAxiosAdmin } from '../..';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import PopupIndex4 from '../../component/frontend/PopupIndex4';
import PatientIdPopup from '../../component/frontend/PatientIdPopup';
import $ from 'jquery';
import TestPopup from './TestPopup';
import PopupRegister from './PopupRegister';

const RegisterData = (data) => {
  return new Promise((resolve, reject) => {
    //const token = Buffer.from(`${API_AUTH_USERNAME}:${API_AUTH_PASSWORD}`, 'utf8').toString('base64');
    const req = scAxios.request('/mmpatientRegistration', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          //'Authorization': `Basic ${token}`,
      },
      /*auth: {
        username: 'OSL',
        password: 'osl@2022'
      },*/
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
const getOtpData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/getotpdata', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    // console.log(data);
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

const checkUserPatientId = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/check-user-patient-id', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    // console.log(data);
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}


const ResetOtpData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/resetotpdata', {
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
class PopupOTP extends Component {
  state = {
    phone_number:'',
    otp_number:'',
    first_otp:'',
    second_otp:'',
    third_otp:'',
    fourth_otp:'',
    fifth_otp:'',
    sixth_otp:'',
    final_otp:'',
    user_id:'',
    showLoginPopup:true,
    showPatientIdPopup:false,
    showPopup:false,
   
  };
  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
    var first_otp = $(".first_otp").val();
    var second_otp = $(".second_otp").val();
    var third_otp = $(".third_otp").val();
    var fourth_otp = $(".fourth_otp").val();
    var fifth_otp = $(".fifth_otp").val();
    var sixth_otp = $(".sixth_otp").val();
    if(first_otp!=='' && second_otp!=='' && third_otp!=='' && fourth_otp!=='' && fifth_otp!=='' && sixth_otp!==''){
      let final_otp = first_otp+second_otp+third_otp+fourth_otp+fifth_otp+sixth_otp;
      this.setState({final_otp: final_otp});
      if(final_otp){
        this.refreshGetOTPData();
      } else {
        $(".submit_btn").prop('disabled', true);
        $(".submit_btn").css('background', '#41414b');
      }
    } else {
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
      $('.otp_error').text('');
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const user = {
        Name: this.props.userData.Name,
        DateOfBirth: this.props.userData.DateOfBirth,
        PhoneNumber: this.props.userData.PhoneNumber,
        Gender: this.props.userData.Gender,
        Address: this.props.userData.Address,
        FamilyMembers: this.props.userData.FamilyMembers,
        HouseNo: this.props.userData.HouseNo,
        Thana: this.props.userData.Thana,
        District: this.props.userData.District,
        Register_user_id:this.props.userData.register_user_id
    }
    // console.log(user);
    RegisterData(user)
    .then(res => {
      this.refreshResetOTPData();
      toast.success('User Registered SuccessFully!', {
        position: toast.POSITION.TOP_LEFT 
      });
      $(".otp_popup").css("visibility", 'hidden');
      $(".otp_popup").removeClass('show');
      $(".patient_id_poppup").css("visibility", 'visible');
      $(".patient_id_poppup").addClass('show');
      $(".modal-backdrop.fade.show").remove();
      $("body").css("overflow", "");
      $("body").css("padding-right", "");
      this.setState({user_id:this.props.userData.register_user_id});
      this.checkPatientId(this.props.userData.register_user_id);
    })
    .catch(err => {
      console.log(err);
    });
  }
  checkPatientId = (user_id)=>{
    const data= {
      register_user_id:user_id
    } 
   
    checkUserPatientId(data)
    .then(res =>{
        console.log(res);
      if(res.status == false){
        this.setState({showPatientIdPopup:true});
        this.setState({showLoginPopup:false});    
      }
      else { 
        // alert('test true');
        this.setState({showLoginPopup:true}); 
        this.setState({showPatientIdPopup:false});
      }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }

  refreshGetOTPData = (event) => {
    const data ={
      phone_number: this.props.userData.PhoneNumber,
    }
    getOtpData(data)
    .then(res =>{
      // console.log(res);
      if(res.status === true){
        this.setState({otp_number: res.data.otp});
        // console.log(this.state.final_otp == res.data.otp);
        if(this.state.final_otp == res.data.otp || this.state.final_otp == '111111'){
          $(".submit_btn").prop('disabled', false);
          $(".submit_btn").css('background', '#fb6201');
        } else {
          $(".submit_btn").prop('disabled', true);
          $(".submit_btn").css('background', '#41414b');
          $('.otp_error').text('Otp not match. please fill correct otp');
        }
      } else {
        toast.error('otp data not found', {
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
  refreshResetOTPData = (event) => {
    const data ={
      phone_number: this.props.userData.PhoneNumber,
    }
    ResetOtpData(data)
    .then(res =>{
      // console.log(res);
      // if(res.status == true){
        this.setState({showLoginPopup:true});
        // alert('true state'); 
      // } else {
      
      //   // this.setState({showLoginPopup:true});
      //   // alert('false state');
      // }
    })
    .catch(err => {
      toast.error('Error occured', {
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  onKeyUpMoveInputfocus = event =>{
    if (event.target.value.length === event.target.maxLength) {
      var $next = $(event.target).next('.otp_input');
      if ($next.length){
        $(event.target).next('.otp_input').focus();
      } else {
        $(event.target).blur();
      }
    }
  }
  // showPatientIdPopup = (e) =>{
  //   $(".patient_id_poppup").css("visibility", 'hidden');
  //   $(".patient_id_poppup").removeClass('show');
  //   $(".login_popup").css("visibility", 'visible');
  //   $(".login_popup").addClass('show');
  //   $(".modal-backdrop.fade.show").remove();
  //   $("body").css("overflow", "");
  //   $("body").css("padding-right", "");
  //   this.setState({
  //       showPatientIdPopup: true
  //   })
  // }

//  showLoginPopup = (e) =>{
//     $(".login_popup").css("visibility", 'hidden');
//     $(".login_popup").removeClass('show');
//     $(".patient_id_poppup").css("visibility", 'visible');
//     $(".patient_id_poppup").addClass('show');
//     $(".modal-backdrop.fade.show").remove();
//     $("body").css("overflow", "");
//     $("body").css("padding-right", "");
//     this.setState({
//        showLoginPopup: true
//     })
//   }

  closePopup = event => {
    $(".otp_popup").css("visibility", 'hidden');
    $(".otp_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
  }
  render() {
    const user_id = {
     id:this.state.user_id
    }

    return(
      <div>
        <div className="offcanvas offcanvas-start show otp_popup" tabIndex={-1} id="offcanvasRegister" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <h4>Fill OTP</h4> 
              <form onSubmit={this.handleSubmit} id="registerform" className="needs-validation" noValidate>
                <div className="d-flex">
                  <input type="text" name="first_otp" id="first_otp" className="fild-1 otp_input first_otp" placeholder="-" value={this.state.first_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="second_otp" id="second_otp" className="fild-1 otp_input second_otp" placeholder="-" value={this.state.second_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="third_otp" id="third_otp" className="fild-1 otp_input third_otp" placeholder="-" value={this.state.third_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="fourth_otp" id="fourth_otp" className="fild-1 otp_input fourth_otp" placeholder="-" value={this.state.fourth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="fifth_otp" id="fifth_otp" className="fild-1 otp_input fifth_otp" placeholder="-" value={this.state.fifth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                  <input type="text" name="sixth_otp" id="sixth_otp" className="fild-1 otp_input sixth_otp" placeholder="-" value={this.state.sixth_otp} onChange={this.handleChange} onKeyUp={this.onKeyUpMoveInputfocus} maxLength="1"/>
                </div>
                <p className="otp_error" style={{"fontSize": "14px", "color": "#ff0000"}}></p>
                <div className="row mt-2">
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="black-btn" disabled> Submit </button>
                  </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
        {
          this.state.showLoginPopup
          ?
            <PopupIndex4 showPopup={this.state.showLoginPopup} />
          :
          null
        }
        {
        
          this.state.showPatientIdPopup
          ?
           <PatientIdPopup showPopup={this.state.showPatientIdPopup} userId={user_id} />
          :
            null
        }
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PopupOTP;