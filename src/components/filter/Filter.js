import React, { Component } from 'react';
import { Form, Checkbox,Dropdown } from 'semantic-ui-react'
import styled from "styled-components";


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
// class Filter extends Component {
//   constructor(props) {
//     super(props);


//   }

//   componentDidMount() {
//     this.textInput.focus();
//   }

//   handleTextChange(e) {
//     this.props.handleTextChange(e.target.value);
//   }

//   handleCheckboxChange(e) {
//     this.props.handleCheckboxChange(e.target.checked);
//   }

//   render() {
//     return (

//         <Form>
//         <Form.Field>
//           Selected value: <b>{this.state.value}</b>
//         </Form.Field>
//         <Form.Field>
//           <Checkbox
//             label='Choose this'
//             name='checkboxRadioGroup'
//             value='this'
//             checked={this.state.value === 'this'}
//             onChange={this.handleChange}
//           />
//         </Form.Field>
//         <Form.Field>
//           <Checkbox
//             label='Or that'
//             name='checkboxRadioGroup'
//             value='that'
//             checked={this.state.value === 'that'}
//             onChange={this.handleChange}
//           />
//         </Form.Field>
//       </Form>
//     );
//   }
// }

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBrands: []
        };
        }
    
    handleChange = (e, { value }) => this.setState({ value, selectedBrands: [...this.state.selectedBrands, value] })

    render() {
        console.log("state", this.props.uniqueBrands)
        return (
            // <div>
                this.props.uniqueBrands.map(brand => {    
                    return(
                        <Container>
                            <div className="brand-div">
                            <Form>
                                <Form.Field>
                                    <Checkbox
                                    label={`${brand}`}
                                    name='brandGroup'
                                    value={`${brand}`}
                                    // checked={this.state.value === `${brand}`}
                                    onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                                {/* <Checkbox label={`${brand}`} />  */}

                            </div>
                        </Container>
                    )
                    
                })
            // </div>
            );  
    }


}

{/* <Container>
<Dropdown placeholder='Brands' fluid multiple selection options={this.props.uniqueBrands} />

</Container> */}

//   <Form>
//                 {/* <Form.Field>
//                     Selected value: <b>{this.state.value}</b>
//                 </Form.Field> */}
//             <Form.Field>
//                 <Checkbox
//                 label={brand}
//                 name='checkboxRadioGroup'
//                 value='this'
//                 // checked={this.state.value === 'this'}
//                 // onChange={this.handleChange}
//                 />
//             </Form.Field>
//             {/* <Form.Field>
//                 <Checkbox
//                 label='Or that'
//                 name='checkboxRadioGroup'
//                 value='that'
//                 checked={this.state.value === 'that'}
//                 onChange={this.handleChange}
//                 />
//             </Form.Field> */}
//             </Form>