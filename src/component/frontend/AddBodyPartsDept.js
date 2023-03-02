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


const alertStyle = {
  color: 'red',
};
class AddBodyPartsDept extends Component {

    handleChange = event => {
        // /*this.setState({ errors:''});
        // let fields = this.state.fields;
        // fields[event.target.name] = event.target.value;
        /*this.setState({
            fields
        }, () => this.validateForm());*/
        
        this.setState({
            [event.target.name]: event.target.value
        });
      }

    handleSubmit = event => {
        event.preventDefault();
        
      }

  closePopup = event => {
    $(".body_parts_dept_popup").css("visibility", 'hidden');
    $(".body_parts_dept_popup").removeClass('show');
    $(".modal-backdrop.fade.show").remove();
    $("body").css("overflow", "");
    $("body").css("padding-right", "");
  }
  render() {
    return(
      <div>
        <div className="offcanvas offcanvas-start body_parts_dept_popup" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{"visibility":"visible"}}>
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
              <h4>Add New Department</h4> 
              <form onSubmit={this.handleSubmit} id="patientIdForm" className="needs-validation" noValidate>

                <input placeholder="Enter Your Department Name" type="text" id="department_name" name="department_name" value={this.state.fields.department_name} onChange={this.handleChange} autoComplete="off" className="form-control" required/>
                <p style='color: #6400ff;'>To get Your Patient ID Please Contact with Hospital Administration.</p>
                <span style={alertStyle}>{this.state.errors.department_name ? this.state.errors.department_name :''}</span>
                <div className="row mt-3">
                  <div className="col-12">
                    <button type="submit" className="btn-links appointment-new" id="black-btn" disabled> Save </button>
                  </div> 
                </div>
              </form>
            </div>
          </div>
        </div>
       
        <ToastContainer autoClose={5000} />
      </div>
    )
  } 
}
export default AddBodyPartsDept;