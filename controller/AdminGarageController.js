const connection = require('../config/db.js');


// @desc      List Details of All Garages
// @route     GET /admin/manageGarage/listGarage
// @access    private
const listGarages = async (req,res) => {
    let sql = `select * from tblgarage`;
    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json({ data })
    })
}

// @desc      Search for a particular garage id from form
// @route     POST /admin/manageGarage/garageId
// @access    private
const SearchGarageById = (req,res) => {
    const garageId = req.body.garageId;

    let sql = `select * from tblgarage where garageId = ${garageId}`;
    connection.query(sql, function(err, data){
        if(err) throw err;
        if(data.length){
            res.status(200).json({message: "Garage Found", data})
        }
        else{
            res.json({message: "Could not find the garage. Please enter another id"})
        }
    })
}

// @desc      Update particular garage id from form
// @route     POST /admin/manageGarage/:garageId/updateDetail
// @access    private
const UpdateGarageById = (req,res) => {
    const garageId = req.params.garageId
    const garageName = req.body.garageName
    const garageOwnerName = req.body.garageOwnerName
    const garageAddress = req.body.garageAddress
    const garagePhoneNo = req.body.garagePhoneNo
    const garageEmail = req.body.garageEmail
    const garagePassword = req.body.garagePassword

    let sql = "update tblgarage set garageName = ' "+garageName+" ', garageOwnerName = ' "+garageOwnerName+" ', garageAddress = ' "+garageAddress+" ', garagePhoneNo = ' "+garagePhoneNo+" ', garageEmail = ' "+garageEmail+" ', garagePassword=  ' "+garagePassword+" ' where garageId = ' "+garageId+" ' ";
    connection.query(sql, function(err,data){
        if(err) throw err;
        res.json({data})
    })
}



// @desc      Get particular garage id details
// @route     GET /admin/manageGarage/:garageId
// @access    private

const GetGarageById = (req,res) => {
    const garageId = req.params.garageId

    let sql = `select * from tblgarage where garageId = ${garageId}`;
    connection.query(sql, function(err, data){
        if(err) throw err;
        if(data.length){
            res.status(200).json({message: "Garage Found", data})
        }
        else{
            res.json({message: "Could not find the garage. Please enter another id"})
        }
    })
}

// @desc      Delete particular garage
// @route     GET /admin/manageGarage/:garageId/deleteDetail
// @access    private

const DeleteGarageById = (req,res) => {
    const garageId = req.params.garageId

    let sql = `delete from tblgarage where garageId = ${garageId}`;
    connection.query(sql, function(err,data){
        if(err) throw err;
        res.json({message: "garage deleted"})
    })
}



// @desc      Get garage requests
// @route     GET /admin/garageRegisterationRequest
// @access    private
const ListGarageRequests = (req,res) => {
    let sql = `select * from tblusers where garageStatus='Pending'`;
    connection.query(sql, function(err,data){
        if(err) throw err;
        res.json({message: "List of garages", data})
    })

}


// @desc      Delete garage requests
// @route     GET /admin/garageRegisterationRequest/decline/:userId
// @access    private
const DeleteGarageRequest = (req,res) => {
    const userId = req.params.userId

    let sql = `delete from tblusers where userId = ${userId}`;
    connection.query(sql, function(err,data){
        if(err) throw err;
        res.json({message: "garage registration request declined"})
    })
}

// @desc      Accept garage requests
// @route     GET /admin/garageRegisterationRequest/accept/:userId
// @access    private

const AcceptGarageRequest = (req,res) => {
    const userId = req.params.userId

    let sql = `update tblusers set garageStatus='Accept' where userId= ${userId}`;
    connection.query(sql, function(err, data){
        if(err) throw err;
        res.json({message: 'garage registration request accepted'})
    })
}

module.exports = {listGarages, SearchGarageById, UpdateGarageById, GetGarageById, DeleteGarageById, ListGarageRequests, AcceptGarageRequest, DeleteGarageRequest}