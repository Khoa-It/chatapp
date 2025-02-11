const response = (res, data, statusCode = 200) => {    
    const stat = data != null ? 'success' : 'error';
    return res.status(statusCode).json({
        status: stat,
        data,
    });
}

module.exports = {response};