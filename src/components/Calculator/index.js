import React from "react";
import { render } from "react-dom";
import { Form, Field } from "react-final-form";

const Calculator = ({ onSend, currency, crypto, count, result }) => (
  <div className="card mt-5">
    <h2 className="text-muted text-center">
      Cryptocurrency Converter Calculator
    </h2>
    <div className="col-md-6 offset-md-3">
      <Form
        className=""
        onSubmit={onSend}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="quantity"
                component="input"
                type="number"
                placeholder="Enter quantity"
                className="form-control"
                required
              />
            </div>
            <div className="form-inline justify-content-between mt-3">
              <div className="col-5 text-left" style={{ padding: 0 }}>
                <Field
                  name="cryptoCurrency"
                  component="select"
                  className="form-control"
                  required
                  style={{ width: "170px" }}
                >
                  <option value="">Choose crypto</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="XRP">Ripple</option>
                  <option value="BCH">Bitcoin Cash</option>
                  <option value="LTC">Litecoin</option>
                  <option value="XMR">Monero</option>
                </Field>
              </div>
              <div className="col-2 text-center">
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className="btn btn-secondary"
                >
                  =
                </button>
              </div>
              <div className="col-5 text-right" style={{ padding: 0 }}>
                <Field
                  name="currency"
                  component="select"
                  className="form-control"
                  required
                  style={{ width: "170px" }}
                >
                  <option value="">Choose currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </Field>
              </div>
            </div>
            <div className="form-inline justify-content-between mt-3 mb-3">
              <div className="col-md-4 text-right">
                {count} {crypto}
              </div>
              <div className="col-md-4 text-center">=</div>
              <div className="col-md-4 text-left">
                {result} {currency}
              </div>
            </div>
          </form>
        )}
      />
    </div>
  </div>
);

export default Calculator;
