import React, {Component} from 'react';
import { Line, Bar } from 'react-chartjs-2';

class HistoricChart extends Component {

    onChange(e){
        this.props.onChange(e.target.value);
    };

    render(){
        //const {...props} = this.props; - чомусь не відпрацьовує так(
        const {labels, data, chartTitle, titleFontSize} = this.props; // а так відпрацьовує)
        return(
            <div className="mt-5 card text-center" style={{width:'100%'}}>
                <select onChange={this.onChange.bind(this)} className="form-control col-md-3">
                    <option value="noValue">Choose value</option>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
                <Line
                    width={50}
                    height={20}
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'BTC',
                                data
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: chartTitle,
                            fontSize: titleFontSize,
                            fontWeight: "lighter",
                            fontColor: "grey"
                        },
                        layout: {
                            padding: '300px',
                            width: '500px',
                            height: '300px'
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            text: 'BTC'
                        }
                    }}
                />
            </div>
        )
    }
}

export default HistoricChart;




/*
const currencyRequest = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-03-01&end=2018-04-01');
const { bpi } = await currencyRequest.json();

const labels = [],
    data = [];

Object.entries(bpi).map(el=>{
    labels.push(el[0]);
    data.push(el[1]);
});


//------------------------------------------------------------
let currentMilliseconds = Date.now();

const YEAR_MILLISECONDS = 31536000000,
    MONTH_MILLISECONDS = 2628000000,
    DAY_MILLISECONDS = 86400000;

let prevYear = new Date(currentMilliseconds - YEAR_MILLISECONDS).toISOString().slice(0, 10),
    prevMonth = new Date(currentMilliseconds - MONTH_MILLISECONDS).toISOString().slice(0, 10),
    prevDay = new Date(currentMilliseconds - DAY_MILLISECONDS).toISOString().slice(0, 10),
    curDay = new Date (currentMilliseconds).toISOString().slice(0, 10);

console.log(prevMonth, prevDay, prevYear, curDay);*/
