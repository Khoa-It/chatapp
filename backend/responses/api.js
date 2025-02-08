const response = (res, param, statusCode = 200) => {
    const {mes, data} = param;
    const stat = data != null ? 'success' : 'error';
    return res.status(statusCode).json({
        status: stat,
        data: data,
        message: mes,
    });
}

module.exports = {response};