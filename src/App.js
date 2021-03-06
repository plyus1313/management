import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      items: [],
      result: ""
    };

    this.loadItems = this.loadItems.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.totalSum = this.totalSum.bind(this);
    this.onClearScreen = this.onClearScreen.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  onButtonSubmit(event) {
    var command = this.state.input;
    const inputWords = command.match(/(\w|-|\.)+|"[^"]+"/g); // split tokens by spaces or quotes
    if (inputWords == null) {
      alert("Please, input valied command");
      return false;
    }
    const action = inputWords[0];
    const params = inputWords.slice(1, inputWords.length);

    if (action === "add") {
      this.addItem(params);
    } else if (action === "list") {
      this.listItems();
    } else if (action === "clear") {
      this.delItem(params);
    } else if (action === "total") {
      this.totalSum(params);
    } else {
      alert("Please, input valied command");
      return false;
    }
  }

  validateDataAdd(fields) {    
    if (fields.length !== 4) {
      alert("Input Error");
      return false;
    }
    var arrD = fields[0].split("-");
    var d = new Date(arrD[0], (arrD[1] -= 1), arrD[2]);

    if (
      d.getFullYear() !== parseInt(arrD[0], 10) ||
      d.getMonth() !== parseInt(arrD[1], 10) ||
      d.getDate() !== parseInt(arrD[2], 10)
    ) {
      alert("Please, enter correct date !");
      return false;
    }

    if (!fields[1] || isNaN(parseFloat(fields[1]))) {
      alert("Please, enter correct amount of money");
      return false;
    }
    if (fields[2].length !== 3) {
      alert("Please, enter currency");
      return false;
    }
    if (!fields[3].trim() && fields[3] !== 0) {
      alert("Please, enter name");
      return false;
    }
  }

  clearData(dateStr) {
    var arrC = dateStr.split("-");
    var c = new Date(arrC[0], (arrC[1] -= 1), arrC[2]);
    if (
      c.getFullYear() !== parseInt(arrC[0], 10) ||
      c.getMonth() !== parseInt(arrC[1], 10) ||
      c.getDate() !== parseInt(arrC[2], 10)
    ) {
      alert("Please, enter date correct");
      return false;
    }
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  loadItems() {
    fetch("http://localhost:3000/", {
      method: "get",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(response => {        
        this.setState({ items: response });
      });
  }

  addItem(fields) {
    if (this.validateDataAdd(fields) === false) {
      return false;
    }

    var nameWOQuotes = fields[3].replace(/"/g, ""); // remove redundant quotes
    const item = {
      expense: fields[0],
      money: fields[1],
      currency: fields[2],
      name: nameWOQuotes
    };

    fetch("http://localhost:3000/add", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item)
    }).then(res => {
      this.listItems();
    });
  }

  listItems() {
    this.loadItems();
  }

  delItem(fields) {
    if (fields.length !== 1) {
      alert("Invalid input for clear");
      return false;
    }
    if (this.clearData(fields[0]) === false) {
      return false;
    }
    fetch(
      "http://localhost:3000/clear?expense=" + fields[0],
      {
        method: "delete",
        headers: { "Content-type": "application/json" }
      }
    ).then(res => {
      this.listItems();
    });
  }

  totalSum(fields) {
    var currency = "PLN";
    if (fields.length > 1) {
      alert("Invalid input for total sum");
      return false;
    }
    if (fields[0]) {
      currency = fields[0];
    }

    fetch(
      "http://localhost:3000/total?currency=" + currency,
      {
        method: "get",
        headers: { "Content-type": "application/json" }
      }
    )
      .then(res => res.json())
      .then(res => {
        let result = res["total"];
        result = (Math.round(100 * result) * 1.0) / 100.0;        
        this.setState({
          result: { type: "sum", sum: result, currency: currency }
        });
      });
  }

  onClearScreen(event) {
    this.setState({
      input: "",
      items: [],
      result: ""
    });
  }

  render() {
    var res_box = "";
    if (this.state.result) {
      if (this.state.result.type === "sum") {
        res_box = (
          <div className="result">
            TOTAL:{" "}
            <span className="value">
              {this.state.result.sum}&nbsp;{this.state.result.currency.toUpperCase()}
            </span>
          </div>
        );
      }
    }
    return (
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa3 w-60 center"
            type="text"
            onChange={this.onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={this.onButtonSubmit}
          >
            Enter
          </button>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={this.onClearScreen}
          >
            Clear Screen
          </button>
        </div>
        {res_box}
        <div>
          {this.state.items.map((item, i) => (
            <div className="row">
              <div className="col">{item.name}</div>
              <div className="col">{item.money}</div>
              <div className="col">{item.currency}</div>
              <div className="col">{item.expense}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
