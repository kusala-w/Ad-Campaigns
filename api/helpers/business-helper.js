const fs = require('fs');
const _ = require('lodash/core');
const config = require('../config/default.json');

let businessData = null;

const getAllBusinesses = () => {
    // Load the data from data source
    loadBusinessData();

    // If the data couldn't be loaded, return null
    if(businessData == null) {        
        return { errorCode: 500, errorMessage: 'The required data could not be read from the data source' } ;
    }

    // Calculate the campaign count and average budget while filtering the required properties
    const response = businessData.map( ({id, name, category, campaigns}) => ({
        id, 
        name,
        category,
        campaignCount: campaigns.length,
        averageBudget: campaigns.length > 0 ? campaigns.reduce( (totalBudget, currentCampaign) => totalBudget + currentCampaign.budget, 0) / campaigns.length : 0
    }));

    return response;
}

const getBusinessById = (id) => {
    // Load the data from data source
    loadBusinessData();

    // If the data couldn't be loaded, return null
    if(businessData == null) {
        return { errorCode: 500, errorMessage: 'The required data could not be read from the data source' } ;
    }

    const matchingBusiness = _.find(businessData, (business) => {
        return business.id === parseInt(id);
    });

    // Return a 400 if there are no matching businesses
    if(matchingBusiness == null) {
        return { errorCode: 400, errorMessage: 'No matching businesss found' } ;
    }
    
    return _.pick(matchingBusiness, ['id', 'name', 'campaigns', 'location']);
}

const loadBusinessData = () => {
    // Only load the data if it's not already available
    if(businessData == null) {
        const rawBusinessData = fs.readFileSync(`./${config.data.dataFolder}/${config.data.businessData}`);
        businessData = JSON.parse(rawBusinessData);
    }
};

module.exports = { getAllBusinesses, getBusinessById };