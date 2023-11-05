require('../config/config');
module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define("Employee", {
        EmployeeID: {
            type: DataTypes.STRING
        },
        FRISTNAME: {
            type: DataTypes.STRING
        },
        LastName: {
            type: DataTypes.STRING
        },
        joiningDate: {
            type: DataTypes.INTEGER
        },
        Status: {
        type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER
        },
        updatedBy: {
            type: DataTypes.INTEGER
        },
    }, { schema: CONFIG.db_schema });

    return Employee;
};
