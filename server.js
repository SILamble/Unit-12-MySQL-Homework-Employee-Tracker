const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "twubc01sql", //insert your own password here if yo created one
    database: "employeesDB"
});


connection.connect(function (err) {
    if (err) {
        throw err
    }
    console.log("connected by this id: " + connection.threadId);
    chooseTable()
    // .then(connection.end());
});

function chooseTable() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which table do you want to view?",
            name: "tableView",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        }
    ]).then(answers => {
        console.log(answers.tableView)
        //based on answer, view specific table
        switch (answers.tableView) {
            case "Departments":
                viewTable("employeesdb.departments");
                break;
            case "Roles":
                viewTable("employeesdb.roles");
                break;
            case "Employees":
                viewTable("employeesdb.employees");
                break;
            default:
        }
    })
};

function viewTable(table) {
    connection.query("SELECT * FROM ??", [table], function (err, res) {
        if (err) {
            throw new Error(err)
        }
        console.table(res);
        console.log("------------------------------------------------------------------------");
        editTable(table);
    })
};

function editTable(table) {
    inquirer.prompt([
        {
            type: "list",
            message: "Do you want to edit the table?",
            name: "editTable",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(answers => {
        switch (answers.editTable) {
            case "Yes":
                amendTable(table);
                break;
            case "No":
                viewOtherTable();
                break;
            default:
        }
    })
};

function amendTable(table) {
    console.log("------------------------------------------------------------------------")
    if (table === "employeesdb.departments") {
        amendDepartments()
    };
    if (table === "employeesdb.roles") {
        amendRoles()
    } 
    if (table === "employeesdb.employees"){
        amendEmployees();
    }

};

function viewOtherTable() {
    inquirer.prompt([
        {
            type: "list",
            message: "Do you want view another table?",
            name: "editTable",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(answers => {
        switch (answers.editTable) {
            case "Yes":
                chooseTable();
                break;
            case "No":
                console.log("Goodbye")
                connection.end();
                break;
            default:
        }
    })
};

function amendDepartments() {
    inquirer.prompt([
        {
            type: "list",
            message: "Do you want to add another department",
            name: "addDept",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(answers => {
        switch (answers.addDept) {
            case "Yes":
                addDept();
                break;
            case "No":
                viewOtherTable();
                break;
            default:
        }
    })
};

function addDept() {
    inquirer.prompt([
        {
            type: "Input",
            name: "DeptName",
            message: "Enter new departments name: "
        }
    ]).then(answers => {
        const deptName = answers.DeptName;
        connection.query("INSERT INTO employeesdb.departments SET ?", {
            department: deptName
        }, function (err, res) {
            if (err) {
                throw err
            }
            viewOtherTable();
        })
    })
};

function amendEmployees() {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            name: "employeeAmends",
            choices: [
                "Add Employee",
                "Nothing"
            ]
        }
    ]).then(answers => {
        switch (answers.employeeAmends) {
            case "Add Employee":
                addEmployee();
                break;
            case "Nothing":
                viewOtherTable();
                break;
            default:
        }
    })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "Input",
            name: "empFirstName",
            message: "Enter new employees first name: "
        },
        {
            type: "Input",
            name: "empSecondName",
            message: "Enter new employees last name: "
        },
        {
            type: "Number",
            name: "empRoleId",
            message: "Enter new employees role ID: "
        },
        {
            type: "Number",
            name: "managerId",
            message: "Enter new employees managers ID: "
        },

    ]).then(answers => {
        const firstName = answers.empFirstName;
        const lastName = answers.empSecondName;
        const roleiD = answers.empRoleId;
        const manageriD = answers.managerId;
        connection.query("INSERT INTO employeesdb.employees SET ?", {
            first_name: firstName,
            last_name: lastName,
            role_id: roleiD,
            manager_id: manageriD
        }, function (err, res) {
            if (err) {
                throw err
            }
            viewOtherTable();
        })
    })
};

function amendRoles(){
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to do?",
            name: "roleAmends",
            choices: [
                "Add role",
                "Update Role Salary",
                "Nothing"
            ]
        }
    ]).then(answers => {
        switch (answers.roleAmends) {
            case "Add role":
                addRole();
                break;
            case "Update Role Salary":
                updateRoleSalary();
                break;
            case "Nothing":
                viewOtherTable();
                break;
            default:
        }
    })
};

function updateRoleSalary(){
    connection.query("SELECT * FROM employeesdb.roles", function (err, res) {
        if (err) {
            throw new Error(err)
        }
        console.table(res)}),
    inquirer.prompt([
        {
            type: "Number",
            name: "roleId",
            message: "Enter role ID you want to update: "
        },
        {
            type: "Number",
            name: "updatedSalary",
            message: "Enter new salary: "
        }
    ]).then(answers => {
        const roleId = answers.roleId;
        const updatedSalary = answers.updatedSalary;
        connection.query(
            "UPDATE employeesdb.roles SET ? WHERE ?", [
            {
                salary: updatedSalary
            },
            {
                role_id: roleId
            }
        ], function (err, res) {
            if (err) {
                throw err
            }
            viewOtherTable();
        })
    })
};

function addRole(){
    inquirer.prompt([
        {
            type: "Input",
            name: "roleName",
            message: "Enter name of new role: "
        },
        {
            type: "Number",
            name: "salary",
            message: "Enter new roles salary: "
        },
        {
            type: "Number",
            name: "deptId",
            message: "Enter new department ID: "
        },

    ]).then(answers => {
        const roleName = answers.roleName;
        const salary = answers.salary;
        const deptId = answers.deptId;
        connection.query("INSERT INTO employeesdb.roles SET ?", {
            role_name: roleName,
            salary: salary,
            department_id: deptId
        }, function (err, res) {
            if (err) {
                throw err
            }
            viewOtherTable();
        })
    })
};