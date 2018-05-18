/*import React from 'react'
import { render } from 'react-dom'
//import Styles from './Styles'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Calculator = ({ onSubmit }) => (
    <div>
        <h1>Cryptocurrency Converter Calculator</h1>
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>

                    <div>
                        <Field
                            name="quantity"
                            component="input"
                            type="text"
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div>
                        <Field name="cryptoCurrency" component="select">
                            <option value="">Choose crypto</option>
                            <option value="BTC">Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                            <option value="XRP">Ripple</option>
                            <option value="BCH">Bitcoin Cash</option>
                            <option value="LTC">Litecoin</option>
                            <option value="XMR">Monero</option>
                        </Field>
                    </div>
                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            =
                        </button>
                    </div>
                    <div>
                        <Field name="currency" component="select">
                            <option value="">Choose currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </Field>
                    </div>

                    <div>
                        {values.quantity}
                    </div>
                    <div>
                        {values.cryptoCurrency}
                    </div>

                    <div>
                        <span>=</span>
                    </div>

                    <div>
                        <span>
                            {values.currency}
                        </span>
                    </div>

                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}
        />
    </div>
)

export default Calculator;*/















//----------------------------------------
/*

import React, {Component} from 'react';
import {render} from 'react-dom';

const onSubmit = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${currency}`);
const { !!! } = await onSubmit.json();

const CalcForm = ()=>{
    <h2>Cryptocurrency Converter Calculator</h2>
    <Form
        onSubmit={onSubmit}
        render={({handleSubmit, values})=>{
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <Field name="cryptoCurrency" component="select">
                        <option />
                        <option value="BTC">Bitcoin</option>
                        <option value="ETH">Ethereum</option>
                        <option value="XRP">Ripple</option>
                        <option value="BCH">Bitcoin Cash</option>
                        <option value="LTC">Litecoin</option>
                        <option value="XMR">Monero</option>

                    </Field>
                </div>


                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                        =
                    </button>
                </div>

                <div>
                    <Field name="favoriteColor" component="select">
                        <option />
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </Field>
                </div>

                <div>
                    <span>

                    </span>
                </div>

                <div>
                    <span>=</span>
                </div>

                <div>
                    <span>

                    </span>
                </div>

            </form>
        }
    ///>
}


// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD

<form action="">
    title

    select number
    select crypto
    button
    select cur
    text crypto
    text cur
</form>
*/
