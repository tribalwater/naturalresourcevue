import React, { Component } from 'react';
import { Button, Menu, Grid, Header, Segment, Select, Icon} from "semantic-ui-react";

class MainPageHeader extends Component {
    render() {
        return (
          <Grid  padded  stackable  className="top-header">
              <Grid.Column computer={8} mobile={16}  textAlign="left"   >
                {this.props.header}
              </Grid.Column>
              <Grid.Column computer={8} mobile={16}  id="no-pading"  >
                {this.props.buttonGroupOne}
              </Grid.Column>
              <Grid.Column computer={16} mobile={16} id="no-pading" >
                {this.props.buttonGroupTwo}
              </Grid.Column>   
          </Grid>
        );
    }
}


 
  export default MainPageHeader;