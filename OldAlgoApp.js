import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class Button extends Component {
	render() {
		return(
			<View style={{flex: 1, maxHeight: 100, justifyContent: 'center', alignItems: 'center'}}>
				<TouchableOpacity onPress={this.props.onClick} style={{ height: '100%', width: '100%', backgroundColor: 'black'}}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{color: 'white', fontSize: 30}}>{this.props.value}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

class Keypad extends Component {
	render() {
		return(
			<View style={{flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
				<View style={{flex: 2, flexDirection: 'row'}}>
					<Button value='1' onClick={()=> this.props.onClick('1')}/>
                    <Button value='2' onClick={()=> this.props.onClick('2')}/>
                    <Button value='3' onClick={()=> this.props.onClick('3')}/>
                    <Button value='+' onClick={()=> this.props.onClick('+')}/>
				</View>
				<View style={{flex: 2, flexDirection: 'row'}}>
					<Button value='4' onClick={()=> this.props.onClick('4')}/>
                    <Button value='5' onClick={()=> this.props.onClick('5')}/>
                    <Button value='6' onClick={()=> this.props.onClick('6')}/>
                    <Button value='_' onClick={()=> this.props.onClick('-')}/>
				</View>
				<View style={{flex: 2, flexDirection: 'row'}}>
					<Button value='7' onClick={()=> this.props.onClick('7')}/>
                    <Button value='8' onClick={()=> this.props.onClick('8')}/>
                    <Button value='9' onClick={()=> this.props.onClick('9')}/>
                    <Button value='x' onClick={()=> this.props.onClick('*')}/>
				</View>
				<View style={{flex: 2, flexDirection: 'row'}}>
					<Button value='&bull;' onClick={()=> this.props.onClick('.')}/>
                    <Button value='0' onClick={()=> this.props.onClick('0')}/>
                    <Button value='&#11013;' onClick={()=> this.props.onClick('del')}/>
                    <Button value='/' onClick={()=> this.props.onClick('/')}/>
				</View>
				<View style={{flex: 2, flexDirection: 'row'}}>
					<Button value='(' onClick={()=> this.props.onClick('(')}/>
                    <Button value=')' onClick={()=> this.props.onClick(')')}/>
                    <Button value='AC' onClick={()=> this.props.onClick('AC')}/>
                    <Button value='=' onClick={()=> this.props.onClick('=')}/>
				</View>
			</View>
		)
	}
}

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			expr: "",
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(char) {
		var newExpr = this.state.expr
		var lastIn = ""
		if(newExpr.length !== 0) {
			lastIn = newExpr[newExpr.length - 1]
		}
		if(char === '0') {
			if(lastIn === '+' || lastIn === '-' || lastIn === '*' || lastIn === '/' || lastIn === "") {
				return
			}
		}
        if(char === '='){
			try {
				var expr2 = eval(newExpr)
				if(expr2 !== undefined)
					this.setState({expr: expr2})
				else
					return
			}
			catch(err) {
				this.setState({expr: 'Error'})
			}
        }
        else if(char === 'AC'){
            this.setState({expr: '',})
        }
        else if(char === 'del'){
			try{
				this.setState({expr: newExpr.substr(0, newExpr.length - 1), })
			}
			catch(err) {
				return;
			}
        }
        else{
            this.setState({expr: newExpr + char,})
        }
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'rgb(25, 25, 25)'}}>
				<View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'flex-end', padding: '5%'}}>
					<Text style={{color: 'white', fontSize: 34}}>{this.state.displayText}</Text>
				</View>
				<Keypad onClick={(char) => this.handleClick(char)}></Keypad>
			</View>
		)
	}
}

export default App