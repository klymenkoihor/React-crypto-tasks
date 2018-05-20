import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';

class SocketChart extends Component {

    render() {
        //const {...props} = this.props; - чомусь не відпрацьовує так(
        const {labels, data, chartTitle, titleFontSize} = this.props; // а так відпрацьовує)
        return (
            <div className="mt-5 card text-center" style={{width:'100%'}}>
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

export default SocketChart;