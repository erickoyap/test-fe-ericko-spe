import React from 'react';
import Container from 'react-bootstrap/Container';
import CurrencyAdd from '../components/Currency/CurrencyAdd';
import CurrencyInput from '../components/Currency/CurrencyInput';
import CurrencyTable from '../components/Currency/CurrencyTable';

class Currency extends React.Component {

    constructor(){
        super();

        this.state = {
            baseCurrency: 'USD',
            supportedCurrencies: ['USD', 'CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'],
            currenciesName: {
                'USD': 'United States Dollars',
                'CAD': 'Canadian Dollars',
                'IDR': 'Indonesian Rupiah',
                'GBP': 'Great Britain Poundsterling',
                'CHF': 'Swiss Franc',
                'SGD': 'Singapore Dollars',
                'INR': 'Indian Rupee',
                'MYR': 'Malaysian Ringgit',
                'JPY': 'Japanese Yen',
                'KRW': 'South Korean Won'
            },
            viewedCurrencies: ['IDR','SGD'],
            inputValue: '10.05',
            rateList: []
        };

        this.getInputValue = this.getInputValue.bind(this);
        this.addCurrency = this.addCurrency.bind(this);
        this.deleteCurrency = this.deleteCurrency.bind(this);
        this.getRateList = this.getRateList.bind(this);
    }

    getRateList(loadedRates){
        const inputValue = parseFloat(this.state.inputValue);
        const currenciesName = this.state.currenciesName;
        const viewedCurrencies = this.state.viewedCurrencies;

        let rateList = viewedCurrencies.map(function(key){
            const rate = loadedRates[key];
            const convertedValue = inputValue * rate;
            const currencyName = currenciesName[key];

            return {
                currency: key,
                currencyName: key + ' - ' + currencyName,
                rate: rate,
                convertedValue: convertedValue
            }
        });

        return rateList;
    }

    loadExchangeRateFromSource(value, viewedCurrencies){
        const symbols = viewedCurrencies.join();
        const url = 'https://api.exchangeratesapi.io/latest?base=' + this.state.baseCurrency + "&symbols=" + symbols;

        this.setState({
            inputValue: value,
            viewedCurrencies: viewedCurrencies,
            isLoading: true
        });

        fetch(url).then(result => {
            return result.json();
        }).then(result => {
            const rateList = this.getRateList(result.rates);

            this.setState({
                isLoading: false,
                rateList: rateList
            });
        });
    }

    componentDidMount(){
        this.loadExchangeRateFromSource(this.state.inputValue, this.state.viewedCurrencies);
    }

    getInputValue(value){
        this.loadExchangeRateFromSource(value, this.state.viewedCurrencies);
    }

    addCurrency(value){
        let viewedCurrencies = this.state.viewedCurrencies;
        if (viewedCurrencies.indexOf(value) === -1) {
            viewedCurrencies.push(value);
        }

        this.loadExchangeRateFromSource(this.state.inputValue, viewedCurrencies);
    }

    deleteCurrency(currency){
        let viewedCurrencies = this.state.viewedCurrencies;
        const idx = viewedCurrencies.indexOf(currency);
        viewedCurrencies.splice(idx,1);
        this.setState({
            viewedCurrencies: viewedCurrencies
        });
    }

    render(){
        return (
            <div className="Currency">
                <Container>
                    <h6 style={{textAlign:"left"}}>USD - United States Dollars</h6>
                    <CurrencyInput
                        funcInput={this.getInputValue} />
                    <CurrencyTable
                        baseCurrency={this.state.baseCurrency}
                        rateList={this.state.rateList}
                        viewedCurrencies={this.state.viewedCurrencies}
                        isLoading={this.state.isLoading}
                        funcDelete={this.deleteCurrency} />
                    <CurrencyAdd
                        funcAdd={this.addCurrency}
                        currencies={this.state.supportedCurrencies}/>
                </Container>
            </div>
        );
    }
}

export default Currency;