const getPercentCategory = (data) => {
  let categories = {
    Food: null,
    Entertainment: null,
    Health: null,
    Other: null,
    Auto: null,
    Travel: null,
    Home: null,
  };

  let total = 0;
  for (const dataObj of data) {
    let category = dataObj.category.toLowerCase();
    let amount = parseInt(dataObj.amount);

    category = category.charAt(0).toUpperCase() + category.slice(1);
    total += amount;

    if (category in categories) {
      categories[category] += amount;
    }
  }
  // calculate to %
  Object.keys(categories).map((key) => {
    categories[key] = Math.round((categories[key] / total) * 100);
    if (categories[key] === 0) return (categories[key] = null);
    return categories;
  });
  return categories;
};

export default getPercentCategory;
