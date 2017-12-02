import React from "react";
import "./index.scss";
import {connect} from "react-redux";
class Film extends React.Component{
	constructor(){
		super();
		this.state={
		}
	}


	render(){
		return (
			<div id="div">
				<div className="left">
					<h2>商品</h2>
					<br/>
					<h3>{this.props.title}</h3>
				</div>

				<div className="right">
					<h2>价格</h2>
					<span>32.8元</span>
				</div>
			</div>
			)
	}
}
export default connect(
		(state)=>{
			console.log(state.title);
			return {
				title:state.title

			}
		},
		null
	)(Film);
