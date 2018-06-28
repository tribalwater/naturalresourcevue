import React, { Component } from 'react';
import { throttle, debounce } from 'throttle-debounce';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';

class ItemLookUpThrottled extends Component {
    constructor(props) {
        super(props);
        this.state = { q: "", options : [
            {
                value: "go",
                text: "go"
            }
        ]};
        this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
        this.autocompleteSearchThrottled = throttle(500, this.autocompleteSearch);
      }
    
      changeQuery = event => {
        this.setState({ q: event.target.value }, () => {
          const q = this.state.q;
          if (q.length < 5) {
            this.autocompleteSearchThrottled(this.state.q);
          } else {
            this.autocompleteSearchDebounced(this.state.q);
          }
        });
      };
    
      autocompleteSearch = q => {
        this._fetch(q);
        let searchVals = [];
        searchVals.push(q);
        axios.post("http://localhost:51086/api/item/user/user/searchlike", {
             "hello" : "ros" ,
             "cols"  : ["flexfield27"],
             "likevals" : searchVals,
             "itemtable" : "ci_properties",
             "subtype" : "applicant"
        }).then((data) => {
            const _searches = this.state._searches || [];
            const options = this.state.options || [];
            _searches.push(data.data[0]["FLEXFIELD27"]);
            options.push({value: data.data[0]["FLEXFIELD27"] , text: data.data[0]["FLEXFIELD27"]  })
            console.log(data.data)
            this.setState({ _searches });
            this.setState({options})
            
        })
      };
    
      _fetch = q => {
        const _searches = this.state._searches || [];
        _searches.push(q);
        this.setState({ _searches });
      };

      handleOnChnage = (e, data) => {
          this.autocompleteSearch(data.searchQuery)
          console.log( data.searchQuery)
      }
      render() {
        const _searches = this.state._searches || [];
        return (
          <div>
          
            <input
              placeholder="Type something here"
              type="text"
              value={this.state.q}
              onChange={this.changeQuery}
            />
             <Dropdown placeholder='Lastname First' fluid search selection options={this.state.options}  onSearchChange={this.handleOnChnage}/>
            <ol>
              {_searches.map((s, i) => {
                return <li key={s + i}>{s}</li>;
              })}
            </ol>
          </div>
        );
      }
    }

export default ItemLookUpThrottled;