import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class DataItem extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      name: this.props.data.name || '',
      phone: this.props.data.phone || ''
    }
  }

  handleNameChange(e){
    this.setState({name: e.target.value})
  }

  handlePhoneChange(e){
    this.setState({phone: e.target.value})
  }

  render(){
    const {data, deleteData} = this.props
    return(
      <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.phone}</td>
      <td><button type="button" className="delete-btn btn btn-danger" onClick={() => deleteData(data.id)}><span className="glyphicon glyphicon-trash"></span> delete</button></td>
      </tr>
    )
  }
}

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired
}

export default DataItem
