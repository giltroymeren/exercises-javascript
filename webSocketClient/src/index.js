import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { w3cwebsocket as W3CWSocket } from 'websocket'
import { Card, Avatar, Input, Typography } from 'antd'
import 'antd/dist/antd.css'
import './index.css'

const CLIENT = new W3CWSocket('ws://127.0.0.1:8000')

const { Search } = Input
const { Text } = Typography
const { Meta } = Card

export default class App extends Component {
	state = {
		userName: '',
		isLoggedIn: false,
		messages: [],
	}

	componentDidMount() {
		CLIENT.onopen = () => {
			console.log(`WebSocket client is connected`)
		}

		CLIENT.onmessage = (message) => {
			const DATA = JSON.parse(message.data)
			console.log('Reply from server ', DATA)

			if(DATA.type === 'message') {
				this.setState(state => ({
					messages: [...state.messages,
						{
							msg: DATA.msg,
							user: DATA.user,
						}
					]
				}))
			}
		}
	}

	onButtonClicked = (message) => {
		CLIENT.send(JSON.stringify({
			type: 'message',
			msg: message,
			user: this.state.userName,
		}))
		this.setState({ searchVal: '' })
	}

	render() {
		return(
			<div className="main">
			{ this.state.isLoggedIn ?
				<div>
					<div className="title">
						<Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Websocket Chat: {this.state.userName}</Text>
					</div>
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
            {this.state.messages.map(message => 
              <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
                <Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                  }
                  title={message.user+":"}
                  description={message.msg}
                />
              </Card> 
            )}
          </div>
					<div className="bottom">
						<Search
							placeholder="input message and send"
							enterButton="Send"
							value={this.state.searchVal}
							size="large"
							onChange={(e) => this.setState({ searchVal: e.target.value })}
							onSearch={value => this.onButtonClicked(value)}
						/>
					</div> 
				</div>

			: 
				<div style={{ padding: '200px 40px' }}>
					<Search
						placeholder="Enter Username"
						enterButton="Login"
						size="large"
						onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
					/>
				</div>
			}
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)