// This mixin is for general helper functions.
// Please do not define any hooks or computed methods as they will be merged in the component properties.
// Only define methods in the methods property

import date from "date-and-time";

const utils = {
  
  methods: {
    /**
     * Check whether the selected date is valid
     *
     * @param {*} startDate
     * @param {*} endDate
     * @returns
     */
    checkValidDate(startDate, endDate) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      if (endDate > now || !(endDate >= startDate)) {
        return false;
      }
      return true;
    }
  }
};

export default utils;
