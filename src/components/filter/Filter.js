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
            // selectedBrands: [],
            // selectedCategories: [],
            // selectedGenders: [],
            // selectedSeasons: [],

        };
        }
    

    // handleChange = ( e,value ,type) => {
    //     // e.preventDefault();
    //     if(type ==="brand") {
    //         this.setState({ value, selectedBrands: [...this.state.selectedBrands, value] })
    //     }
    //     else if(type ==="category") {
    //         this.setState({ value, selectedCategories: [...this.state.selectedCategories, value] })
    //     }
    //     else if(type ==="gender") {
    //         this.setState({ value, selectedGenders: [...this.state.selectedGenders, value] })
    //     }
    //     else if(type ==="season") {
    //         this.setState({ value, selectedSeasons: [...this.state.selectedSeasons, value] })
    //     }
    //     // this.setState({ value, selectedBrands: [...this.state.selectedBrands, value] })
    //     console.log(value,type,"23",this.state);
    //   };

    render() {
        // console.log("state", this.props.options)
        return (
            // <div>
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
                                    // checked={this.state.value === `${brand}`}
                                    // onChange={() => this.handleChange(`${option}`, this.props.type)}
                                    // onChange={() => this.props.filterItemHandler(`${option}`, this.props.type)}  
                                    onClick={(e) => this.props.filterItemHandler(e,`${option}`, this.props.type )}  
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