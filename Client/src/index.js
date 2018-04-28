import React from "react";
import { render } from "react-dom";
import { Button, Container, Divider, Dropdown, Header, Message, Segment, Menu, Icon, Image,  Sidebar, Grid, Label, Input, Select} from "semantic-ui-react";

import HorizontalSlideMenu from "./common/HorizontalSlidMenu"
import {getData, getDisp} from "./FakeData";
import ItemPropertiesTable from "./common/ItemPropertiesTable"
import 'semantic-ui-css/semantic.min.css';


// Import React Table
var splitterStyle = {
  width: 300,
  backgroundColor: "blue"
}

const options = [
  {
    key: 'today',
    text: 'today',
    value: 'today',
    content: 'Today',
  },
  {
    key: 'this week',
    text: 'this week',
    value: 'this week',
    content: 'This Week',
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
  },
]
const DropdownExampleDropdown = () => (
  <Dropdown direction="left" options={options} text=""defaultValue={options[0].value} />
)

const options2= [
  { key: 'edit',  text: 'Edit Post', value: 'edit' },
  { key: 'delete',  text: 'Remove Post', value: 'delete' },
  { key: 'hide', text: 'Hide Post', value: 'hide' },
]

const DropdownExampleFloating = () => (
  <Menu.Menu position='right'>
      <Dropdown item simple  direction='left' options={options} />
    </Menu.Menu>

)
const ButtonExampleGroup = () => (
  <Button.Group size="small" floated="right">
    <Button>view gis</Button>
    <Button>NRCE</Button>
    <Button>Email</Button>
    <Button>Audit Trail</Button>
    <Button>New Well site Report</Button>
    <Button>Three</Button>
  </Button.Group>
)
const QuickNavButtonGroup = () => (
  <Button.Group size="small" floated="right">
    <Button primary>Program Folders</Button>
    <Button primary>Calender</Button>
    <Button primary>Reports</Button>
  
  </Button.Group>
)

const SelectExample = () => (
  <Select  fluid placeholder='Select your country' options={options} />
)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: getData(),
      menuVisible: false
    };
  }
  render() {
    // const { data } = this.state;
    let first = this.state.data[0];
    let firstFields = [];
    for(var key in first ){
        firstFields.push(first[key])
    }
    return (
      <div className="full-height">
      <Menu secondary attached="top"  compact className="top-menu">
        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}  >
          <Icon name="sidebar" />TD
         
        </Menu.Item>  
        <Menu.Item position="right">
          <HorizontalSlideMenu /> 
          {/* <DropdownExampleFloating></DropdownExampleFloating> */}
        </Menu.Item>   
                
      </Menu>
    <Sidebar.Pushable as={Segment} attached="bottom" >
      <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inline >
        <Menu.Item><Icon name="home" />Home</Menu.Item>
        <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
        <Menu.Item><Icon name="smile" />Friends</Menu.Item>
        <Menu.Item><Icon name="calendar" />History</Menu.Item>    
      </Sidebar>
    
       <Sidebar.Pusher dimmed={this.state.menuVisible} className="app-wrapper" >
      
        <Grid Stackable  padded>
            
            <Grid.Column computer={8} mobile={16}  textAlign="left"   >
              <Header as="h3">Tribal Ground Water Use Permit Application Properties</Header> 
            </Grid.Column>
            <Grid.Column computer={8} mobile={16}  textAlign="left"  >
            <ButtonExampleGroup></ButtonExampleGroup> 
            {/* <QuickNavButtonGroup></QuickNavButtonGroup> */}
            </Grid.Column>
            {/* <SelectExample></SelectExample> */}
            <MenuExampleBasic ></MenuExampleBasic>
        </Grid>
       
      
       <Segment  className="page-container" inverted> 
       
              
             
              <ItemPropertiesTable fields = {firstFields} ></ItemPropertiesTable>
        </Segment>
      
       </Sidebar.Pusher>
    </Sidebar.Pushable>
    {/* <HorizontalSlideMenu wrapperClassName="tabs-hr-menu-wrapper" />  */}
    </div>
    );
  }
}

function getValue(d){
  
}


class MenuExampleBasic extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu    pointing  borderless className="border-less"  fluid>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
        
        </Menu.Item>
      </Menu>
    )
  }
}
 class MenuExampleVertical extends React.Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
          <Label color='teal'>1</Label>
          Inbox
        </Menu.Item>

        <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
          <Label>51</Label>
          Spam
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>1</Label>
          Updates
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
    )
  }
}



render(<App />, document.getElementById("root"));
