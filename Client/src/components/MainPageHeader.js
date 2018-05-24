import React, { Component } from 'react';
import { Button, Menu, Grid, Header, Segment, Select, Icon} from "semantic-ui-react";
import Media from "react-media";

import ItemPropertiesButtons from "./ItemPropertiesButtons";

class MainPageHeader extends Component {
    render() {
        return (
          <Grid  padded  stackable  className="top-header">
              <Grid.Column computer={8} mobile={16}  textAlign="left"   >
                <Header as="h3">Tribal Ground Water Use Permit Application Properties</Header> 
              </Grid.Column>
              <Grid.Column computer={8} mobile={16}  id="no-pading"  >
                <Media query="(max-width: 700px)">
                  {matches =>
                    matches ? (
                      <SelectExample></SelectExample>
                    ) : (
                      <ButtonExampleGroup></ButtonExampleGroup> 
                    )
                  }
                </Media>
              </Grid.Column>
              <Grid.Column computer={16} mobile={16} id="no-pading" >
                <ItemPropertiesButtons></ItemPropertiesButtons>
              </Grid.Column>   
          </Grid>
        );
    }
}

let countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' } ]

const SelectExample = () => (
  <Select placeholder='Select your country' fluid options={countryOptions} />
)

  
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