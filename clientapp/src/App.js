import React,  { Component }  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = { loading: true };

  constructor(props) {
      super(props);
      this.state = {  
        loading :true,
        items: '',
        customerid: '',
        quantities: [],
        customername:'',
        totalPrice:'',
        totalTax:'',
        totalItem:[]
      };


      this.handleChange = this.handleChange.bind(this);
  }

//Get all items
async callAPI(){
  await fetch('http://localhost:9000/api/item',{
      method: 'GET',
  })
  .then((response) => 
      response.json()
  )
  .then((result) => {
     this.setState({items: result});
     this.setState({loading: false});
  })
  .catch((error)=>{
    console.log("error"+error.message);
  });
}



  componentDidMount() {
      this.callAPI();
  }

renderItems() {
    const itemList = [];
    
    for(let i = 0; i < this.state.items.length; i++) {
        let itemid = this.state.items[i].itemid;
        // let price = this.state.items[i].price;

          itemList.push(
         
            <tr>
                <td>{itemid}</td>
                {/* <td>{price}</td> */}
                <td><input type="number" value={this.state.quantities[i] ? this.state.quantities[i] : 0} name={this.state.quantities[i]}  onChange={this.handleChange1.bind(this, i)} /></td>
            </tr>
          );
     
       
    }

    return (
        <div className = 'inputs'>
           <table className="table">
               <thead>
                <tr>
                <th scope="col">Item Id</th>
                {/* <th scope="col">Price</th> */}
                <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
              {itemList}
              </tbody>
          </table>
        <hr/>
      </div>
    );
}

handleChange = (event) => {
    this.setState({customerid: event.target.value});

}

handleChange1(i, e) {
    this.setState({
        quantities: { ...this.state.quantities, [i]: e.target.value}
    });
  }


//Send customer id and quantity to server and get response
handleSubmit = (event)=>{
    fetch('http://localhost:9000/api/calpay',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state)
    })
    .then((response) => 
        response.json()
    )
    .then((result) => {
       this.setState({customername: result.customername});
       this.setState({totalPrice: result.totalPrice});
       this.setState({totalTax: result.totalTax});
       this.setState({totalItem: result.items});
    })
    .catch((error)=>{
      console.log("error"+error.message);
    });
    event.preventDefault();
}


renderResponseItems() {
  const responseItemList = [];
  for(let i = 0; i < this.state.totalItem.length; i++) {
      let responseTotalItemid = this.state.totalItem[i].itemid;
      let responseTotalPrice = this.state.totalItem[i].price;

      if(responseTotalPrice > 0){
      responseItemList.push(
          
            <tbody>
              <tr>
                  <td>{responseTotalItemid}</td>
                  <td>{responseTotalPrice}</td>
              </tr>
            </tbody>
      );  
    }

      
  }

  return (
      <div className = 'inputs'>
            <table className="table">
             <thead>
               <tr>
                  <th scope="col">Item Id</th>
                  <th scope="col">Total Price</th>
               </tr>
              </thead>
              {responseItemList}
            </table>    
      <hr/>
    </div>
  );
}

loader(){
  return (
    <div style={{ height:"100px"}}>
    <div style={{left:"50%", top:"50%", bottom:"50%", right:"50%"  }}>
    <div className="spinner-border " >
    <button class="btn btn-primary" disabled>
      <span class="spinner-border spinner-border-sm"></span>
       Please Wait while data is loading..
     </button>
  </div> 
  </div>
  </div>
  )
}

  render() {

    return (
      
        <div className="App" style={{ marginTop: "20px"}}>
          <div className="container mrgnbtm" >
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                <h5 className="card-header"><p class="text-primary bold">Order Form</p></h5>
                  <form onSubmit={this.handleSubmit} >
                      <br/>
                      <div className="input-group input-group-sm mb-3" style={{  left:"30%"}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text text-primary" id="inputGroup-sizing-sm">Customer Id   </span>
                          </div>
                           <input type="text"  value={this.state.customerid} onChange={this.handleChange}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" style={{ maxWidth: "20%"}} />                      
                      </div>
                      {this.state.loading === true ? this.loader() : this.renderItems() }
 
                      <input type="submit" value="Submit" className="btn btn-primary"/><br/><br/>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
              <div className="card">
              <h5 className="card-header"><p class="text-primary bold">Receipt</p></h5>
                  <table className="table">
                      <thead>               
                        <tr>
                            <td>
                            <div className="input-group input-group-sm mb-3">
                               <div className="input-group-prepend">
                                  <span className="input-group-text text-primary" id="inputGroup-sizing-sm">Customer Name   </span>
                                </div>
                                <input type="text" value={this.state.customername}  readOnly className="form-control font-weight-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>                      
                              </div>                            
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className="input-group input-group-sm mb-3">
                               <div className="input-group-prepend">
                                  <span className="input-group-text text-primary" id="inputGroup-sizing-sm">Total Amount </span>
                                </div>
                                <input type="text" value={this.state.totalPrice}  readOnly className="form-control font-weight-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>                      
                              </div>                            
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className="input-group input-group-sm mb-3">
                               <div className="input-group-prepend">
                                  <span className="input-group-text text-primary" id="inputGroup-sizing-sm">Total tax</span>
                                </div>
                                <input type="text" value={this.state.totalTax}   readOnly className="form-control font-weight-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>                      
                              </div>                               
                            </td>
                        </tr>
                        </thead>
                  
                        <tbody>
                         
                        </tbody>

                    </table>
                    {this.renderResponseItems()}
              </div>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            
          </div>
        </div>

    );
  }
}

export default App;