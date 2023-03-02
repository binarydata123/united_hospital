import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { scAxiosAdmin } from '../..';
import { API_TOKEN_NAME,IMAGE_URL } from '../../constants';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from '../../component/admin/LeftSidebar';
import TopHeader from '../../component/admin/TopHeader';
// import Avatar from '../../images/avatar_circle.png';

const getSinglePackageDatadetails = (id) => {
  return new Promise((resolve, reject) => {
    const req = scAxiosAdmin.request('/bodylink/getsinglepagedata/'+id, {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(API_TOKEN_NAME)
      }
    });
    req.then(res => resolve(res.data))
        .catch(err => reject(err));
  });
}

class ViewBodyLink extends Component {
   state = {
      fields: {},
      errors: {},
      publications: [],
      id: '', 
      bodypart_name:'',
      bodypart_desc: '',
      department_name: '',
      package_dept_id:'',
      gender: '',
      package_age: '',
      package_pre_existing_conditon_id: '',
  }
  refreshgetSinglePackageDataDetails = (id) => {
    getSinglePackageDatadetails(this.props.match.params.id)
    .then(res => {
      if(res.status===true){
        var records = res.data;
        this.setState({
            id: records.id, 
            department_name: records.department_name, 
            bodypart_name: records.bodypart_name,
            bodypart_desc: records.department_desc_one,
            package_dept_id: records.department_name,
            gender: records.gender,
            package_age: records.age,
            package_pre_existing_conditon_id: records.pre_name,
        });
      } else {
        this.setState({ 
            id: '', 
            department_name:'',
            bodypart_name:'',
            bodypart_desc: '',
            package_image: '',
            package_amount: '',
            package_dept_id:'',
            gender: '',
            package_age: '',
            package_pre_existing_conditon_id: '',
        });
      }
    })
    .catch(err => {
          console.log(err);
    });
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    this.setState({id:id});
    this.refreshgetSinglePackageDataDetails(this.props.match.params.id);
  
  }
  render() {
    return (
      <div className="fixed-left">
        <div id="wrapper">
          <Route component={LeftSidebar} />
          <div className="content-page">
            <div className="content">
              <Route component={TopHeader} />
              <div className="page-content-wrapper">
                <div className="col-lg-12">
                  <div className="card m-b-20">
                    <div className="card-body">
                      <section className="view-page">
                        <div className="container">
                          <div className="view-page-box">
                            <div className="row">
                              <div className="col-sm-3">
                                <div className="view-img">
                                  {/* { this.state.package_image
                                    ?
                                      <img src={IMAGE_URL+'Packagesimg/'+this.state.package_image} alt=""/>
                                    :
                                      <img src={Avatar}  alt=""/>
                                  } */}
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="view-text">
                                  <h2>{this.state.department_name}</h2>
                                  <p><b>{this.state.bodypart_name}</b></p>
                                </div>
                              </div>
                              <div className="col-sm-3">
                                <div className="edit">
                                  <a  href={'/editbodylink/'+this.props.match.params.id}><i className="fa fa-pencil"></i></a>
                                </div>
                              </div>
                            </div>
                            <hr/>
                            <h3>Decription</h3>
                               <h4 className="text-center"><b>{this.state.bodypart_name}</b></h4>
                            <p dangerouslySetInnerHTML={{ __html: this.state.department_description }}></p>
                            <hr/>
                            <div className="row">
                              <div className="col-lg-4 col-md-12">
                                <div className="edu-part">
                                  <h3>Gender</h3>
                                  {this.state.gender}
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-12">
                                <div className="edu-part">
                                  <h3>Age Range</h3>
                                  {this.state.package_age}
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-12">
                                <div className="edu-part">
                                  <h3>Pre conditon</h3>
                                  {this.state.package_pre_existing_conditon_id}
                                </div>
                              </div>
                            </div> 
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewBodyLink;