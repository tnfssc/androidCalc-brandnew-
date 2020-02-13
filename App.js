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
			displayText: ""
		}
		this.handleClick = this.handleClick.bind(this)
		this.solveIt = this.solveIt.bind(this)
		this.clearAll = this.clearAll.bind(this)
		this.delChar = this.delChar.bind(this)
		this.addChar = this.addChar.bind(this)
	}

	solveIt() {
		var solved = ""
		const len = this.state.displayText.length
		if(len === 0)
			return
		for(var i=0; i < len; i++) {
			const char = this.state.displayText[i]
			const prevChar = ''
			const nextChar = ''
			i === 0 ? prevChar = '' : prevChar = solved[solved.length - 1]
			i === len - 1 ? nextChar = '' : nextChar = this.state.displayText[i + 1]

			if((prevChar === '+' || prevChar === '-' || prevChar === '*' || prevChar === '/' || prevChar === '') && char === '0') {
				if(prevChar === '*' && (nextChar === '+' || nextChar === '-' || nextChar === '*' || nextChar === '/' || nextChar === '')) {
					solved = solved + char
				}
			} else if(char === '/' && prevChar === '/') {
				solved = solved + '*' //gotta change later
			} else {
				solved = solved + char
			}
		}
		var out = ""
		try {out = eval(solved)} catch(err) {out = 'Error'}
		this.setState({displayText: out})
	}

	clearAll() {
		this.setState({displayText: ''})
	}

	delChar() {
		if(this.state.displayText.length !== 0){
			this.setState({displayText: this.state.displayText.substr(0, this.state.displayText.length - 1)})
		}
	}

	addChar(char) {
		this.setState({displayText: this.state.displayText + char})
	}

	handleClick(char) {
		if(char === '=') {
			this.solveIt()
		} else if(char === 'del') {
			this.delChar()
		} else if(char === 'AC') {
			this.clearAll()
		} else {
			this.addChar(char)
		}
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'rgb(25, 25, 25)'}}>
				<View style={{flex: 5, justifyContent: 'flex-end', alignItems: 'flex-end', padding: '5%'}}>
					<Text style={{color: 'white', fontSize: 33, fontFamily: 'monospace'}}>{this.state.displayText}</Text>
				</View>
				<Keypad onClick={(char) => this.handleClick(char)}></Keypad>
			</View>
		)
	}
}

export default App