import React from 'react';
import Table from 'react-bootstrap/Table';
import CurrencyTableItem from './CurrencyTableItem';

class CurrencyTable extends React.Component {
    render(){
        const isLoading = this.props.isLoading;
        const baseCurrency = this.props.baseCurrency;
        const viewedCurrencies = this.props.viewedCurrencies;
        const funcDelete = this.props.funcDelete;

        const renderLoading = <h6>Loading...</h6>;
        const renderList = this.props.rateList.map(function(rate, index){
            if (viewedCurrencies.indexOf(rate.currency) > -1) {
                return <CurrencyTableItem
                    key={index}
                    rate={rate}
                    baseCurrency={baseCurrency}
                    funcDelete={funcDelete}/>;
            }
            return '';
        });
        const renderTableBody = isLoading ? renderLoading : renderList;

        return (
            <Table>
                <tbody>
                    { renderTableBody }
                </tbody>
            </Table>
        );
    }
}

export default CurrencyTable;