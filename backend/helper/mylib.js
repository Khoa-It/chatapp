function handelResponse (param, successMessage, errorMessage){
    return {
        data: param.data,
        mes: param.data ? successMessage : errorMessage,
    }
}

function idIncludes(db_id = "", id = 2){
    return db_id.startsWith(`${id}#`) || db_id.endsWith(`#${id}`);
}

module.exports = {handelResponse, idIncludes};