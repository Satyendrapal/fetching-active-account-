
//controller 
const Employee = require('../../models').Employee;
const constants = require('../../middleware/constants');
const { Op } = require("sequelize");
// Create , Update, getall, getByID, Delete

//Create Employee
const createEmployee = async function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, user, strMessage, data;
    user = req.user;
    body.status = constants.Status.ACTIVE;
    body.createdBy = user?.id;
    body.updatedBy = user?.id;
    [err, data] = await to(Employee.create(body));

    strMessage = "Successfully Created.";

    if (err) return ReE(res, err, 422);
    return ReS(res, {
        success: true,
        message: strMessage,
        data: data
    }, 201);

}
module.export.Employee = createEmployee;

//Update Employee
const updateEmployee = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;
    body.createdBy = user?.id;
    body.updatedBy = user?.id;
    [err, data] = await to(Employee.findOne({
        where: {
            id: body.id,
        }
    }));

    data.set(body);

    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Updated successfully.'
    });
}
module.exports.updateEmployee = updateEmployee

//Delete Employee by id
const deleteEmployee = async function (req, res) {
    let err, user, data, response;
    user = req.user;
    const body = req.body;
    const params = req.params;
    body.updatedBy = user?.id;
    body.status = constants.Status.ARCHIVE;
    [err, data] = await to(Employee.findOne({
        where: {
            id: params.id
        }
    }));

    data.set(body);
    [err, response] = await to(data.save());

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: 'Delete Successfully.'
    });
}
module.exports.deleteEmployee = deleteEmployee

//Get All Employee
const GetAllEmployee = async function (req, res) {
    let err, data;
    [err, data] = await to(Employee.findAll({
        attributes: {exclude: ['createdAt','updatedAt','comments']}
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.Employee = GetAllEmployee;

//Get Employee by id
const getEmployeeByID = async function (req, res) {
    let err, user, data;
    user = req.user;
    const params = req.params;

    [err, data] = await to(Employee.findOne({
        where: {
            id: params.id
        }
    }));

    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        data: data
    });
}
module.exports.getEmployeeByID = getEmployeeByID


const deleteMultipleEmployee = async function (req, res) {
    let err, user, body, response;
    user = req.user;
    body = req.body;
    body.updatedBy = user?.id;
    body.status = constants.Status.ARCHIVE;

    if (!body.Ids || !Array.isArray(body.Ids)) {
        return ReE(res, 'Invalid request. Please provide an array of IDs to delete.');
    }

    [err, response] = await to(Employee
        .update(body, {
        where: {
            id: {
                [Op.in]: body.Ids,
            }
        }
    }));
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {
        success: true,
        message: `Deleted ${response} Employee successfully.`
    });
}
module.exports.deleteMultipleEmployee = deleteMultipleEmployee









