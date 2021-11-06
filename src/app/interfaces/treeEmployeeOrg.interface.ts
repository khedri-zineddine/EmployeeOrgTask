import { IEmployeeOrgApp } from "./employeeOrgApp.interface";

export interface TreeEmployeeOrg {
    TreeOrg: IEmployeeOrgApp;
    drawTree(): void;
}