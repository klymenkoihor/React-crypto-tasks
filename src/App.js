import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketChart from './components/SocketChart'
import Websocket from 'react-websocket';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    state={
        socketChartLabels:[],
        socketChartData:[]
    }

    socketData = []
    socketLabels = []

    handleData(event){
        let result = JSON.parse(event);
        this.socketData.push(result.events[0].price);
        let time = new Date(result.timestampms).toLocaleTimeString();
        //console.log(result.timestamp);
        this.socketLabels.push(time);

        //console.log(this.socketLabels, this.socketData);
        if (this.socketData.length > 49) {
            this.socketData.shift();
            this.socketLabels.shift();
        }

        this.setState({
            socketChartLabels: [...this.socketLabels],
            socketChartData: [...this.socketData]
        });
    }

    render(){
        return (
            <div className="container">
                    <Websocket url='wss://api.gemini.com/v1/marketdata/btcusd'
                         onMessage={this.handleData.bind(this)}/>
                <SocketChart
                    labels={this.state.socketChartLabels}
                    data={this.state.socketChartData}
                    titleFontSize="50"
                    chartTitle="Current Bitcoin Dynamic"
                />
            </div>
        );
    }
}

export default App;
