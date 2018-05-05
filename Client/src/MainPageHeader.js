import React, { Component } from 'react';
import { Button, Menu, Grid, Header, Segment} from "semantic-ui-react";
import HorizontalSlideMenu from "./common/HorizontalSlidMenu";


class MainPageHeader extends Component {
    render() {
        return (
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
              {/* <Menu>
              <HorizontalSlideMenu></HorizontalSlideMenu>
                  
              </Menu> */}
          </Grid>
        );
    }
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
  
  
  const ButtonExampleGroup = () => (
    <Button.Group  secondary size="small" floated="right">
      <Button>view gis</Button>
      <Button>NRCE</Button>
      <Button>Email</Button>
      <Button>Audit Trail</Button>
      <Button>New Well site Report</Button>
      <Button>Three</Button>
    </Button.Group>
  )
 
  export default MainPageHeader;