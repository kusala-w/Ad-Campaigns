const express = require('express');
const cors = require('cors');
const helper = require('../../helpers/business-helper');
const router = express.Router();

// Get all businesses
router.get('/', cors(), (req, res) => {
    const businessData = helper.getAllBusinesses();

    if(businessData.errorCode != null) {
        // An error is available to be sent back to the client
        res.status(businessData.errorCode).send(businessData.errorMessage);
        return;
    }
    
    res.json(businessData);   
});

// Get businesss by id
router.get('/:id', cors(), (req, res) => {
    const matchingBusiness = helper.getBusinessById(req.params.id);
    
    if(matchingBusiness.errorCode != null) {
        // An error is available to be sent back to the client
        res.status(matchingBusiness.errorCode).send(matchingBusiness.errorMessage);
        return;
    }

    res.json(matchingBusiness);
});


module.exports = router;