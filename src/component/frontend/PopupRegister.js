import React, { Component } from 'react';
import { scAxiosSMS, scAxiosAdmin, scAxios } from '../..';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uhlcare_logo from '../../images/uhlcare-logo.webp';
import uhl_logo from '../../images/uhl-logo.webp';
import medix_logo from '../../images/medix-logo.webp';
import PopupIndex4 from '../../component/frontend/PopupIndex4';
import PopupOTP from '../../component/frontend/PopupOTP';
import $ from 'jquery';

const SendOTPMessage = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosSMS.request('/user/sendotp', {
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
const SaveOTPNumber = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/user/saveotpnumber', {
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
const RegisterData = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxios.request('/mmpatientRegistration', {
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
const RegisterSelf = (data) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/patient-register', {
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
const alertStyle = {
  color: 'red',
};
const input_field_css = {
    maxHeight: '50px',
    fontSize: '14px',
    borderColor: '#cccccc',
    borderRadius: '30px'
};
class PopupRegister extends Component {
  state = {
    fields: {},
    errors: {},
    username:'',
    fullname:'',
    date_of_birth:'',
    email:'',
    password:'',
    phone_number:'',
    gender:'',
    house_number:'',
    thana:'',
    district:'',
    patient_id:'',
    showLoginPopup:false,
    showOtpPopup:false,
    showRegisterPopup:true,
    otp:'',
    register_user_id:''
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
      this.setState({
        errors: errors["username"]
      });
  }
    if (!fields["fullname"]) {
        formIsValid = false;
        errors["fullname"] = "*Please enter your fullname.";
        this.setState({
          errors: errors["fullname"]
        });
    }
    if (!fields["date_of_birth"]) {
        formIsValid = false;
        errors["date_of_birth"] = "*Please select your date of birth.";
        this.setState({
          errors: errors["date_of_birth"]
        });
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your Email Address.";
      this.setState({
        errors: errors["email"]
      });
  }
    if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your Password.";
        this.setState({
          errors: errors["password"]
        });
    }
    if (!fields["phone_number"]) {
        formIsValid = false;
        errors["phone_number"] = "*Please enter your phone number.";
        this.setState({
          errors: errors["phone_number"]
        });
    }
    if (!fields["gender"]) {
        formIsValid = false;
        errors["gender"] = "*Please choose your gender.";
        this.setState({
          errors: errors["gender"]
        });
    }
    if (!fields["house_number"]) {
        formIsValid = false;
        errors["house_number"] = "*Please enter your house number.";
        this.setState({
          errors: errors["house_number"]
        });
    }
    if (!fields["thana"]) {
        formIsValid = false;
        errors["thana"] = "*Please enter your house number.";
        this.setState({
          errors: errors["thana"]
        });
    }
    if (!fields["district"]) {
        formIsValid = false;
        errors["district"] = "*Please enter your district.";
        this.setState({
          errors: errors["district"]
        });
    }
   
    return formIsValid;
  }
  handleChange = event => {
    this.setState({ errors:''});
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
        fields
    }, () => this.validateForm());
    this.setState({
        [event.target.name]: event.target.value
    });
    let username=$('#username').val();
    let fullname = $('#fullname').val();
    let date_of_birth = $('#date_of_birth').val();
    let email=$("#email").val();
    let password = $(".Password").val();
    let phone_number = $(".PhoneNumber").val();
    let gender = $("input[name='gender']:checked").val();
    let house_number = $('#house_number').val();
    let thana = $('#thana').val();
    let district = $('#district').val();
    let patient_id= $('#patient_id').val();

    if(username && fullname && date_of_birth && email && password && phone_number && gender && house_number && thana && district || patient_id){
      $(".submit_btn").prop('disabled', false);
      $(".submit_btn").css('background', '#fb6201');
    } else {
      $(".submit_btn").prop('disabled', true);
      $(".submit_btn").css('background', '#41414b');
    }
  }
  handleSubmit = event => {
    event.preventDefault();
  
    if (this.validateForm()) {
      let fields = {};
      fields["username"]="";
      fields["fullname"] = "";
      fields["date_of_birth"] = "";
      fields["email"]="";
      fields["password"] = "";
      fields["phone_number"] = "";
      fields["gender"] = "";
      fields["house_number"] = "";
      fields["thana"] = "";
      fields["district"] = "";
      fields["patient_id"]="";
      this.setState({ fields: fields });
      const user = {
        Username:this.state.username,
        Name: this.state.fullname,
        DateOfBirth: this.state.date_of_birth,
        Email:this.state.email,
        Password: this.state.password,
        PhoneNumber: this.state.phone_number,
        Gender: this.state.gender,
        Address: '',
        FamilyMembers: '',
        HouseNo: this.state.house_number,
        Thana: this.state.thana,
        District: this.state.district,
        PatientId: this.state.patient_id,
      }
  
      RegisterData(user)
      .then(res => {
        const patient_user = {
          username:this.state.username,
          fullname: this.state.fullname,
          date_of_birth: this.state.date_of_birth,
          email:this.state.email,
          password: this.state.password,
          phone_number: this.state.phone_number,
          gender: this.state.gender,
          address: '',
          family_members: '',
          house_number: this.state.house_number,
          thana: this.state.thana,
          district: this.state.district,
          patient_id:this.state.patient_id,
          role: 'patient'
        }
        this.SubmitRegisterSelf(patient_user);
      })
      .catch(err => {
        console.log(err);
      });
      // otp
      //let six_digit_random_number = Math.floor(100000 + Math.random() * 999999);
      let six_digit_random_number = Math.floor(Math.random()*900000) + 100000;
      var encoded_otp = "";
      var otp_number = btoa(six_digit_random_number);
      for (let i=0; i<otp_number.length;i++) {
        var a = otp_number.charCodeAt(i);
        var b = a ^ 10;
        encoded_otp += String.fromCharCode(b);
      }
      var new_encoded_otp = btoa(encoded_otp);
      let messageBody = "Your OTP is "+six_digit_random_number;
      var encoded = "";
      var messageBodyText = btoa(messageBody);
      for (let i=0; i<messageBodyText.length;i++) {
        var c = messageBodyText.charCodeAt(i);
        var d = c ^ 10;
        encoded += String.fromCharCode(d);
      } 
      var encoded_message_body = btoa(encoded);
      let csms_generate_number = Math.random().toString(36).substring(2,11);
      let csmsId = csms_generate_number;
      const data = {
        phone_number: this.state.phone_number,
        message_body: encoded_message_body,
        csms_id: csmsId
      }
      console.log(messageBody);
      SendOTPMessage(data)
      .then(res => {
              // console.log(data);
        if(res.status === 'SUCCESS'){
          this.saveOtp(new_encoded_otp);
          $(".register_popup").css("visibility", 'hidden');
          $(".register_popup").removeClass('show');
          $(".otp_popup").css("visibility", 'visible');
          $(".otp_popup").addClass('show');
          $(".modal-backdrop.fade.show").remove();
          $("body").css("overflow", "");
          $("body").css("padding-right", "");
          this.setState({showOtpPopup: true});
          toast.success('OTP sent to your phone number!', {
            position: toast.POSITION.TOP_LEFT
          });
        } else {
          toast.error('Otp not send', {
            position: toast.POSITION.TOP_LEFT
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    } else {
    }
  }
  SubmitRegisterSelf = (data) => {
    RegisterSelf(data)
    .then(res => {
    
      if(res.status === true){
        this.setState({register_user_id:res.data.id});
        toast.success('User Registered SuccessFully!', {
          position: toast.POSITION.TOP_LEFT
        });
      } else {
        toast.error('User Registered not SuccessFully!', {
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
  saveOtp = (otp) =>{
    const data = {
      phone_number: this.state.phone_number,
      otp_number: otp
    }
    SaveOTPNumber(data)
      .then(res => {
        if(res.data === 'success'){

        } else {
          
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
  closePopup = event => {
    $(".register_popup").css("visibility", 'hidden');
    $(".register_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  componentDidMount(){
    $('input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="month"], input[type="time"], input[type="week"]').each(function() {
      var el = this, type = $(el).attr('type');
      if ($(el).val() === ''){
        $(el).attr('type', 'text');
      } 
      $(el).focus(function() {
          $(el).attr('type', type);
          el.click();
      });
      $(el).blur(function() {
          if ($(el).val() === '') $(el).attr('type', 'text');
      });
    });
  }
  render() {
    const user_data = {
      Username:this.state.username,
      Name: this.state.fullname,
      DateOfBirth: this.state.date_of_birth,
      Password: this.state.password,
      PhoneNumber: this.state.phone_number,
      Gender: this.state.gender,
      Address: '',
      FamilyMembers: '',
      HouseNo: this.state.house_number,
      Thana: this.state.thana,
      District: this.state.district,
      PatientId:this.state.patient_id,
      register_user_id:this.state.register_user_id
    }
    
    // const otp_data={
    //   phone_number: this.state.phone_number,
    //   message_body: encoded_message_body,
    //   csms_id: csmsId,
    // }
    return(
      <div>
        <div className="offcanvas offcanvas-start show register_popup" tabIndex={-1} id="offcanvasRegister" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <h4>Register</h4> 
              <form onSubmit={this.handleSubmit} id="registerform" className="needs-validation" noValidate>
              <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter Username " name="username" id="username" value={this.state.fields.username || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.username}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter Your Full Name " name="fullname" id="fullname" value={this.state.fields.fullname || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.fullname}</span>
                </div>
                <div className="row">
                  <div className="input-group date_of_birth_sec mt-2">
                    <input type="date" placeholder="Enter Date Of Birth" id="date_of_birth" name="date_of_birth" value={this.state.fields.date_of_birth || ''} onChange={this.handleChange} autoComplete="off" className="form-control btnCal-click" style={input_field_css} required/>
                    {/*<i className="moz-cover-clear"></i>*/}
                    {/*<span class="open-button"><button type="button">📅</button></span>*/}
                    <button className="btnCal" style={{"display":"none"}}><span className="fa fa-calendar"></span></button>
                  </div>
                  <span style={alertStyle}>{this.state.errors.date_of_birth}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="email" className="form-control" placeholder="Enter Your Email Address" name="email" id="email" value={this.state.fields.email || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.email}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="password" className="form-control Password" placeholder="Enter Password" name="password" id="password" value={this.state.fields.password || ''} onChange={this.handleChange} required autoComplete="off" maxLength="11" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.password}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control PhoneNumber" placeholder="Enter Phone Number" name="phone_number" id="phone_number" value={this.state.fields.phone_number || ''} onChange={this.handleChange} required autoComplete="off" maxLength="11" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.phone_number}</span>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-check mt-2">
                      <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={this.handleChange} required />
                      <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-check mt-2">
                      <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={this.handleChange} required/>
                      <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                  </div>
                  <span style={alertStyle}>{this.state.errors.gender}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter House Number" name="house_number" id="house_number" value={this.state.fields.house_number || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.house_number}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter Thana" name="thana" id="thana" value={this.state.fields.thana || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.thana}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter District" name="district" id="district" value={this.state.fields.district || ''} onChange={this.handleChange} required autoComplete="off" style={input_field_css}/>
                  </div>
                  <span style={alertStyle}>{this.state.errors.district}</span>
                </div>
                <div className="row">
                  <div className="input-group mt-2">
                    <input type="text" className="form-control" placeholder="Enter Patient ID (OPTIONAL)" name="patient_id" id="patient_id" value={this.state.fields.patient_id || ''} onChange={this.handleChange}   autoComplete="off" style={input_field_css} maxLength="10"/>
                  </div>

                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    <button variant="primary" type="submit" className="btn-links appointment-new submit_btn" id="black-btn" disabled> Register </button>
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
            <PopupOTP showPopup={this.state.showOtpPopup} userData={user_data}/>
          :
            null
        }
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default PopupRegister;