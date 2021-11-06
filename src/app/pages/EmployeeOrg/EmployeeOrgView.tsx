import React, { Component } from 'react'
import { employeeOrg } from '../../mocks/employees';
import { DrawerTree } from './utils/DrawerTree'
interface StateOrg {
    treeOrg: any,
    employee_id?: number,
    new_supervisor_id?: number
}
export class EmployeeOrgView extends Component {
    state: StateOrg = {
        treeOrg: new DrawerTree(employeeOrg),
        employee_id: undefined,
        new_supervisor_id: undefined
    };

    componentDidMount() {
        this.state.treeOrg.drawTree()
    }
    move = () => {
        this.state.treeOrg.TreeOrg.move(this.state.employee_id, this.state.new_supervisor_id)
        this.state.treeOrg.drawTree()
        this.setState({
            employee_id: undefined,
            new_supervisor_id: undefined
        })
    }
    undo = () => {
        this.state.treeOrg.TreeOrg.undo()
        this.state.treeOrg.drawTree()
        this.setState(this.state)
    }
    redo = () => {
        this.state.treeOrg.TreeOrg.redo()
        this.state.treeOrg.drawTree()
        this.setState(this.state)
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: parseInt(value)
        })
    }
    render() {
        return (
            <div className='root_tree' style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 50, width: '100%', padding: '15px 25px', boxSizing: 'border-box', borderBottom: "1px solid black", marginBottom: 10 }}>
                    <div className='d-flex align-items-center h-100 w-100'>
                        <div className='me-3 d-flex align-items-center'>
                            <button className='me-2 d-flex align-items-center btn btn-primary' onClick={this.undo} disabled={this.state.treeOrg.TreeOrg.stack_undo.length === 0}>
                                <span className="material-icons">
                                    undo
                                </span>
                            </button>
                            <button className='d-flex align-items-center btn btn-primary' onClick={this.redo} disabled={this.state.treeOrg.TreeOrg.stack_redo.length === 0}>
                                <span className="material-icons">
                                    redo
                                </span>
                            </button>

                        </div>
                        <div className='d-flex align-items-center'>
                            <input type='number' value={this.state.employee_id || ''} onChange={this.handleChange} className='form-control' name='employee_id' placeholder='Employee ID' />
                            <input type='number' value={this.state.new_supervisor_id || ''} onChange={this.handleChange} className='form-control mx-2' name='new_supervisor_id' placeholder='New Supervisor ID' />
                            <button className='btn btn-primary' onClick={this.move}>
                                Move
                            </button>
                        </div>
                    </div>
                </div>
                <div id="tree_employee_org" style={{ width: "100%", height: '100%' }}>
                    <svg></svg>
                </div>
            </div >

        )
    }
}