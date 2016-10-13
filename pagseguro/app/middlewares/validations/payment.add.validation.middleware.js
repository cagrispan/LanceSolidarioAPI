function verifyItemField(item, errorMessages){
    if(!item.id){
        errorMessages.push('Item field id missing');
    }
    if(!item.amount){
        errorMessages.push('Item field amount missing');
    }
    if(!item.description){
        errorMessages.push('Item field description missing');
    }
    if(!item.quantity){
        errorMessages.push('Item field quantity missing');
    }
}

function hasRequiredPaymentAddFields(req, res, next) {
    var errorMessages = [];
    if (req.body) {
        if (!req.body.redirectUrl) {
            errorMessages.push('Missing field redirectUrl');
        }
        if (!req.body.reviewUrl) {
            errorMessages.push('Missing field reviewUrl');
        }
        if (!req.body.reference) {
            errorMessages.push('Missing field reference');
        }
        if(!req.body.currency){
            errorMessages.push('Missing field currency');
        }
        if (!req.body.items) {
            errorMessages.push('Missing field items as array with at least one item field with id, amount, description and quantity');
        }else{
            if(req.body.items.length == 0){
                errorMessages.push('Missing at least one item field with id, amount, description and quantity');
            }else{
                for(var i=0; i<req.body.items.length; i++){
                    verifyItemField(req.body.items[i], errorMessages)
                }
            }
        }
    } else {
        errorMessages.push('Required fields needed -> redirectUrl, reviewUrl, reference, currency, items (with at least one item field with id, amount, description and quantity)');
    }

    if (errorMessages.length > 0) {
        res.send(400, {errors: errorMessages});
    } else {
        next();
    }
}

exports.hasRequiredPaymentAddFields = hasRequiredPaymentAddFields;