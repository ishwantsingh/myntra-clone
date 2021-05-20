import React, { Component } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import styled from "styled-components";
import * as uuid from 'uuid';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    p {
        font-size: 14px;
    }
    .brand-div {
        height: 30%;
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
                                <Form.Field>
                                    <Checkbox
                                    label={`${option}`}
                                    name='brandGroup'
                                    value={`${option}`}
                                    onClick={(e) => this.props.filterItemHandler(e,`${option}`, this.props.type, this.props.number )}  
                                    />
                                </Form.Field>
                            </Form>
                            </div>
                        </Container>
                    )
                    
                })
            );  
    }


}