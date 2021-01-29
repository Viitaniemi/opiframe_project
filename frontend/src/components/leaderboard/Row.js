import React from 'react';
import { Route } from 'react-router-dom';
import {Table} from 'semantic-ui-react';

export default class Row extends React.Component{
    render(){
        return(
            <Table.Row>
                <Table.Cell>{this.props.place}</Table.Cell>
                <Table.Cell>{this.props.name}</Table.Cell>
                <Table.Cell>{this.props.class}</Table.Cell>
                <Table.Cell>{this.props.time}</Table.Cell>
            </Table.Row>
        )
    }
}