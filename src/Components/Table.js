import React, { Component } from 'react';
import './Table.css';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.btnTapped = this
            .btnTapped
            .bind(this);
    }
    btnTapped() {
        alert('yo yo yo');
    }
  render() {
    return (
    <div>
        <span class="dot" onClick={this.btnTapped}></span>
        <span class="dot" onClick={this.btnTapped}></span>
        <span class="dot" onClick={this.btnTapped}></span>
        <span class="dot" onClick={this.btnTapped}></span>
    </div>
    )
    }
}
