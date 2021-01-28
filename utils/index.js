const sendJSONResponse = (res, message, status, statusCode, data) => {
  res.status(statusCode);
  res.json({
    message,
    status,
    data,
  });
};


const isConditionMet = (dataField, condition, conditionValue) => {
  switch (condition) {
    case 'eq':
      return dataField === conditionValue;
    case 'neq':
      return dataField !== conditionValue;
    case 'gt':
      return dataField > conditionValue;
    case 'gte':
      return dataField >= conditionValue;
    case 'contains':
      if (typeof dataField !== 'string') return false;
      return dataField.includes(conditionValue)
    default:
      return false
  }
}

module.exports = {
  sendJSONResponse,
  isConditionMet
};
