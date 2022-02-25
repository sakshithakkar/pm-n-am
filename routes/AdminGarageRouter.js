const express = require('express');
const router = express.Router();
const { loginValidation, signupValidation} = require('../utils/validation');


const {listGarages, SearchGarageById, UpdateGarageById, GetGarageById, DeleteGarageById, ListGarageRequests, AcceptGarageRequest, DeleteGarageRequest} = require('../controller/AdminGarageController');

const { 
    loginData,
     logout
} = require('../controller/LoginSignupController.js');
const { registrationOfAdmin } = require('../controller/adminController');


router.route('/admin/manageGarage/listGarage').get(listGarages);

router.route('/admin/manageGarage/garageId').post(SearchGarageById);

router.route('/admin/manageGarage/:garageId').get(GetGarageById);

router.route('/admin/manageGarage/:garageId/updateDetail').post(UpdateGarageById);

router.route('/admin/manageGarage/:garageId/updateDetail').get(GetGarageById);

router.route('/admin/manageGarage/:garageId/deleteDetail').get(DeleteGarageById);

router.route('/admin/garageRegisterationRequest').get(ListGarageRequests);

router.route('/admin/garageRegisterationRequest/accept/:userId').get(AcceptGarageRequest);

router.route('/admin/garageRegisterationRequest/decline/:userId').get(DeleteGarageRequest);

// router.route('/login').post(loginData);                                                               


router.route('/logout').get(logout);                                                                 
// router.route('/admin/register').post(registrationOfAdmin); 
 
router.post('/login', loginValidation, loginData)
router.post('/admin/register', signupValidation , registrationOfAdmin)

module.exports = router;
