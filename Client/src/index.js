import React from "react";
import { render } from "react-dom";
import { Button, Container, Divider, Dropdown, Header, Message, Segment, Menu, Icon, Image,  Sidebar, Grid, Label, Input, Select, Card} from "semantic-ui-react";

import HorizontalSlideMenu from "./common/HorizontalSlidMenu"
import {getData, getDisp} from "./FakeData";
import ItemPropertiesTable from "./common/ItemPropertiesTable"
import 'semantic-ui-css/semantic.min.css';

let src = "http://via.placeholder.com/450x150"
const CardExampleColored = () => (
  <Card.Group itemsPerRow={2}>
    <Card color='red' image={src} />
    <Card color='orange' image={src} />
    <Card color='yellow' image={src} />
    <Card color='olive' image={src} />
    <Card color='green' image={src} />
    <Card color='teal' image={src} />
    <Card color='blue' image={src} />
    <Card color='violet' image={src} />
    <Card color='purple' image={src} />
    <Card color='pink' image={src} />
    <Card color='brown' image={src} />
    <Card color='grey' image={src} />
    <Card color='red' image={src} />
    <Card color='orange' image={src} />
    <Card color='yellow' image={src} />
    <Card color='olive' image={src} />
    <Card color='green' image={src} />
    <Card color='teal' image={src} />
    <Card color='blue' image={src} />
    <Card color='violet' image={src} />
    <Card color='purple' image={src} />
    <Card color='pink' image={src} />
    <Card color='brown' image={src} />
    <Card color='grey' image={src} />
  </Card.Group>
)
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
      disp: getDisp(),
      menuVisible: false,
      formattedItemProps : [],
      containerHeight: 0
    };

    this.updateContainerDimensions = this.updateContainerDimensions.bind(this);
  }

  componentWillMount(){
    let singleRec = this.state.data[0];
    let props = [];
    let labels = [];

    for (const key in singleRec) {
      if (singleRec.hasOwnProperty(key)) {
        if(this.state.disp.hasOwnProperty(key))
          props.push(singleRec[key])
        
      }
    }

    for (const key in this.state.disp) {
      if (this.state.disp.hasOwnProperty(key)) {
        const element = this.state.disp[key];
        if(element.fieldtype == 'label'){
          props.push(element)
        }
      }
    }

    props.sort( (a,b) => a.sortorder - b.sortorder)
    
    for (let index = 0; index < 1000; index++) {
    props.push({
       fieldtype: "hello",
       fieldvalue: "fuck" + index,
       displayname: "sdfsdf"
     })
      
    }
    this.setState({formattedItemProps : props});
    
  }

  componentDidMount(){
    

   window.addEventListener("resize", this.updateContainerDimensions);
   this.updateContainerDimensions();
  }

  componentDidUpdate(){
 
  }
  updateContainerDimensions(){
    let {content} = this.refs;
    console.log("---- height ------");
    console.log(content.offsetHeight);
    console.log(content.children[0].offsetHeight);
    let cHeight = content.offsetHeight - content.children[0].offsetHeight ;
    this.setState({containerHeight: cHeight });

  }
  render() {
    // const { data } = this.state;
    let first = this.state.data[0];
    let firstFields = [];
    for(var key in first ){
        firstFields.push(first[key])
    }
    return (
      <div className="full-height" ref="sidebar" >
      <Menu secondary attached="top"  compact className="top-menu">
        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}  >
          <Icon name="sidebar" />NR
         
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
    
       <Sidebar.Pusher dimmed={this.state.menuVisible} >
       <div className="app-wrapper" ref="content">
         <Grid  padded  stackable as={Segment}  className="top-header">
            
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
       
      
       <Segment  className="page-container" style={{height: this.state.containerHeight}}> 
       
              
            <CardExampleColored></CardExampleColored>     
           <ItemPropertiesTable fields = {this.state.formattedItemProps} > </ItemPropertiesTable>
        </Segment>
       </div>
        
      
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
      <Menu    pointing  borderless  fluid>
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
       
      </Menu>
    )
  }
}



render(<App />, document.getElementById("root"));
