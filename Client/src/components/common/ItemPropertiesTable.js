import React from 'react'
import { Table, Button, Icon, Header } from 'semantic-ui-react'
import ItemPropertiesRow from './ItemPropertiesRow'

class ItemPropertiesTable extends React.Component {
    constructor() {
      super();
  
      this.state = {
       sections : {},
       expandedRows: []
      }
  
      this.toggleSection = this.toggleSection.bind(this);
    }
  
    componentWillMount() {
    
        let section;
        let lastSectionId;  

        let labelArr = this.props.fields.reduce( (acc, field, idx, labelArr)  =>  {    
           if(field.fieldtype == 'label') {
               field.id =  `section${idx}`; 
               acc.push({ startIndex : idx + 1, id : `section${idx}` }); 
           }    
           return acc;
        }, []);
      
        let sectionsObj = labelArr.reduce( 
            (acc, field, idx, labelArr) => {
              field.endIndex = (idx < labelArr.length - 1) ? labelArr[idx + 1].startIndex - 1 : this.props.fields.length;  
              field.isVisible = true;
              acc[field.id]  = field;
              return acc; 
        }, {})
        
        this.setState({sections : sectionsObj, expandedRows : this.props.fields});

               
    }

    componentDidMount(){
      
    }
  
    toggleSection(sectionId) {
      
      let { startIndex, endIndex, isVisible } =
      this.state.sections[sectionId];
      //  alert(this.state.data[3].name)
      let newExpanded = this.state.expandedRows.slice();
      if (isVisible) {
       // newExpanded.splice(startIndex, endIndex - startIndex);
        for (let index = startIndex; index <  endIndex ; index++) {
            newExpanded[index] = null    
        }
      } else {
        let toAdd = this.props.fields.slice(startIndex, endIndex);
        //newExpanded.splice(startIndex, 0, ...toAdd);
        for (let index = startIndex; index <  endIndex ; index++) {
            newExpanded[index] = this.props.fields[index] 
        }
      }
      let sectionsCopy = Object.assign({}, this.state.sections);
      sectionsCopy[sectionId].isVisible = !sectionsCopy[sectionId].isVisible;
     
      this.setState({
        expandedRows: newExpanded,
        sections: sectionsCopy
      });

      console.log(sectionsCopy)
  
      //console.log(expandCopy);
    }
    render() {
      console.log("rendeer");
      let fields = this.state.expandedRows;
      let sections = this.state;
     // this.state.expandedRows.map(d => <tr> {d.name} </tr>);
     // console.log(rows);
      return (
          <div>
        <Header  className="prop-table-label-row" as="h1" textAlign="left"> Item Properties </Header>
          
        <Table celled striped >
        
            <Table.Body>
            {  
                fields.map( field => {
                    if(field){
                        if(field.fieldtype == 'label' ){
                            let { startIndex, endIndex, isVisible } =
                            this.state.sections[field.id];
                            return <Table.Row  key={field.fieldname}> 
                                        <Table.Cell width={3} className="prop-table-label-row"  > 
                                            <Button primary onClick={() => this.toggleSection(field.id)} key={field.fieldname} fluid size="tiny">
                                            <Icon name= {isVisible ? 'chevron down': 'chevron right' } />
                                            </Button> 
                                            
                                        </Table.Cell>
                                        <Table.Cell width={13}  className="prop-table-label-row">
                                             <Header  className="prop-table-label-row" as="h3" textAlign="center">{field.displayname}</Header> 
                                     </Table.Cell>
                                       
                                        
                                    </Table.Row>
                        }else {
                            return <ItemPropertiesRow   key={field.fieldname} {...field} />
                      
                        }  
                    }
                          
                })
            }
            </Table.Body>
         </Table>  
         </div>  
      );
    }
  
  }
  

export default ItemPropertiesTable;