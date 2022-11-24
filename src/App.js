import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data1: [],
        URL: "http://127.0.0.1:5000/",
        sort_item: "asc"
        
      };
      this.api_call(this.state.URL)
      this.sorting_item = this.sorting_item.bind(this)
    }
    api_call(url1) {
      axios({
        method: "GET",
        url: url1,
      })
        .then((response) => {
          this.setState({ 'data1': response.data })
        })
    }
    sorting_item(e) {      
      if (this.state.sort_item == 'asc') {
        this.api_call("http://127.0.0.1:5000/?sort=asc") 
        this.setState({ sort_item : 'dsc'})   
      }
      if (this.state.sort_item == 'dsc') {
        this.api_call("http://127.0.0.1:5000/?sort=dsc")
        this.setState({ sort_item : 'asc'})  
    }
  }
    filtered_item(item){  
      if (this.state.sort_item == 'asc') {        
        this.api_call("http://127.0.0.1:5000/?sort=asc"+'&filter='+item)
      }
      if (this.state.sort_item == 'dsc') {
        this.api_call("http://127.0.0.1:5000/?sort=dsc"+'&filter='+item)
     }
    }



//   api_call() {
//     console.log("Again again")
//     axios({
//       method: "GET",
//       url: this.state.URL,
//     })
//       .then((response) => {
//         this.setState({ 'data1': response.data })
//       })
//   }
//   sorting_item(e) {
    
//     if (this.state.sort_item == 'asc') {
//       console.log("sort asc")
//       this.setState({ URL: "http://127.0.0.1:5000/?sort=asc", sort_item: 'dsc' });
//       this.api_call()
//     }
//     if (this.state.sort_item == 'dsc') {
//       console.log("sort dsc")
//       this.setState({ URL: "http://127.0.0.1:5000/?sort=dsc", sort_item: 'asc' });
//       this.api_call()
//     }
//   }
//   filtered_item(item){  
//     if (this.state.sort_item == 'asc') {
//       this.setState({ URL: "http://127.0.0.1:5000/?sort=asc"+'&filter='+item });
//       this.api_call()
//     }
//     if (this.state.sort_item == 'dsc') {
//       this.setState({ URL: "http://127.0.0.1:5000/?sort=dsc"+'&filter='+item });
//       this.api_call()
//     }
//    }

  render() {
    return (
      <div>        
          <div className='row'>
          <div className="input-group" style={{Left: "10px"}}>
            <div id="search-autocomplete" className="col-sm-2 offset-sm-9 mt-5 mb-4 form-outline">
              <input type="search" id="form1" className="form-control" />
            </div>
            <button type="button" className="btn btn-primary" style={{marginTop : "48px",marginBottom : "57px"}}>
              <i onClick={e => this.filtered_item(document.getElementById('form1').value)} className="fa fa-fw fa-search"></i>
            </button>
          </div>

        </div>
        <div className='container'>
          <table className="table table-striped table-hover table-bordered" style={{ marginTop: "60px", width: "1400px" }}>
            <thead>
              <tr>
                <td>S.No </td>
                <td >Name <i onClick={e => this.sorting_item(e)} className="fa fa-fw fa-sort"></i> </td>
                <td>Email </td>
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
      </div>

    )
  }
}