import React, { Component } from "react";
import { Query } from "react-apollo";
import {GET_CURRENCIES} from '../../graphql/querys';
import cn from "classnames";
import styles from './Currensy.module.css'


export default class Currensy extends Component {

	state = {
		toggle: false
	}

 handleDropMenu = () => {
   
	 this.setState({toggle: !this.state.toggle})
	 /*
		const selectSingle = e.target;
		if ('active' === selectSingle.getAttribute('data-state')) {
		  selectSingle.setAttribute('data-state', '');
		} else {
		  selectSingle.setAttribute('data-state', 'active');
		}
		*/
	  }

	render() {  
    console.log(this.state.toggle)
  return (
	<div className={styles.select} onClick={this.handleDropMenu} data-state="">
	  <div className={!!this.state.toggle ? `${styles.select__title}`: `${styles.select__title} ${styles.active}`} data-default="$">$</div>
		<Query query={GET_CURRENCIES}>
		{({ loading, data, error }) => {
			if (loading) return "Loading...";
			if (error) return "Error";
			return data?.currencies.map((curr, index) => {
			return (
			<div className={!!this.state.toggle ? `${styles.select__content}`:`${styles.select__content} ${styles.active}`  } key={curr.label}>
				<input id={"singleSelect" + index} 
				onChange={(e)=>this.handleChangeInput(e)} 
				className={styles.select__input} 
				type="radio"
				name="singleSelect"/>
				<label forhtml={"singleSelect" + index} className={styles.select__label}>{curr.symbol} {curr.label}</label>
			</div>      
			
			);
			});
		}}
		</Query>
     </div>
  



  );
 }
}