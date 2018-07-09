import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { connect } from "react-redux";
import {  Link } from 'react-router-dom';


class ItemPropertiesTabs extends Component {
    state = { activeItem: 'bio' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
   
    componentDidMount(){
        let tabs = this.props.tabs;
        if(tabs && tabs.length > 0){
            this.setState({activeItem : tabs[0].tabname})
        }
      
    }

    render() {
      const { activeItem } = this.state
      const { tabs } = this.props;
      console.log(this.props.tabs)
      let menuTabs = tabs.map( tab => { return  <Link to={`${this.props.baseUrl}/${tab.tabname.toLowerCase()}`}> 
                                                   <Menu.Item 
                                                  name={tab.tabname} 
                                                  active={activeItem === `${tab.tabname}` } 
                                                  onClick={this.handleItemClick} 
                                                  >
                                                  
                                                    {tab.tabname}
                                                  
                                               </Menu.Item>  
                                               </Link>     
                              })
      return (
        <Menu tabular>
          {menuTabs}
        </Menu>
      )
    }
}

const mapStateToProps = state => {
    return {
      tabs: state.itemproperties.tabs,
      baseUrl : state.itemproperties.tabsBaseUrl
    };
};


const dispatchObj = {}
//getItemList

export default connect(mapStateToProps, dispatchObj)(ItemPropertiesTabs);

