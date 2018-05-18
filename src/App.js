import React, { Component } from 'react';
import './App.css';
import SocketChart from './components/SocketChart'
import Websocket from 'react-websocket';
import 'bootstrap/dist/css/bootstrap.css';
import Calculator from './components/Calculator';
import HistoricChart from './components/HistoricChart';

class App extends Component {

    state={
        socketChart:{
            labels:[],
            data:[]
        },
        historicChart:{},
        calculator:{}
    };

//------Calculator------

    /*onSubmit(values, request){
        console.log("vals", values);
        const {cryptoCurrency, currency} = values;
        console.log("destruct", cryptoCurrency, currency);


        fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsym=${cryptoCurrency}&tsyms=${currency}`).
        then(results => results.json()).
        then(results => {Object.assign(this.state, results)});
        //console.log(this.state);

        //request(cryptoCurrency, currency);

        /!*currencyRequest = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${this.cryptoCurrency}&tsyms=${this.currency}`);
        result = await currencyRequest.json();
        console.log(result);*!/
    }

    request = async (cryptoCurrency, currency) => {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCurrency}&tsyms=${currency}`);
        const json = await response.json();
        console.log("AJAX", json);
    };*/

//-----HistoricChart----

    async onTimeChange(period){
        const data = {historicChart:{
            time:period
        }};

        const YEAR_MILLISECONDS = 31536000000,
            MONTH_MILLISECONDS = 2628000000,
            DAY_MILLISECONDS = 86400000;

        let currentMilliseconds = Date.now();

        let curDay = new Date(currentMilliseconds).toISOString().slice(0, 10);
        let prevDay = '';

        if(period === "day") {
            prevDay = new Date(currentMilliseconds - DAY_MILLISECONDS).toISOString().slice(0, 10);
        } else if (period === "month") {
            prevDay = new Date(currentMilliseconds - MONTH_MILLISECONDS).toISOString().slice(0, 10);
        } else if (period === "year") {
            prevDay = new Date(currentMilliseconds - YEAR_MILLISECONDS).toISOString().slice(0, 10);
        }

        const URL = "https://api.coindesk.com/v1/bpi/historical/close.json";
        let currencyRequest = await fetch(`${URL}?start=${prevDay}&end=${curDay}`);
        let {bpi} = await currencyRequest.json();

        let historicChart = {
            labels: [],
            data: [],
            time: period
        };

        Object.entries(bpi).map(el => {
            historicChart.labels.push(el[0]);
            historicChart.data.push(el[1]);
        });

        this.setState(Object.assign(this.state, {historicChart}));
        console.log(this.state);
    }

    //З колбеками не вийшло((
    /*onTimeChange(period, callback, call){
        const data = {historicChart:{
            value:period
        }};
        //console.log("date", this.state, data);
        this.setState(Object.assign(this.state, data));
        callback(period, call);
    };

    getData(date, callback){
        const YEAR_MILLISECONDS = 31536000000,
        MONTH_MILLISECONDS = 2628000000,
        DAY_MILLISECONDS = 86400000;

        let currentMilliseconds = Date.now();

        if(date === "day") {
            const prevDay = new Date(currentMilliseconds - DAY_MILLISECONDS).toISOString().slice(0, 10);
            const curDay = new Date (currentMilliseconds).toISOString().slice(0, 10);

            let data = callback(prevDay,curDay);
            let toState={historicChart:{data}};
            this.setState(Object.assign(this.state, toState));
            console.log(this.state);
        }
    }

    async request(start, finish){
        const URL = "https://api.coindesk.com/v1/bpi/historical/close.json";
        let currencyRequest = await fetch(`${URL}?start=${start}&end=${finish}`),
            {bpi} = await currencyRequest.json(),

            chart = {
                labels: [],
                data: []
            };

        Object.entries(bpi).map(el => {
            chart.labels.push(el[0]);
            chart.data.push(el[1]);
        });
        return chart;
    }*/


//------SocketChart------

    socketData = [];
    socketLabels = [];

    handleData(event){
        let result = JSON.parse(event);
        this.socketData.push(result.events[0].price);
        let time = new Date(result.timestampms).toLocaleTimeString();
        //console.log(result.timestamp);
        this.socketLabels.push(time);

        //console.log(this.socketLabels, this.socketData);
        if (this.socketData.length > 29) {
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
    }

    render(){
        return (
            <div className="container">
                <HistoricChart
                    onChange={this.onTimeChange.bind(this)}
                    labels={this.state.historicChart.labels}
                    data={this.state.historicChart.data}
                    titleFontSize="50"
                    chartTitle="Historic Bitcoin Dynamic"
                />
                <Websocket url='wss://api.gemini.com/v1/marketdata/btcusd' onMessage={this.handleData.bind(this)}/>
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



