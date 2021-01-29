import React from 'react';
import { Table } from 'semantic-ui-react';
import Row from './Row';

export default class Leaderboard extends React.Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            top:10,
            league:'temp'
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    */

    render(){
        let tempJSON = '[{"place":1,"name":"asd","class":"Ascendant","time": 100},{"place":2,"name":"qwerty","class":"Ascendant","time":200}]';
        let tempLeaderboard = JSON.parse(tempJSON);
        //let rows = this.props.leaderboard.map((item) => {
        let rows = tempLeaderboard.map((item, index = 0) => {
            index++;
            let time = Math.floor(item.time / 60) + ':' + item.time % 60;
            return (
                <Row key={index} place={item.place} name={item.name} class={item.class} time={time}></Row>
            )
        })
        return(
            <div>
                <label htmlFor='top'>TOP:</label>
                <input type='number' step='1' name='top' value={this.props.top} onChange={this.props.onChange} min='1' max='100'/>
                <label htmlFor='league' style={{marginLeft:50}}>League:</label>
                <select name='league' value={this.props.league} onChange={this.props.onChange}>
                    <option value='temp'>Temporary</option>
                    <option value='tempssf'>Temporary SSF</option>
                    <option value='temphc'>Temporary HC</option>
                    <option value='temphcssf'>Temporary HC SSF</option>
                    <option value='standard'>Standard</option>
                    <option value='hardcore'>Hardcore</option>
                </select>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>#</Table.Cell>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>Ascendancy</Table.Cell>
                            <Table.Cell>Time</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}