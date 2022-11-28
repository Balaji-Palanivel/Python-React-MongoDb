import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      URL: "http://127.0.0.1:5000/",
      sort_item: "asc",
      sorting_field: '',
      filterd: false,
      add_page: true

    };
    this.api_call(this.state.URL)
    this.sorting_item = this.sorting_item.bind(this)
  }
  api_call(url1) {
    console.log("helooooooo")
    axios({
      method: "GET",
      url: url1,
    })
      .then((response) => {
        this.setState({ 'data1': response.data })
      })
  }
  sorting_item(e) {
    this.setState({sorting_field : e})
    if (this.state.sort_item == 'asc') {
      this.api_call("http://127.0.0.1:5000/?sort=asc&sortby=" + e)
      this.setState({ sort_item: 'dsc' })
    }
    if (this.state.sort_item == 'dsc') {
      this.api_call("http://127.0.0.1:5000/?sort=dsc&sortby=" +e)
      this.setState({ sort_item: 'asc' })
    }
  }

  filtered_item(item) {
    if (item.length > 0) {
     if (this.state.sort_item == 'asc') {
      this.api_call("http://127.0.0.1:5000/?sort=asc" + '&filter=' + item)
    }
     if (this.state.sort_item == 'dsc') {
      this.api_call("http://127.0.0.1:5000/?sort=dsc" + '&filter=' + item)
    }
  }
}
  add_new_ele(e) {
    
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/add",
      contentType: "application/json",
      data: JSON.stringify({ name: document.getElementById('form4Example2').value, email: document.getElementById('form4Example4').value }),
      dataType: "json"
    });
    
    window.location.reload();
  }


  render() {
    return (
      <div>
        <div className='row'>
          <div className="input-group" style={{ Left: "10px" }}>
            <div id="search-autocomplete" className="col-sm-2 offset-sm-9 mt-5 mb-4 form-outline">
              <input type="search" id="form1" className="form-control" />
            </div>
            <button onClick={e => this.filtered_item(document.getElementById('form1').value.toLowerCase())} type="button" className="btn btn-primary" style={{ marginTop: "48px", marginBottom: "57px" }}>
              <i className="fa fa-fw fa-search"></i>
            </button>
          </div>

        </div>
        <div className='container'>
          <table className="table table-striped table-hover table-bordered" style={{ marginTop: "60px", width: "1400px" }}>
            <thead>
              <tr>
                <td>S.No </td>
                <td >Name <i onClick={e => this.sorting_item('name')} className="fa fa-fw fa-sort"></i> </td>
                <td>Email <i onClick={e => this.sorting_item('email')} className="fa fa-fw fa-sort"></i> </td>
              </tr>
            </thead>
            <tbody>{this.state.data1.map((x, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td >{x.name}</td>
                <td>{x.email}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>



        <button type="button" class="btn btn-lg btn-primary" style={{ marginLeft: "900px" }} data-mdb-toggle="modal" data-mdb-target="#exampleModal">
          ADD
        </button>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Profile</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="card-body" >
                  <div className="container d-flex ">

                    <form >
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Name </span>
                        <input type="text" class="form-control" id="form4Example2" aria-label="Username" aria-describedby="addon-wrapping" />
                      </div><br />
                      <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Email </span>
                        <input type="text" class="form-control" id="form4Example4" aria-label="Username" aria-describedby="addon-wrapping" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                <button type="button" data-mdb-dismiss="modal" onClick={e => this.add_new_ele(e)} class="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }
}