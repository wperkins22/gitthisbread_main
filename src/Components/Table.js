import React, { Component } from 'react';
import './Table.css';
import API from "../utils/API";

var table_status = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
var table_location = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var table_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var i = 0;
var tablenumber = 0;

var table_status_user = "";
var table_location_user = "";
var table_size_user = "";

function userInput() {
	table_status_user = document.getElementById("t-stat").value;
	table_location_user = document.getElementById("t-loc").value;
	table_size_user = document.getElementById("t-size").value;
	console.log(table_status_user);
	console.log(table_location_user);
	console.log(table_size_user);
	const input = {
		num: (tablenumber - 1),
		stat: table_status_user,
		loc: table_location_user,
		size: table_size_user
		};
	API.post('/Tables', {input});
	table_status[tablenumber - 1] = table_status_user;
	table_location[tablenumber - 1] = table_location_user;
	table_size[tablenumber - 1] = table_size_user;
	window.location.reload(false);
}

class Popup extends React.Component {
	render() {
		return (
		<div className='popup'>
			<div className='popup_inner'>
				<h1>{this.props.text}</h1>
				<h1>Table Status: {table_status[tablenumber - 1]}</h1>
				<input type="text" id="t-stat" placeholder={table_status[tablenumber - 1]}></input>
				<h1>Table Number: {tablenumber}</h1>
				<h1>Table Location:</h1>
				<input type="text" id="t-loc" placeholder={table_location[tablenumber - 1]}></input>
				<h1>Table Size:</h1>
				<input type="text" id="t-size" placeholder={table_size[tablenumber - 1]}></input>
				<br />
				<button onClick={this.props.closePopup}>Close!</button>
				<button onClick={userInput}>Save!</button>
			</div>
		</div>
		);
	}
}

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
			table16: 'empty',
			showPopup: false,
		}
    }
    
    togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}
    
    btnTapped(id) {
		this.togglePopup();
		tablenumber = parseInt(id);
		console.log(tablenumber - 1);
		console.log(table_status);
    }
    
    async componentDidMount() {
		var response = await API.get("/Tables");
		console.log(response);
		console.log(response.data.length);
		
		for (i; i < response.data.length; i += 1) {
			console.log(i);
			table_status[i] = response.data[i].tablestatus;
			table_location[i] = response.data[i].tablelocation;
			table_size[i] = response.data[i].tablesize;
		}
	
		this.setState({
			table1: table_status[0],
			table2: table_status[1],
			table3: table_status[2],
			table4: table_status[3],
			table5: table_status[4],
			table6: table_status[5],
			table7: table_status[6],
			table8: table_status[7],
			table9: table_status[8],
			table10: table_status[9],
			table11: table_status[10],
			table12: table_status[11],
			table13: table_status[12],
			table14: table_status[13],
			table15: table_status[14],
			table16: table_status[15]
		});
		
		
	}
	
  render() {
    return (
    <div>
		{this.state.showPopup ?
			<Popup
				text='Table Information!'
				closePopup={this.togglePopup.bind(this)}
				style={{color:'black'}}
			/>
			: null
			}
		<div>
			<span id="1" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table1}</span>
			<span id="2" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table2}</span>
			<span id="3" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table3}</span>
			<span id="4" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table4}</span>
        </div>
        <div>
			<span id="5" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table5}</span>
			<span id="6" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table6}</span>
			<span id="7" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table7}</span>
			<span id="8" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table8}</span>
        </div>
        <div>
			<span id="9" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table9}</span>
			<span id="10" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table10}</span>
			<span id="11" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table11}</span>
			<span id="12" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table12}</span>
        </div>
        <div>
			<span id="13" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table13}</span>
			<span id="14" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table14}</span>
			<span id="15" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table15}</span>
			<span id="16" className="dot" onClick={e => this.btnTapped(e.target.id)}>{this.state.table16}</span>
        </div>
    </div>
    )
    }
}
