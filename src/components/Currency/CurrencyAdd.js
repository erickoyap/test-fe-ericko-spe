import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        console.log(name, value);
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
        // let listCurrencies;
        // listCurrencies = this.props.currencies.map(function(item){
        //     return (<li>{item}</li>);
        // });

        const renderDropdownCurrencies = this.props.currencies.map(function(item, index){
            return (
                <option value={item}>
                    {item}
                </option>
            );
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
                        as="select"
                        name="currency"
                        value={this.state.currency}
                        onChange={this.handleChange}
                        placeholder="Add More Currencies...">
                        {renderDropdownCurrencies}
                    </Form.Control>
                </Col>
                <Button onClick={this.addCurrency} size="sm">
                    + Submit
                </Button>
            </Form.Group>;

        const renderBody = this.state.showForm ? renderFormAddCurrency : renderButtonShowForm;

        return (
            <Form className="CurrencyAdd">
                {renderBody}
            </Form>
        );
    }
}

export default CurrencyAdd;