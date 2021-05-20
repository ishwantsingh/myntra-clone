import React, { Component } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    .brand-div {
        height: 30%;
    }
    .filter-checkbox-div {
        display: flex;
        flex-direction: row;
        p {
            width: 80%;
            margin: 0;
            font-size: 16px;
            padding: 0 0 0 5px;
        }
    }
    .filter-checkbox {
        height: 15px;
        width: 15px;
    }
`;

export default class Filter extends Component {
    render() {
        return (
                this.props.options.map(option => {    
                    return(
                        <Container>
                            <div className="brand-div">
                            <Form>
                                <Form.Field className="filter-checkbox-div">
                                    <input 
                                    type="checkbox"
                                    className="filter-checkbox"
                                    label={`${option}`}
                                    name='brandGroup'
                                    value={`${option}`}
                                    onClick={(e) => this.props.filterItemHandler(e,`${option}`, this.props.type, this.props.number )}  
                                    />
                                    <p>{option}</p>
                                </Form.Field>
                            </Form>
                            </div>
                        </Container>
                    )
                    
                })
            );  
    }


}