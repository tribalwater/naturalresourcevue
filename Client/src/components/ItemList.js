import React, { Component } from 'react';

class ItemList extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ItemList;

const CardExampleHeaderCard = () => (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header>Matthew Harris</Card.Header>
          <Card.Meta>Co-Worker</Card.Meta>
          <Card.Description>
            Matthew is a pianist living in Nashville.
          </Card.Description>
          <Card.Meta>
            <Header as="h5" color="blue" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
          </Card.Meta>
        </Card.Content>
       
      </Card>
  
      <Card fluid>
        <Card.Content>
          <Card.Header content="Jake Smith" />
          <Card.Meta content="Musicians" />
          <Card.Description content="Jake is a drummer living in New York." />
        </Card.Content>
      </Card>
  
      <Card fluid>
        <Card.Content
          header="Elliot Baker"
          meta="Friend"
          description="Elliot is a music producer lisssdfsdfsdfsdfsdfs sdfsdfds sdfving in Chicago."
        />
      </Card>
  
      <Card
        fluid
        header="Jenny Hess"
        meta="Friend"
        description="Jenny is a student studying Media Management at the New School"
      />
    </Card.Group>
  );
  const App = () => (
    <Container>
      <Header as="h1" floated="left">
        <Icon name="arrow left" />
        Click Fork to get started
      </Header>
  
      <Divider hidden clearing />
      <List>
        <List.Item className="list-b">
          <List.Header>Well Tag : 1351, Org Owner : James Taylor</List.Header>
          <List.Content>
            {" "}
            Status: complete, Acerage: 500, Depth:100ft{" "}
          </List.Content>
  
          <Header as="h5" color="blue" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
        </List.Item>
        <List.Item className="list-b">
          <List.Header>Well Tag : 1351, Org Owner : James Taylor</List.Header>
          <List.Content>
            {" "}
            Status: complete, Acerage: 500, Depth:100ft{" "}
          </List.Content>
  
          <Header as="h5" color="blue" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
        </List.Item>
        <List.Item className="list-b">
          <List.Header>
            Well Tag : 1351, Org Owner : James Taylor, other: other
          </List.Header>
          <List.Content>
            Status: complete, Acerage: 500, Depth:100ft{" "}
          </List.Content>
  
          <Header as="h5" color="blue" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
        </List.Item>
        <List.Item className="list-b">
          <List.Header>Well Tag : 1351, Org Owner : James Taylor</List.Header>
          <List.Content>
            {" "}
            Status: complete, Acerage: 500, Depth:100ft{" "}
          </List.Content>
  
          <Header as="h5" color="blue" clasName="list-b" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
        </List.Item>
        <List.Item className="list-b">
          <List.Header>Well Tag : 1351, Org Owner : James Taylor</List.Header>
          <List.Content>
            {" "}
            Status: complete, Acerage: 500, Depth:100ft{" "}
          </List.Content>
  
          <Header as="h5" color="blue" floated="left">
            View Details <Icon name="arrow right" />
          </Header>
        </List.Item>
      </List>
      <CardExampleHeaderCard />
      <AccordionExampleStyled />
      <Message info>
        After forking, update this template to demonstrate the bug.
      </Message>
    </Container>
  );