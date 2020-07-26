const getTotalCategory = (data) => {
  let categories = {
    Food: 0,
    Entertainment: 0,
    Health: 0,
    Other: 0,
    Auto: 0,
    Travel: 0,
    Home: 0,
  };

  for (const dataObj of data) {
    let category = dataObj.category.toLowerCase();
    category = category.charAt(0).toUpperCase() + category.slice(1);
    let amount = parseInt(dataObj.amount);

    if (category in categories) {
      categories[category] += amount;
    }
  }
  return categories;
};

export default getTotalCategory;
