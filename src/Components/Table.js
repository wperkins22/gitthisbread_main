import React, { Component } from 'react';
import './Table.css';
import API from "../utils/API";

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.btnTapped = this
            .btnTapped
            .bind(this);
            
        this.state = {
			table1: 'empty',
			table2: 'empty',
			table3: 'empty',
			table4: 'empty',
			table5: 'empty',
			table6: 'empty',
			table7: 'empty',
			table8: 'empty',
			table9: 'empty',
			table10: 'empty',
			table11: 'empty',
			table12: 'empty',
			table13: 'empty',
			table14: 'empty',
			table15: 'empty',
			table16: 'empty'
		}
    }
    btnTapped() {
		console.log("test");
    }
    
    async componentDidMount() {
		var response = await API.get("/Tables");
		console.log(response);
		this.setState({
			table1: response.data[0].tablestatus,
			table2: response.data[1].tablestatus,
			});
	}
	
  render() {
    return (
    <div>
		<div>
			<span id="table1" className="dot" onClick={this.btnTapped}>{this.state.table1}</span>
			<span id="table2" className="dot" onClick={this.btnTapped}>{this.state.table2}</span>
			<span id="table3" className="dot" onClick={this.btnTapped}>{this.state.table3}</span>
			<span id="table4" className="dot" onClick={this.btnTapped}>{this.state.table4}</span>
        </div>
        <div>
			<span id="table5" className="dot" onClick={this.btnTapped}>{this.state.table5}</span>
			<span id="table6" className="dot" onClick={this.btnTapped}>{this.state.table6}</span>
			<span id="table7" className="dot" onClick={this.btnTapped}>{this.state.table7}</span>
			<span id="table8" className="dot" onClick={this.btnTapped}>{this.state.table8}</span>
        </div>
        <div>
			<span id="table9" className="dot" onClick={this.btnTapped}>{this.state.table9}</span>
			<span id="table10" className="dot" onClick={this.btnTapped}>{this.state.table10}</span>
			<span id="table11" className="dot" onClick={this.btnTapped}>{this.state.table11}</span>
			<span id="table12" className="dot" onClick={this.btnTapped}>{this.state.table12}</span>
        </div>
        <div>
			<span id="table13" className="dot" onClick={this.btnTapped}>{this.state.table13}</span>
			<span id="table14" className="dot" onClick={this.btnTapped}>{this.state.table14}</span>
			<span id="table15" className="dot" onClick={this.btnTapped}>{this.state.table15}</span>
			<span id="table16" className="dot" onClick={this.btnTapped}>{this.state.table16}</span>
        </div>
    </div>
    )
    }
}
