import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CurrencyInput extends React.Component {

    constructor(){
        super();
        this.state = {
          value: '10.00'
        };

        this.handleChange = this.handleChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    handleChange(e){
        this.setState({
           value: e.target.value
        });
    }

    getValue(){
        this.props.funcInput(this.state.value);
    }

    render(){
        return (
            <Form className="CurrencyInput">
                <Form.Group
                    as={Row}
                    controlId="frmChangeCurrency"
                    style={{marginLeft:"0px"}}>
                    <Form.Label>USD</Form.Label>
                    <Col>
                        <Form.Control
                            size="sm"
                            type="number"
                            name="value"
                            min="1"
                            step="0.01"
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyUp={this.getValue}
                            placeholder="Input value here..." />
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}

export default CurrencyInput;