import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
let cols = getCols();
let data = getData();
console.log(cols);
console.log(cols[2].accessor(data[0]));
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: getData()
        };
    }
    render() {
        // const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={cols}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
                <Tips />
                <Logo />
            </div>
        );
    }
}

function getValue(d) {

}

function getCols() {
    var listedOBj = {};
    var disp = getDisp();
    for (var key in disp) {
        if (disp[key]["listeditem"] == "Y") {
            listedOBj[key] = disp[key];
        }
    }
    var cols = [];

    for (var key in listedOBj) {
        var col = {};
        var fName = listedOBj[key].fieldname;
        console.log(fName);



        col.Header = listedOBj[key].displayname;
        col.accessor = getDFunc(fName);
        col.id = listedOBj[key].fieldname;

        cols.push(col);
    }

    return cols;
}

function getDFunc(fName) {
    return d => d[fName].fieldvalue
}
function getDisp() {
    return {
        itemid: {
            fieldname: "itemid",
            itemtypecd: "document",
            displayname: "Tribal Surface Water Use Permit Application",
            fieldlength: 0,
            maxlength: 0,
            required: "N",
            listeditem: "N",
            fieldtype: "itemid",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 0,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        documentnumber: {
            fieldname: "documentnumber",
            itemtypecd: "document",
            displayname: "Application Number",
            fieldlength: 50,
            maxlength: 50,
            required: "Y",
            listeditem: "Y",
            fieldtype: "autonumber",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: "1000",
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 2,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        createddate: {
            fieldname: "createddate",
            itemtypecd: "document",
            displayname: "Application Date",
            fieldlength: 12,
            maxlength: 12,
            required: "Y",
            listeditem: "Y",
            fieldtype: "date",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the date of application",
            keyfield: "Y",
            sortorder: 8,
            sortposition: 0,
            sortdirection: "desc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        status: {
            fieldname: "status",
            itemtypecd: "document",
            displayname: "Status",
            fieldlength: 1,
            maxlength: 1,
            required: "Y",
            listeditem: "Y",
            fieldtype: "picklist",
            itemvaluegroup: "approval",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the status of the application",
            keyfield: "Y",
            sortorder: 15,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc0: {
            fieldname: "rlc0",
            itemtypecd: "document",
            displayname: "Applicant Information",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "label",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter Application Information",
            keyfield: "N",
            sortorder: 20,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        createdby: {
            fieldname: "createdby",
            itemtypecd: "document",
            displayname: "Individual Applicant ",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "Y",
            fieldtype: "pickwindow",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "ci_properties",
            parentcolumn: "flexfield27",
            parentfieldname: "itemid",
            parentsubtype: "applicant",
            defaultvalue: 'Request.Params.Get("defaultrelid")',
            linkfield: "itemid",
            linktype: "drilldown",
            tooltip: "Individual applying for water permit",
            keyfield: "Y",
            sortorder: 30,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar",
            lc: "_4"
        },
        approvalby: {
            fieldname: "approvalby",
            itemtypecd: "document",
            displayname: "Co-Applicant",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "Y",
            fieldtype: "pickwindow",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "lastnamefirst",
            parentfieldname: "itemid",
            parentsubtype: "contact",
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Pick the co-applicant name from the list",
            keyfield: "N",
            sortorder: 40,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar",
            lc: "_5"
        },
        rlc1: {
            fieldname: "rlc1",
            itemtypecd: "document",
            displayname: "Mailing Address",
            fieldlength: 60,
            maxlength: 250,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "address",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the applicants mailing address",
            keyfield: "N",
            sortorder: 45,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc2: {
            fieldname: "rlc2",
            itemtypecd: "document",
            displayname: "City",
            fieldlength: 60,
            maxlength: 250,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: "city",
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "city",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the city of the mailing address",
            keyfield: "N",
            sortorder: 50,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc3: {
            fieldname: "rlc3",
            itemtypecd: "document",
            displayname: "State",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: "state",
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "state",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the state of the mailing address",
            keyfield: "N",
            sortorder: 60,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc4: {
            fieldname: "rlc4",
            itemtypecd: "document",
            displayname: "Zip",
            fieldlength: 10,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "zip",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the zip code of the mailing address",
            keyfield: "N",
            sortorder: 70,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc5: {
            fieldname: "rlc5",
            itemtypecd: "document",
            displayname: "Mailing Address 2",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "companyname",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 71,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc6: {
            fieldname: "rlc6",
            itemtypecd: "document",
            displayname: "City 2",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "flexfield4",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 72,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc7: {
            fieldname: "rlc7",
            itemtypecd: "document",
            displayname: "State 2",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "country",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 73,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc8: {
            fieldname: "rlc8",
            itemtypecd: "document",
            displayname: "Zip 2",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "flexfield5",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 74,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc9: {
            fieldname: "rlc9",
            itemtypecd: "document",
            displayname: "Phone Number",
            fieldlength: 30,
            maxlength: 30,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "phonenumber",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the phone number of the applicant",
            keyfield: "N",
            sortorder: 80,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc10: {
            fieldname: "rlc10",
            itemtypecd: "document",
            displayname: "Email",
            fieldlength: 40,
            maxlength: 40,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "email",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the email of the applicant",
            keyfield: "N",
            sortorder: 84,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield1: {
            fieldname: "flexfield1",
            itemtypecd: "document",
            displayname: "Name of Organization",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "Y",
            fieldtype: "pickwindow",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "organizationname",
            parentfieldname: "itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: "itemid",
            linktype: "drilldown",
            tooltip: "Name of company/organization applying for water",
            keyfield: "Y",
            sortorder: 86,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar",
            lc: "_16"
        },
        rlc11: {
            fieldname: "rlc11",
            itemtypecd: "document",
            displayname: "Name of Representative",
            fieldlength: 50,
            maxlength: 250,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "cmd",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Name of person respresenting the ogranization",
            keyfield: "Y",
            sortorder: 87,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        subcat2: {
            fieldname: "subcat2",
            itemtypecd: "document",
            displayname: "Title of Representative",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "flexfield1",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 87,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield16: {
            fieldname: "flexfield16",
            itemtypecd: "document",
            displayname: "Mailing Address",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "location",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Mailing address of organization applying for water",
            keyfield: "Y",
            sortorder: 88,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield10: {
            fieldname: "flexfield10",
            itemtypecd: "document",
            displayname: "City",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "flexfield2",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 89,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        state: {
            fieldname: "state",
            itemtypecd: "document",
            displayname: "State",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "state",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 90,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc12: {
            fieldname: "rlc12",
            itemtypecd: "document",
            displayname: "Zip Code",
            fieldlength: 10,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "modelid",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 91,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        apnd: {
            fieldname: "apnd",
            itemtypecd: "document",
            displayname: "Phone Number Day and Night",
            fieldlength: 40,
            maxlength: 40,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "mission",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 92,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        enterprise: {
            fieldname: "enterprise",
            itemtypecd: "document",
            displayname: "Mobile Phone Number",
            fieldlength: 40,
            maxlength: 40,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "flexfield3",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 93,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        category: {
            fieldname: "category",
            itemtypecd: "document",
            displayname: "Fax Number",
            fieldlength: 40,
            maxlength: 40,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "subcmd",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 94,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        classification: {
            fieldname: "classification",
            itemtypecd: "document",
            displayname: "Email Address",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "organization_properties",
            parentcolumn: "vision",
            parentfieldname: "flexfield1.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "Y",
            sortorder: 95,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc13: {
            fieldname: "rlc13",
            itemtypecd: "document",
            displayname: "Tribe Status",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "user_properties",
            parentcolumn: "securityofficername",
            parentfieldname: "createdby.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Enter the applicants tribe status",
            keyfield: "N",
            sortorder: 96,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc14: {
            fieldname: "rlc14",
            itemtypecd: "document",
            displayname: "Place of Use (See Related Allotments for POU)",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "label",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Place of Use Information (See Related Allotments for POU)",
            keyfield: "N",
            sortorder: 120,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield6: {
            fieldname: "flexfield6",
            itemtypecd: "document",
            displayname: "Lease No.",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "Y",
            fieldtype: "pickwindow",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "document_properties",
            parentcolumn: "documentnumber",
            parentfieldname: "itemid",
            parentsubtype: "lease",
            defaultvalue: null,
            linkfield: "itemid",
            linktype: "drilldown",
            tooltip: "Enter the lease number",
            keyfield: "N",
            sortorder: 145,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar",
            lc: "_29"
        },
        rlc15: {
            fieldname: "rlc15",
            itemtypecd: "document",
            displayname: "Term of Lease",
            fieldlength: 5,
            maxlength: 5,
            required: "N",
            listeditem: "N",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "document_properties leasetable",
            parentcolumn: "flexfield10",
            parentfieldname: "flexfield6.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Term of lease in years",
            keyfield: "N",
            sortorder: 150,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc16: {
            fieldname: "rlc16",
            itemtypecd: "document",
            displayname: "Lease Type",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "Y",
            fieldtype: "linkedfield",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: "document_properties lease",
            parentcolumn: "classification",
            parentfieldname: "flexfield6.itemid",
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: null,
            keyfield: "N",
            sortorder: 155,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc17: {
            fieldname: "rlc17",
            itemtypecd: "document",
            displayname: "Water Use (See Relations Tab for water sources)",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "label",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Water Use (See Relations Tab for water sources)",
            keyfield: "N",
            sortorder: 160,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        numofpages: {
            fieldname: "numofpages",
            itemtypecd: "document",
            displayname: "Purpose of Use",
            fieldlength: 5,
            maxlength: 5,
            required: "N",
            listeditem: "Y",
            fieldtype: "picklist",
            itemvaluegroup: "permitpurpose",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Select the applicable purpose of use",
            keyfield: "N",
            sortorder: 170,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: "Y",
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield3: {
            fieldname: "flexfield3",
            itemtypecd: "document",
            displayname: "Amount of water",
            fieldlength: 60,
            maxlength: 250,
            required: "N",
            listeditem: "N",
            fieldtype: "text",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "Amount of water proposed to be used from each source in cubic-feet-per-second(cfs)",
            keyfield: "N",
            sortorder: 180,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        shelf: {
            fieldname: "shelf",
            itemtypecd: "document",
            displayname: "Consumptive",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "picklist",
            itemvaluegroup: "YesNo",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "Check the appropriate box to mark consumptive (Y) or non-conumptive (N)",
            keyfield: "N",
            sortorder: 185,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield11: {
            fieldname: "flexfield11",
            itemtypecd: "document",
            displayname: "Period of Use (Start)",
            fieldlength: 7,
            maxlength: 7,
            required: "N",
            listeditem: "N",
            fieldtype: "date",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "Enter the date when the applicant will begin using the water source",
            keyfield: "N",
            sortorder: 190,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        determinationdate: {
            fieldname: "determinationdate",
            itemtypecd: "document",
            displayname: "Period of Use (End)",
            fieldlength: 7,
            maxlength: 7,
            required: "N",
            listeditem: "N",
            fieldtype: "date",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "Enter the date when the applicant will end using the water source",
            keyfield: "N",
            sortorder: 200,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        segment: {
            fieldname: "segment",
            itemtypecd: "document",
            displayname: "Acreage",
            fieldlength: 50,
            maxlength: 50,
            required: "N",
            listeditem: "N",
            fieldtype: "text",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Indicate the number of acres where water will be applied",
            keyfield: "N",
            sortorder: 210,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        rlc18: {
            fieldname: "rlc18",
            itemtypecd: "document",
            displayname: "Water Management (See Relations Tab for PODs)",
            fieldlength: 1,
            maxlength: 1,
            required: "N",
            listeditem: "N",
            fieldtype: "label",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Water Management (See Relations Tab for PODs)",
            keyfield: "N",
            sortorder: 220,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        commmanual: {
            fieldname: "commmanual",
            itemtypecd: "document",
            displayname: "Monitoring",
            fieldlength: 2,
            maxlength: 2,
            required: "N",
            listeditem: "N",
            fieldtype: "picklist",
            itemvaluegroup: "monitortype",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Method for monitoring the diversion.",
            keyfield: "N",
            sortorder: 230,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        releaseagency: {
            fieldname: "releaseagency",
            itemtypecd: "document",
            displayname: "Distribution Method",
            fieldlength: 80,
            maxlength: 80,
            required: "N",
            listeditem: "N",
            fieldtype: "checkbox",
            itemvaluegroup: "distributiontype",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "What equipment will be used to apply water to your place of use?",
            keyfield: "N",
            sortorder: 240,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        flexfield8: {
            fieldname: "flexfield8",
            itemtypecd: "document",
            displayname: "Irrigation Method",
            fieldlength: 3,
            maxlength: 3,
            required: "N",
            listeditem: "N",
            fieldtype: "checkbox",
            itemvaluegroup: "applicationmethod",
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip: "Irrigation or land application method (check all that apply)",
            keyfield: "N",
            sortorder: 250,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        },
        description: {
            fieldname: "description",
            itemtypecd: "document",
            displayname: "Comments",
            fieldlength: 50,
            maxlength: 2000,
            required: "N",
            listeditem: "N",
            fieldtype: "textarea",
            itemvaluegroup: null,
            subtypecd: "permit",
            parenttable: null,
            parentcolumn: null,
            parentfieldname: null,
            parentsubtype: null,
            defaultvalue: null,
            linkfield: null,
            linktype: null,
            tooltip:
            "Enter comments regarding water management including other monitoring, distribution, and irrigation methods",
            keyfield: "N",
            sortorder: 255,
            sortposition: 0,
            sortdirection: "asc",
            childfieldname: null,
            childxmldoc: null,
            customsql: null,
            exportcol: null,
            importcol: null,
            onblur: null,
            onchange: null,
            l: "rarar"
        }
    };
}

function getData() {
    return [
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "11/3/2005 12:00:00 AM",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "Fisher, Lori",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "NoWhere.com",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "Domestic Use\r\nCommercial",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "Farm",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "Yes",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "19",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000000017"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "Periodic Sampling\r\nWeir",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000019"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "250",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "11/3/2004 12:00:00 AM",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000068"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "17",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001001"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000048869"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "Center Pivot System, Siphon, Water Cannons, Other",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "P.O. Box 677",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1001",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "Direct pipe from source, In-line storage",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "00-079",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Fort Hall",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "41",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "48869",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "amt",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "68",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "7/19/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Approved",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: "48869"
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83203",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "NoWhere.com",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "83203",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "Farm & Pasture",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "PO Box 233",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "13",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048861"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "555-444-1212",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000013"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48861",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001002"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000048887"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "PO Box 232",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1002",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "sjp 12345",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "Shoshone-Bannok Tribal Member",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Fort Hall",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "7",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "48887",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "Fort Hall",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "8/4/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Rejected",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "ID",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: "48887"
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83203",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048872"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000000"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48872",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001003"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1003",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "10/8/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "NoWhere.com",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "20",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048895"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000020"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48895",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001005"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "P.O. Box 651",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1005",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Fort Hall",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "11/3/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Rejected",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83203",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "NoWhere.com",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "12",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048905"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000012"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48905",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001009"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "P.O. Box 5303",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1009",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Chubbuck",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "11/4/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Rejected",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83202",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "ete",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "5290",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048911"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000005290"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48911",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001010"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "12323",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "CA",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1010",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Pocatello",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "11/11/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Approved",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "etet",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "Agricultural Use",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "Gravity Irrigated Farm/Pasture",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "5299",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048912"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "208-237-8897",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "Other",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000005299"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "20.00",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48912",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001011"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000048913"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "Flood",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "308 Washington",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1011",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "Open canal",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "99-39",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "Non-Indian",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Pocatello",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "5",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "48913",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: ".5",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "12/28/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: "48913"
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83201",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "5300",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000048915"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "208-226-5296",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000005300"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "48915",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001012"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "2568 Joy Lane",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1012",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "Non-Indian",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "American Falls",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "1/14/2005 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83211",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050484"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50484",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001014"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1014",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/1/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050485"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50485",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001015"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1015",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "6/16/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050492"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50492",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001016"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1016",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/7/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050514"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50514",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001017"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1017",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/1/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050521"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50521",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001018"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1018",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/1/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050531"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50531",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001019"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1019",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/8/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050532"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50532",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001020"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1020",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/7/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Approved",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "4",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000050533"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000004"
            },
            createdby_valdt: {
                fieldvalue: "000000004"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "50533",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "000001021"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000000"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1021",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "4",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "3/11/2017 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "In Process",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: ""
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        },
        {
            determinationdate: {
                displayname: "Period of Use (End)",
                fieldvalue: "5/18/2004 12:00:00 AM",
                fieldname: "determinationdate"
            },
            approvalby: {
                displayname: "Co-Applicant",
                fieldvalue: "",
                fieldname: "approvalby"
            },
            rlc10: {
                displayname: "Email",
                fieldvalue: "NoWhere.com",
                fieldname: "rlc10"
            },
            flexfield1: {
                displayname: "Name of Organization",
                fieldvalue: "",
                fieldname: "flexfield1"
            },
            numofpages: {
                displayname: "Purpose of Use",
                fieldvalue: "Agricultural Use",
                fieldname: "numofpages"
            },
            rlc8: {
                displayname: "Zip 2",
                fieldvalue: "83203",
                fieldname: "rlc8"
            },
            rlc16: {
                displayname: "Lease Type",
                fieldvalue: "Farm",
                fieldname: "rlc16"
            },
            flexfield1link: {
                fieldvalue: "",
                hide: ""
            },
            enterprise: {
                displayname: "Mobile Phone Number",
                fieldvalue: "",
                fieldname: "enterprise"
            },
            shelf: {
                displayname: "Consumptive",
                fieldvalue: "Yes",
                fieldname: "shelf"
            },
            rlc5: {
                displayname: "Mailing Address 2",
                fieldvalue: "PO Box 233",
                fieldname: "rlc5"
            },
            createdby_val: {
                fieldvalue: "13",
                hide: ""
            },
            classification: {
                displayname: "Email Address",
                fieldvalue: "",
                fieldname: "classification"
            },
            itemiddt: {
                fieldvalue: "000000001"
            },
            rlc9: {
                displayname: "Phone Number",
                fieldvalue: "555-444-1212",
                fieldname: "rlc9"
            },
            flexfield16: {
                displayname: "Mailing Address",
                fieldvalue: "",
                fieldname: "flexfield16"
            },
            commmanual: {
                displayname: "Monitoring",
                fieldvalue: "Meter",
                fieldname: "commmanual"
            },
            apnd: {
                displayname: "Phone Number Day and Night",
                fieldvalue: "",
                fieldname: "apnd"
            },
            allowed: {
                fieldvalue: "N"
            },
            createdbylinkdt: {
                fieldvalue: "000000000"
            },
            createdby_valdt: {
                fieldvalue: "000000013"
            },
            segment: {
                displayname: "Acreage",
                fieldvalue: "100",
                fieldname: "segment"
            },
            flexfield11: {
                displayname: "Period of Use (Start)",
                fieldvalue: "5/18/2004 12:00:00 AM",
                fieldname: "flexfield11"
            },
            approvalby_valdt: {
                fieldvalue: "000000000"
            },
            itemid: {
                displayname: "Tribal Surface Water Use Permit Application",
                fieldvalue: "1",
                fieldname: "itemid",
                hide: ""
            },
            documentnumberdt: {
                fieldvalue: "001245-6D"
            },
            controlled: {
                fieldvalue: "N"
            },
            flexfield6linkdt: {
                fieldvalue: "000000003"
            },
            state: {
                displayname: "State",
                fieldvalue: "",
                fieldname: "state"
            },
            flexfield10: {
                displayname: "City",
                fieldvalue: "",
                fieldname: "flexfield10"
            },
            category: {
                displayname: "Fax Number",
                fieldvalue: "",
                fieldname: "category"
            },
            xcontrolled: "",
            rlc12dt: {
                fieldvalue: "000000000"
            },
            description: {
                displayname: "Comments",
                fieldvalue: "Other",
                fieldname: "description"
            },
            flexfield8: {
                displayname: "Irrigation Method",
                fieldvalue: "Other",
                fieldname: "flexfield8"
            },
            rlc1: {
                displayname: "Mailing Address",
                fieldvalue: "PO Box 232",
                fieldname: "rlc1"
            },
            rlc3: {
                displayname: "State",
                fieldvalue: "ID",
                fieldname: "rlc3"
            },
            documentnumber: {
                displayname: "Application Number",
                fieldvalue: "1245-6D",
                fieldname: "documentnumber",
                hide: ""
            },
            releaseagency: {
                displayname: "Distribution Method",
                fieldvalue: "Direct pipe from source",
                fieldname: "releaseagency"
            },
            flexfield6: {
                displayname: "Lease No.",
                fieldvalue: "1254-58",
                fieldname: "flexfield6"
            },
            rlc13: {
                displayname: "Tribe Status",
                fieldvalue: "Shoshone-Bannok Tribal Member",
                fieldname: "rlc13"
            },
            createdbylink: {
                fieldvalue: "",
                hide: ""
            },
            xallowed: "",
            rlc12: {
                displayname: "Zip Code",
                fieldvalue: "",
                fieldname: "rlc12",
                hide: ""
            },
            subcat2: {
                displayname: "Title of Representative",
                fieldvalue: "",
                fieldname: "subcat2"
            },
            rlc2: {
                displayname: "City",
                fieldvalue: "Fort Hall",
                fieldname: "rlc2"
            },
            flexfield1_val: {
                fieldvalue: ""
            },
            rlc15: {
                displayname: "Term of Lease",
                fieldvalue: "1",
                fieldname: "rlc15"
            },
            flexfield6link: {
                fieldvalue: "3",
                hide: ""
            },
            flexfield3: {
                displayname: "Amount of water",
                fieldvalue: "20 cfs",
                fieldname: "flexfield3"
            },
            approvalby_val: {
                fieldvalue: "",
                hide: ""
            },
            rlc6: {
                displayname: "City 2",
                fieldvalue: "Fort Hall",
                fieldname: "rlc6"
            },
            createddate: {
                displayname: "Application Date",
                fieldvalue: "5/14/2004 12:00:00 AM",
                fieldname: "createddate"
            },
            status: {
                displayname: "Status",
                fieldvalue: "Rejected",
                fieldname: "status"
            },
            rlc7: {
                displayname: "State 2",
                fieldvalue: "ID",
                fieldname: "rlc7"
            },
            flexfield1linkdt: {
                fieldvalue: "000000000"
            },
            flexfield6_val: {
                fieldvalue: "3"
            },
            rlc4: {
                displayname: "Zip",
                fieldvalue: "83203",
                fieldname: "rlc4"
            },
            rlc11: {
                displayname: "Name of Representative",
                fieldvalue: "",
                fieldname: "rlc11"
            },
            createdby: {
                displayname: "Individual Applicant ",
                fieldvalue: "",
                fieldname: "createdby"
            }
        }
    ];
}

render(<App />, document.getElementById("root"));
