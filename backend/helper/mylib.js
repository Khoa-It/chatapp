function handelResponse (data, successMessage, errorMessage){
    return {
        data: data,
        mes: data ? successMessage : errorMessage,
    }
}

module.exports = {handelResponse};