import React, { Component } from 'react';
import './App.css';
import SocketChart from './components/SocketChart'
import Websocket from 'react-websocket';
import 'bootstrap/dist/css/bootstrap.css';
import Calculator from './components/Calculator';
import HistoricChart from './components/HistoricChart';
import CryptoPrices from './components/CryptoPrices';

class App extends Component {

    state={
        socketChart:{
            labels:[],
            data:[]
        },
        historicChart:{},
        calculator:{},
        cryptoPrices:{
        },
    };

//-----CryptoPrices-----

    async onChoose(currency){
        //console.log("val", currency);
        if (currency) {
            const URL = "https://api.coinmarketcap.com/v2/ticker/?limit=6";
            let params = "";

            if (currency === "EUR") {
                params = "&convert=EUR"
            } else if (currency === "UAH") {
                params = "&convert=UAH"
            }

            let pricesRequest = await fetch(`${URL}${params}`);
            let res = await pricesRequest.json();
            //console.log(res);

            let currencies = [];
            let prices = [];

            Object.values(res.data).map(i => {
                currencies.push(i.symbol);
                prices.push(i.quotes[currency].price.toFixed(2));
            });

            Object.assign(this.state, {cryptoPrices: {currencies, prices, currency}});
        }
    }

//------Calculator------

    async onSubmit(values){
        //console.log("vals", values);
        const {cryptoCurrency, currency, quantity} = values;
        console.log("destruct", cryptoCurrency, currency, quantity);

        const URL = "https://min-api.cryptocompare.com/data/price";
        let currencyRequest = await fetch(`${URL}?fsym=${cryptoCurrency}&tsyms=${currency}`);
        let res = await currencyRequest.json();
        //console.log(res[currency]);

        let data = (res[currency] * quantity).toFixed(2);
        console.log(data);
        Object.assign(this.state, {calculator:{currency:currency, crypto:cryptoCurrency, count: quantity, result:data}});

        /*fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsym=${cryptoCurrency}&tsyms=${currency}`).
        then(results => results.json()).
        then(results => {Object.assign(this.state, results)});
        console.log(this.state);*/
    }

//-----HistoricChart-----

    onTimeChange(period){
        let startFinishDates = this.getStartFinishDates(period);
        this.getData(startFinishDates, period);
    };

    getStartFinishDates(date){
        const YEAR_MILLISECONDS = 31536000000,
        MONTH_MILLISECONDS = 2628000000,
        DAY_MILLISECONDS = 86400000;

        let currentMilliseconds = Date.now();

        let startFinishDates = [];
        startFinishDates.push(new Date(currentMilliseconds).toISOString().slice(0, 10));

        let prevDate = '';
        if(date === "day") {
            prevDate = new Date(currentMilliseconds - DAY_MILLISECONDS).toISOString().slice(0, 10);
        } else if (date === "month") {
            prevDate = new Date(currentMilliseconds - MONTH_MILLISECONDS).toISOString().slice(0, 10);
        } else if (date === "year") {
            prevDate = new Date(currentMilliseconds - YEAR_MILLISECONDS).toISOString().slice(0, 10);
        }
        startFinishDates.push(prevDate);

        return startFinishDates;
    }

    async getData(dates, period){
        //https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24
        const URL = "https://api.coindesk.com/v1/bpi/historical/close.json";
        let currencyRequest = await fetch(`${URL}?start=${dates[1]}&end=${dates[0]}`),
            {bpi} = await currencyRequest.json(),

        historicChart = {
            labels: [],
            data: [],
            time: period
        };

        Object.entries(bpi).map(el => {
            historicChart.labels.push(el[0]);
            historicChart.data.push(el[1]);
        });

        this.setState(Object.assign(this.state, {historicChart}));
    }

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
                <h1 className="jumbotron text-muted text-center">Crypto page</h1>
                <CryptoPrices
                    onChoose={this.onChoose.bind(this)}
                    cryptos={this.state.cryptoPrices}
                />
                <Calculator
                    onSend={this.onSubmit.bind(this)}
                    result={this.state.calculator.result}
                    count={this.state.calculator.count}
                    currency={this.state.calculator.currency}
                    crypto={this.state.calculator.crypto}
                    className="row mt-0"
                />
                <HistoricChart
                    onChange={this.onTimeChange.bind(this)}
                    labels={this.state.historicChart.labels}
                    data={this.state.historicChart.data}
                    titleFontSize="30"
                    chartTitle="Historic Bitcoin Dynamic"
                />
                <Websocket url='wss://api.gemini.com/v1/marketdata/btcusd' onMessage={this.handleData.bind(this)}/>
                <SocketChart
                    labels={this.state.socketChart.labels}
                    data={this.state.socketChart.data}
                    titleFontSize="30"
                    chartTitle="Current Bitcoin Dynamic"
                    className="row"
                />
            </div>
        );
    }
}

export default App;



