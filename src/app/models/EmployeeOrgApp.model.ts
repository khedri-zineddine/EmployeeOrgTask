import { Employee, IEmployeeOrgApp, StackState } from '../interfaces'

export class EmployeeOrgApp implements IEmployeeOrgApp {
    public ceo: Employee;
    // stack to manage undo actions
    public stack_undo: StackState[];
    // stack to manage redo actions
    public stack_redo: StackState[];
    constructor(ceo: Employee) {
        this.ceo = ceo
        this.stack_undo = []
        this.stack_redo = []
    }
    move(employeeID: number, supervisorID: number) {
        // execute move action when employee ID is different from new supervisor ID
        if(employeeID!=supervisorID){
            const [employee, empParent] = this.getEpmloyee(employeeID, this.ceo) ?? [null, null]
            const [supervisor] = this.getEpmloyee(supervisorID, this.ceo) ?? [null, null]
            // execute move action when the new supervisor is different from old supervisor
            if ((employee && supervisor && empParent) && (supervisor.uniqueId!=empParent.uniqueId)) { // we add empParent because the ceo cann't be subordinate
                //conserve prevoious state
                const prevState: StackState = {
                    employeeId: employeeID,
                    oldSupervisor: empParent.uniqueId,
                    oldSubordinates: employee.subordinates.map((emp: Employee) => emp.uniqueId)
                }
                //add the previous state to the stacke
                this.stack_undo.push(prevState)

                // Ignore redo in new action
                this.stack_redo=[]
                //add subordinates of the employee to the supervisor of this current employee
                this.changeSupervisor(employee, empParent)
                //remove employee's old subordinates
                employee.subordinates = []
                //add the employee to new supervisor
                supervisor.subordinates.push(employee)
            }
        }
    }
    undo() {
        const oldState: StackState = this.stack_undo.pop()!
        if (oldState) {
            this.changeState(oldState, 'undo')
        }
    }
    redo() {
        const oldState: StackState = this.stack_redo.pop()!
        if (oldState) {
            this.changeState(oldState, 'redo')
        }
    }
    private changeState(oldState: StackState, actionType: string) {
        const [employee, empParent] = this.getEpmloyee(oldState.employeeId, this.ceo)
        const [oldSupervisor] = this.getEpmloyee(oldState.oldSupervisor, this.ceo)
        if (employee && empParent && oldSupervisor) {
            const currentState: StackState = {
                employeeId: employee.uniqueId,
                oldSupervisor: empParent.uniqueId,
                oldSubordinates: employee.subordinates.map((emp: Employee) => emp.uniqueId)
            }
            if (actionType === 'undo') {
                // push the actual state into redo stack (we need it to perform redo action later)
                this.stack_redo.push(currentState)
            } else if (actionType === 'redo') {
                // push the actual state into undo stack (we need it to perform undo action later)
                this.stack_undo.push(currentState)
            }
            // restore old tree state
            this.changeSupervisor(employee, empParent)
            // restore old subordinates
            let employeeSubordinates: Employee[] = []
            let supervisorSubordinates: Employee[] = []
            oldSupervisor.subordinates.forEach((emp: Employee) => {
                if (this.employeeExists(emp.uniqueId, oldState.oldSubordinates))
                    employeeSubordinates.push(emp)
                else
                    supervisorSubordinates.push(emp)
            })
            employee.subordinates = employeeSubordinates
            // remove old employee subordinates from old supervisor
            oldSupervisor.subordinates = supervisorSubordinates
            // restore old supervisor
            oldSupervisor.subordinates.push(employee)
        }
    }

    // getEmployee recursive function to browse tree and get the specific employee
    private getEpmloyee(employeeID: number, employeeRoot: Employee, employeeParent: Employee = null!): any {
        if (employeeRoot.uniqueId === employeeID) {
            return [employeeRoot, employeeParent]
        }
        const listEmployees = employeeRoot.subordinates
        for (const employee of listEmployees) {
            const [emp, empParent] = this.getEpmloyee(employeeID, employee, employeeRoot)
            if (emp && empParent)
                return [emp, empParent]
        }
        return [null, null]
    }

    // Change the supervisor of the subordinates of employee
    private changeSupervisor(employee: Employee, newSupervisor: Employee) {
        // remove employee from the supervisor subordinates
        newSupervisor.subordinates = newSupervisor.subordinates.filter((emp) => { return emp.uniqueId !== employee.uniqueId })
        const subordinates = employee.subordinates
        // add subordinates of employee to subordinates of supervisor
        subordinates.forEach(empolyee => {
            newSupervisor.subordinates.push(empolyee)
        })
    }
    // Check if employee exists in a list of employees
    private employeeExists(employeeID: number, listEmployee: number[]) {
        return listEmployee.find(elemID => { return elemID === employeeID })
    }
}