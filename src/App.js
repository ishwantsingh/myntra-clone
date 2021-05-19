import './App.css';
import React, { Component } from "react";
import styled from 'styled-components';
import { Switch, Route, Link  } from "react-router-dom";

import Shop from "./components/shop/Shop";
import FilterBar from "./components/filter/FilterBar";
import HeadBar from "./components/headbar/HeadBar";
import Item from "./components/shop/Item";
import { ItemMeta } from 'semantic-ui-react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const ShopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor running");
    this.filterPage = React.createRef();
    // this.projectsChild = React.createRef();
    // this.skillsChild = React.createRef();
    // this.hobbiesChild = React.createRef();
    this.state = {
      apiLink: "https://demo7242716.mockable.io/products",
      items: [],
      searchItems: [],
      brands: [],
      uniqueBrands: [],
      genders: [],
      uniqueGenders: [],
      categories: [],
      uniqueCategories: [],
      seasons: [],
      uniqueSeasons: [],
      // selectedFilter: [{brand: ""},{category: ""},{gender: ""},{season: ""}],
      selectedFilter: [[],[],[],[]],
      // selectedFilter: [],
      isClicked: false,
      currentType: ""
    };
  }

  componentDidMount() {
      fetch(this.state.apiLink, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(res => {
          if (!res.ok) {
              throw new Error('Network response was not ok');
          }
          return res.json();;
      })
      .then((data) => {
          console.log("response 2",data.products)
          this.setState({ items: data.products ,searchItems: data.products});

          data.products.map(product => {
          this.setState({brands: [...this.state.brands, product.brand], genders: [...this.state.genders, product.gender],categories: [...this.state.categories, product.category], seasons: [...this.state.seasons, product.season] })
          })

          this.setState({uniqueBrands: [...new Set(this.state.brands)], uniqueGenders: [...new Set(this.state.genders)], uniqueCategories: [...new Set(this.state.categories)], uniqueSeasons: [...new Set(this.state.seasons)]})
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
  }

  searchItemHandler = e => {
    let searchTerm = e.target.value;
    const items = this.state.items.filter(item => {
      return item.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });
    this.setState({ searchItems: items });
  };

  filterItemHandler = (e,value, type,number) => {
    console.log("1state",this.state)

      var filter = this.state.selectedFilter;

      if(e.target.checked) {

          filter[number].push(value);
          console.log("34", value, filter[number],this.state.selectedFilter)

          let newFilterArray = [];

          var count = 0;

          for(let i=0; i<4; i++) {
            if(filter[i].length == 0) {
              count = count;
            }  else {
              count++;
            } 
            console.log("count", count) 
          }
          if(count < 2) {
            var items = this.state.items.filter(item1 => {
              console.log("32123", filter[0])
              
              return filter[number].includes(item1[type]);
            });
          } else {
            var items = this.state.searchItems.filter(item1 => {
              console.log("32123",number, filter[number], filter[1], filter[2], filter[3])
             
              return filter[number].includes(item1[type]);
            });
          }

          // if(number == 0 && filter[1].length != 0  || filter[2].length != 0 || filter[3].length != 0) {
          //   var items = this.state.searchItems.filter(item1 => {
          //     console.log("32123",number, filter[number], filter[1], filter[2], filter[3])
             
          //     return filter[number].includes(item1[type]);
          //   });
    
          // } else if( number == 0 && filter[1].length == 0 && filter[2].length == 0 && filter[3].length == 0) {
          //   var items = this.state.items.filter(item1 => {
          //     console.log("32123", filter[0])
              
          //     return filter[number].includes(item1[type]);
          //   });
          // }

          // else if(number == 1 && filter[0].length != 0 || filter[2].length != 0 || filter[3].length != 0) {
          //   var items = this.state.searchItems.filter(item1 => {
          //     console.log("32123", filter[number])
             
          //     return filter[number].includes(item1[type]);
          //   });
    
          // } else if( number == 1 && filter[0].length == 0 && filter[2].length == 0 && filter[3].length == 0) {
          //   var items = this.state.items.filter(item1 => {
          //     console.log("32123", filter[0])
              
          //     return filter[number].includes(item1[type]);
          //   });
          // }
          // else if(number == 2 && filter[0].length != 0 || filter[1].length != 0 || filter[3].length != 0) {
          //   var items = this.state.searchItems.filter(item1 => {
          //     console.log("32123", filter[number])
             
          //     return filter[number].includes(item1[type]);
          //   });
    
          // } else if( number == 2 && filter[0].length == 0 && filter[1].length == 0 && filter[3].length == 0) {
          //   var items = this.state.items.filter(item1 => {
          //     console.log("32123", filter[number])
              
          //     return filter[number].includes(item1[type]);
          //   });
          // }
          // else if(number == 3 && filter[0].length != 0 || filter[1].length != 0 || filter[2].length != 0) {
          //   var items = this.state.searchItems.filter(item1 => {
          //     console.log("32123", filter[number])
             
          //     return filter[number].includes(item1[type]);
          //   });
    
          // } else if( number == 3 && filter[0].length == 0 && filter[1].length == 0 && filter[2].length == 0) {
          //   var items = this.state.items.filter(item1 => {
          //     console.log("32123", filter[0])
              
          //     return filter[number].includes(item1[type]);
          //   });
          // }

          
          newFilterArray = [...new Set([...newFilterArray,...items])];
          console.log("22",newFilterArray);

          this.setState({ searchItems:  newFilterArray });
      
          return items;
      
        // if(type == "brand") {
      
        //   filter[0].push(value);
        //   console.log("34", value, filter[0],this.state.selectedFilter)

        //   let newFilterArray = [];

        //   if(filter[1] !==[] || filter[2] !== [] || filter[3] !== []) {
        //     var items = this.state.searchItems.filter(item1 => {
        //       console.log("32123", filter[0])
             
        //       return filter[0].includes(item1.brand);
        //     });
    
        //   } else {
        //     var items = this.state.items.filter(item1 => {
        //       console.log("32123", filter[0])
              
        //       return filter[0].includes(item1.brand);
        //     });
        //   }
          
        //   newFilterArray = [...new Set([...newFilterArray,...items])];
        //   console.log("22",newFilterArray);

        //   this.setState({ searchItems:  newFilterArray });
      
        //   return items;
        // }
        // else if(type == "category") {
         
        //   filter[1].push(value);
        //   let newFilterArray = [];

        //   if(filter[0] !==[] || filter[2] !== [] || filter[3] !== []) {
        //     var items = this.state.searchItems.filter(item1 => {
        //       console.log("32123", filter[1])
              
        //       return filter[1].includes(item1.category);
        //     });
        //   }
        //   else {
        //     var items = this.state.items.filter(item1 => {
        //       console.log("32123", filter[1])
              
        //       return filter[1].includes(item1.category);
        //     });
        //   }

        //   newFilterArray = [...new Set([...newFilterArray,...items])];
        //   console.log("22",newFilterArray);

        //   if(newFilterArray !== []) {
        //     this.setState({ searchItems:  newFilterArray });
        //   } else if (this.state.searchItems === []) {
        //     this.setState({ searchItems:  this.state.items });
        //   }

        //   return items;
        // }
        // else if(type == "gender") {
        
        //   filter[2].push(value);
        //   let newFilterArray = [];

        //   if(filter[0] !==[] || filter[1] !== [] || filter[3] !== []) {
        //     var items = this.state.searchItems.filter(item1 => {
        //       console.log("32123", filter[2])
        //       return filter[2].includes(item1.gender);
        //     });
        //   } else {
        //     var items = this.state.items.filter(item1 => {
        //       console.log("32123", filter[2])
        //       return filter[2].includes(item1.gender);
        //     });
        //   }
          

        //   newFilterArray = [...new Set([...newFilterArray,...items])];
        //   console.log("22",newFilterArray);

        //   this.setState({ searchItems:  newFilterArray });
      
        //   return items;
        // }
        // else if(type == "season") {
         
        //   filter[3].push(value);

        //   let newFilterArray = [];
        //   if(filter[0] !==[] || filter[1] !== [] || filter[2] !== []) {
        //     var items = this.state.searchItems.filter(item1 => {
        //       console.log("32123", filter[3])
            
        //       return filter[3].includes(item1.season);
        //     });
        //   } else {
        //     var items = this.state.items.filter(item1 => {
        //       console.log("32123", filter[3])
            
        //       return filter[3].includes(item1.season);
        //     });
        //   }
       

        //   newFilterArray = [...new Set([...newFilterArray,...items])];
        //   console.log("22",newFilterArray);

        //   this.setState({ searchItems:  newFilterArray });
      
        //   return items;
        // }
      }
      else {

        if(type == "brand") {
          console.log("poo",filter[0], filter)

          filter[0] = filter[0].filter(item => {
          if(filter[0].length == 1 ) {
            return false;
          } else {
           return !value.includes(item);
          } 
          });


          console.log("boo",filter[0], filter)

   
          let doAsyncStuff = () => {
            return Promise.resolve()
          }

          let filter1 = async (arr, callback) => {
            const fail = Symbol()
            return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
          }
         
          // The helper function
      
            (async () => {
              let newFilterArray = [];

              var items = await filter1(this.state.items, async item1 => {
                console.log("32123", filter[0])
                await doAsyncStuff();
                if(filter[0] ) {
                  return filter[0].includes(item1.brand);
                } else {
                  return null;
                }
                
              });
    
              newFilterArray = [...new Set([...newFilterArray,...items])];
              console.log("22",newFilterArray);
  
              this.setState({ searchItems:  newFilterArray });
        
              return items;
            })()
        }
        else if(type == "category") {        
          
          filter[1] = filter[1].filter(item => {
            if(filter[1].length == 1 ) {
              return false;
            } else {
             return !value.includes(item);
            } 
            }); 


            console.log("boo",filter[1], filter)
  
     
            let doAsyncStuff = () => {
              return Promise.resolve()
            }
  
            let filter1 = async (arr, callback) => {
              const fail = Symbol()
              return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
            }
           
              (async () => {
                let newFilterArray = [];
  
                var items = await filter1(this.state.items, async item1 => {
                  console.log("32123", filter[1])
                  await doAsyncStuff();
                  if(filter[1] ) {
                    return filter[1].includes(item1.category);
                  } else {
                    return null;
                  }
                  
                });
                
                newFilterArray = [...new Set([...newFilterArray,...items])];
                console.log("22",newFilterArray);
    
                this.setState({ searchItems:  newFilterArray });
          
                return items;
              })()
      
        }
        else if(type == "gender") {

          filter[2] = filter[2].filter(item => {
            if(filter[2].length == 1 ) {
              return false;
            } else {
             return !value.includes(item);
            } 
            }); 


            console.log("boo",filter[2], filter)
  
     
            let doAsyncStuff = () => {
              return Promise.resolve()
            }
  
            let filter1 = async (arr, callback) => {
              const fail = Symbol()
              return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
            }
           
              (async () => {
                let newFilterArray = [];
  
                var items = await filter1(this.state.items, async item1 => {
                  console.log("32123", filter[2])
                  await doAsyncStuff();
                  if(filter[2] ) {
                    return filter[2].includes(item1.gender);
                  } else {
                    return null;
                  }
                  
                });
                
                newFilterArray = [...new Set([...newFilterArray,...items])];
                console.log("22",newFilterArray);
    
                this.setState({ searchItems:  newFilterArray });
          
                return items;
              })()
        }
        else if(type == "season") {

          filter[3] = filter[3].filter(item => {
            if(filter[3].length == 1 ) {
              return false;
            } else {
             return !value.includes(item);
            } 
            }); 


            console.log("boo",filter[3], filter)
  
     
            let doAsyncStuff = () => {
              return Promise.resolve()
            }
  
            let filter1 = async (arr, callback) => {
              const fail = Symbol()
              return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
            }
           
        
              (async () => {
                let newFilterArray = [];
  
                var items = await filter1(this.state.items, async item1 => {
                  console.log("32123", filter[3])
                  await doAsyncStuff();
                  if(filter[3] ) {
                    return filter[3].includes(item1.season);
                  } else {
                    return null;
                  }  
                });
      
                newFilterArray = [...new Set([...newFilterArray,...items])];
                console.log("22",newFilterArray);
    
                this.setState({ searchItems:  newFilterArray });
          
                return items;
              })()
        }

        this.setState({selectedFilter: filter});

      }

      // if(filter.length > 0 ) {
      
      //     console.log("1",filter);

      // } else {
      //   this.setState({ searchItems:  [] });
      // }

  };

  render() {  
    console.log("st3",  this.state)
    return (
      <Container>
        <HeadBar searchItems={this.searchItemHandler}/>
        <ShopContainer>
          <FilterBar filterItemHandler={this.filterItemHandler} ref={this.filterPage} uniqueBrands={this.state.uniqueBrands} uniqueGenders={this.state.uniqueGenders} uniqueCategories={this.state.uniqueCategories} uniqueSeasons={this.state.uniqueSeasons}/>

          <Route exact path="/" render={(props) => (<Shop  {...props} items={ this.state.searchItems.length > 0
                  ? this.state.searchItems
                  : this.state.items} />)} />

          <Route path="/item/:itemId" render={(props) => (<Item  {...props} items={this.state.items} />)} />
        </ShopContainer>
      </Container>
    );
  }
}

export default App;