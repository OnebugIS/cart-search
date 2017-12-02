import React from "react";
import "./index.scss";

import {NavLink} from "react-router-dom";
import _ from "lodash";

// 1.(1)
import { connect } from "react-redux";
class Detail extends React.Component{
	constructor(){
		super();
		this.state={
			filminfo:null,
			cartNum:[]
		}
	}

	addToCart(e){

		const idx=e.currentTarget.getAttribute('data-idx');
		this.state.cartNum.push(idx);
		// console.log(this.state.cartNum);


		var newArr=this.props.cart;

		var myIndex=_.findIndex(newArr,{id:idx});

		if(myIndex != -1){
			console.log(111)
		}else{
			newArr.push({id:idx});
		}

		this.props.Cart(newArr);


	}

	componentWillMount() {
		// 在React插件 state->params->chenzhenid 有id值
	    console.log(this.props.match.params.chenzhenid);
	    // 每次请求不同的id
	    axios.get(`/v4/api/film/${this.props.match.params.chenzhenid}?`).then(res=>{
	    	console.log(res.data);
	    	this.setState({
	    		filminfo:res.data.data.film
	    	})
	    	// 1.（3）
	    	this.props.changeTitle(res.data.data.film.name);
	    })




	}

	render(){
		return(
			<div>
				{
					this.state.filminfo?
					<div>
						<img src={this.state.filminfo.cover.origin}/>
						<h2>{this.state.filminfo.name}</h2>
						<p>{this.state.filminfo.synopsis}</p>
						<NavLink to="/cart" data-idx={this.state.filminfo.id} onClick={(e)=>this.addToCart(e)}>立即购票</NavLink>
					</div>
					:null
				}
			</div>
			)
	}
}
// 1。(1)
export default connect(
		(state)=>{
			console.log(state.cart)
			return {
				cart:state.cart
			}
		}
		,
		{
			changeTitle:(name)=>{
				//1.  自动进行dispatch 到 reducer
				return {
					type:"changeTitleReducer",
					payload:name
				}
			},
			Cart:(obj)=>{
				return {
					type:"cart",
					payload:obj
				}
			}
		}		
	)(Detail);