import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

class CurrencyAdd extends React.Component {

    constructor(){
        super();

        this.state = {
            currency: '',
            stateAvailable: true,
            showForm: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.addCurrency = this.addCurrency.bind(this);
        this.showFormAddCurrency = this.showFormAddCurrency.bind(this);
    }

    checkAddInput(currency){
        const currencies = this.props.currencies;
        return currencies.indexOf(currency) > -1;
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
            stateAvailable: this.checkAddInput(value)
        });
    }

    addCurrency(){
        const currencies = this.props.currencies;
        const currency = this.state.currency;

        // check if currency is available to add
        if (currencies.indexOf(currency) > -1){
            this.setState({
                currency: '',
                showForm: false
            });
            this.props.funcAdd(this.state.currency);
        }
    }

    showFormAddCurrency(){
        this.setState({
           showForm: true
        });
    }

    render(){
        let listCurrencies;
        listCurrencies = this.props.currencies.map(function(item){
            return (<li>{item}</li>);
        });

        const renderButtonShowForm =
            <Button onClick={this.showFormAddCurrency} size="sm" variant="primary">
                <b>+</b> Add more currencies...
            </Button>;

        const renderFormAddCurrency =
            <Form.Group
                as={Row}
                controlId="frmAddCurrency">
                <Col>
                    <Form.Control
                        size="sm"
                        type="text"
                        name="currency"
                        value={this.state.currency}
                        onChange={this.handleChange}
                        placeholder="Add More Currencies..." />
                </Col>
                <Button onClick={this.addCurrency} size="sm">
                    + Submit
                </Button>
            </Form.Group>;

        const renderBody = this.state.showForm ? renderFormAddCurrency : renderButtonShowForm;

        return (
            <Form className="CurrencyAdd">
                {renderBody}
                <Form.Group>
                    {this.state.stateAvailable && this.state.currency !== '' ?
                        <Alert variant='success' style={{textAlign:'left'}}>
                            Currency {this.state.currency} is supported.
                        </Alert>
                        :
                        this.state.currency !== '' ?
                        <Alert variant='danger' style={{textAlign:'left'}}>
                            <p> Currency <b>{this.state.currency}</b> not supported! Supported currencies are: </p>
                            <ul>
                                {listCurrencies}
                            </ul>
                        </Alert> : ''}
                </Form.Group>
            </Form>
        );
    }
}

export default CurrencyAdd;