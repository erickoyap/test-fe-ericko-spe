import React from 'react';
import Button from 'react-bootstrap/Button';

class CurrencyTableItem extends React.Component{
    constructor(){
        super();

        this.removeSelf = this.removeSelf.bind(this);
    }

    removeSelf(){
        this.props.funcDelete(this.props.rate.currency);
    }

    render(){
        const rate = this.props.rate;
        const baseCurrency = this.props.baseCurrency;

        return (
            <tr>
                <td style={{textAlign:'left'}}>
                    <h5 style={{float:'right'}}>{ rate.convertedValue.toLocaleString(navigator.language) }</h5>
                    <h5>{ rate.currency }</h5>
                    <span>
                        <b><i>{ rate.currencyName }</i></b><br />
                        <i>1 { baseCurrency } = {rate.currency + ' ' + rate.rate.toLocaleString(navigator.language)}</i>
                    </span>
                </td>
                <td style={{textAlign:'right', maxWidth:"10px"}}>
                    <Button variant="outline-danger" onClick={this.removeSelf}>
                        <b>X</b>
                    </Button>
                </td>
            </tr>
        );
    }
}

export default CurrencyTableItem;