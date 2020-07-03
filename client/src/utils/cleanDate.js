const cleanDate = (date) => {
  const editDate = date.split('Z')[0];
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const dateFormat = new Date(editDate).toLocaleString('en-US', options);
  const dateSplit = dateFormat.split('/');
  const updatedDate = dateSplit[2] + '-' + dateSplit[0] + '-' + dateSplit[1];
  return updatedDate;
};

export default cleanDate;
