import React, { Component,useEffect, useState } from 'react';
import { Route } from 'react-router';
import Header from '../../component/frontend/Header';
import Footer from '../../component/frontend/Footer';
// import AddBodyPartsDept from '../../component/frontend/AddBodyPartsDept';
import { scAxios, scAxiosSMS, scAxiosAdmin } from '../..';

const getBodyLinkedData = (data) => {
    return new Promise((resolve, reject) => {
      const req = scAxiosAdmin.request('/body-linked-departements', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
        },
        params: {
            ...data
        }  
      });
      console.log(data);
      req.then(res => resolve(res.data))
          .catch(err => reject(err));
    });
  }
class BodyPartDept extends Component {
    // const [opportunities]= useState([]);
    
    // handleChange = event => {
    //     // /*this.setState({ errors:''});
    //     let fields = this.state.fields;
    //     fields[event.target.name] = event.target.value;
    //     /*this.setState({
    //         fields
    //     }, () => this.validateForm());*/
    //     getBodyLinkedData();
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    //   }
  render(){
    return(
      <div>
        <Route component={Header}/>
        <section className="termscondbody mt-5 mb-5">
          <div className="container">
          <div className="container">
          <div className="row">
            <div className='col-12'>
                {/* <Link className='btn btn-primary mb-2 float-end' to={""}>
                    Add
                </Link> */}
            {/* <AddBodyPartsDept trigger={<button> Add </button>} /> */}
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Body Part</th>
                                    <th>Department</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(getBodyLinkedData)}
                                {/* {
                                    products.length > 0 && (
                                        products.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
          </div>
        </section>
        <Route component={Footer} />
      </div>
    )
  }
}
export default BodyPartDept;

