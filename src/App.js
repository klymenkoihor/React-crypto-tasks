import React, { Component } from 'react';
import './App.css';
import SocketChart from './components/SocketChart'
import Websocket from 'react-websocket';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    state={
        socketChart:{
            labels:[],
            data:[]
        },

        /*historicChartLabels:[],
        historicChartData:[]*/
    };

    socketData = [];
    socketLabels = [];

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

        let socketChartForStateData = {
            socketChart:{
                labels: [...this.socketLabels],
                data: [...this.socketData]
            }
        };

        this.setState(Object.assign(this.state, socketChartForStateData));

        /*this.setState({
            socketChart:{
                labels: [...this.socketLabels],
                data: [...this.socketData]
            }
        });*/
    }

    render(){
        return (
            <div className="container">
                    <Websocket url='wss://api.gemini.com/v1/marketdata/btcusd'
                         onMessage={this.handleData.bind(this)}/>
                <SocketChart
                    labels={this.state.socketChart.labels}
                    data={this.state.socketChart.data}
                    titleFontSize="50"
                    chartTitle="Current Bitcoin Dynamic"
                />
            </div>
        );
    }
}

export default App;



