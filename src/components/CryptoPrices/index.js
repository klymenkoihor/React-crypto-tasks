import React, {Component} from 'react';

class CryptoPrices extends Component {

    onChoose(e) {
        this.props.onChoose(e.target.value);
    };

    renderProps = (array, curr)=> {
        if (array) {
            let result = array.map((item) => {
                return (<div className="text-center">{item} {curr}</div>)
            });
            return result;
        }
    };

    render() {
        const {cryptos} = this.props;
        return (
            <div className="mt-5 card text-center pb-5" style={{width: '100%'}}>
                <select onChange={this.onChoose.bind(this)} className="form-control col-md-3 m-1">
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                </select>
                <h2 className="text-muted text-center mb-5">TOP 6 cryptocurrencies</h2>

                <div className="form-inline justify-content-around ml-2 mr-2">
                    {
                        this.renderProps(cryptos.currencies)
                    }
                </div>

                <div className="form-inline justify-content-around ml-2 mr-2">
                    {
                        this.renderProps(cryptos.prices, cryptos.currency)
                    }
                </div>
            </div>
        )
    }
}

export default CryptoPrices;
