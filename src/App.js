import React, { Component } from "react";
import "./App.css";
import DATA from "./utils/store_items.json";

class App extends Component {
  state = {
    actualItems: DATA,
    renderItems: DATA,
    storeItems: []
  };

  addToCart = item => {
    let {storeItems} =this.state

    if (storeItems.includes(item)) {
      if(storeItems[storeItems.indexOf(item)].count < storeItems[storeItems.indexOf(item)].quantityRemaining){
        storeItems[storeItems.indexOf(item)].count += 1 ;
        return this.setState({storeItems});
      }
    } else {
      let {storeItems} =this.state
      item.count = 1;
      storeItems.push(item);
      return this.setState({storeItems});
    }
  };

  incrementItems = (index) => {
    let {storeItems} =this.state
    if(storeItems[index].count < storeItems[index].quantityRemaining){
      storeItems[index].count += 1 ;
      return this.setState({storeItems});
    }
  }

  decrementItems = (index) => {
    let {storeItems} =this.state
    if(storeItems[index].count > 0){
      storeItems[index].count -= 1 ;
      return this.setState({storeItems});
    }
  }

  deleteItem = (index = -1) => {
    if(index == -1) {
      return this.setState({storeItems: []});
    }
    let {storeItems} =this.state
    storeItems.splice(index, 1)
    return this.setState({storeItems});
  }

  displayAddToCartButton = (item) => {
    return item.quantityRemaining > 0 ?
                (<div>
                  <p>{item.quantityRemaining} in stock</p>
                  <button onClick={() => this.addToCart(item)}>
                    Add To Cart
                  </button>
                </div>): (<p style={{color:'red'}}>OUT OF STOCK</p>)
  }

  calculateTotal = () => {
    let totalAmount = 0
    this.state.storeItems.forEach(item => totalAmount += item.price * item.count)
    return totalAmount.toFixed(2)
  }

  confirmPurchase = () => {
    let {storeItems, actualItems} = this.state

    let renderItems = actualItems.map(item => {
      if(storeItems.includes(item)){
        item.quantityRemaining -= storeItems[storeItems.indexOf(item)].count
        item.count = 0
      }
      this.deleteItem()
      return item
    })

    this.setState({renderItems})
  }

  render() {
    return (
      <div>
        <div>
          <h1>Fruit</h1>
          <ul>
            {this.state.renderItems.map(item => (
              <li>
                <img src={item.imgSrc} />
                <p>{item.itemName}</p>
                <p>${item.price}</p>
                {this.displayAddToCartButton(item)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Shopping Cart</h3>
          <p>{this.state.storeItems && this.state.storeItems.length} items</p>
          {this.state.storeItems.map((item, index) => (
            <div key={index}>
              <img src={item.imgSrc} />
              <button onClick={() => this.decrementItems(index)}>-</button>
              <span>{item.count}</span>
              <button onClick={() => this.incrementItems(index)}>+</button>
              <p>@{item.price} each = {(item.price * item.count * 1.0).toFixed(2)}</p>
              <button onClick={() => this.deleteItem(index)}>delete</button>
            </div>
          ))}
          Total: {this.calculateTotal()}
          <button onClick={() => this.deleteItem()}>empty cart</button>
          <button onClick={this.confirmPurchase}>Confirm Purchase</button>
        </div>
      </div>
    );
  }
}

export default App;
