import React from "react";
import "./index.scss";

// 数据进行stare传入
import { connect } from "react-redux";
class Card extends React.Component{
	constructor(){
		super();
		this.state={
			datalist:[]
		}
	}

	// componentWillMount(){
	// 	axios.get("/v4/api/city?").then(res=>{
	// 		console.log(res.data.data.cities);
	// 	})
 // 	}
 // 	
 	
 	handleClick(e){
 		var myValue=e.target.value;
 		var shuzu=[];
 		var that=this;
 		console.log(myValue);
 		axios.get("/v4/api/cinema?").then(res=>{
 			res.data.data.cinemas.map(item=>{
 				if (item.name.indexOf(myValue)!=-1) {
 					shuzu.push(item)
 				}
 			})
 			that.props.getCards(shuzu)
 		})
 	}

 	componentDidMount() {
 	    this.props.getCard();

 	}

	render(){
		return (
			<div>
				<input type="text" placeholder="影院搜索" name="name" id="tet" onChange={this.handleClick.bind(this)}/>
				{
					this.props.datalist.map(item=>
						<li key={item.id}>
							<div id="div">
								<p>{item.name}</p>
								<i>{item.pinyin}</i>
								<span>{item.address}</span>
							</div>
						</li>
					)
				}		
			</div>
		)
	}
}

// export default Card;
// connect两个值 第一个值是接收 第二值是传送
export default connect(
	(state)=>{
		console.log(state.address);
		return {
			datalist:state.address
		}
	},
	{
		getCard:()=>{
			//异步action 借助 redux-promise 中间件实现 
			return (dispatch)=>{
				axios.get("/v4/api/cinema?").then(res=>{
					    	console.log(res.data);
					    	// 此时就异步拿到了数据
					    	dispatch ({
					    		type:"cardlist",
					    		payload:res.data.data.cinemas
					    	})
					})
			}
		},
		getCards:(a)=>{
			//异步action 借助 redux-promise 中间件实现 
			return (dispatch)=>{
				axios.get("/v4/api/cinema?").then(res=>{
					    	console.log(res.data);
					    	// 此时就异步拿到了数据
					    	dispatch ({
					    		type:"cardlist",
					    		payload:a
					    	})
					})
			}
		}
	}
	)(Card);