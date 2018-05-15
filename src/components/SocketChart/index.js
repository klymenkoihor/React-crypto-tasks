import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';


class SocketChart extends Component {

    render() {
        //const {...props} = this.props; - чомусь не відпрацьовує так(
        const {labels} = this.props; // а так відпрацьовує)
        return (
            <div>
                <Line
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'BTC',
                                data: this.props.data
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: this.props.chartTitle,
                            fontSize: this.props.titleFontSize
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