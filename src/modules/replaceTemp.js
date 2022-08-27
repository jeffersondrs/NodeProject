module.exports = (temp, user) => {
    let output = temp.replace(/{%NAME%}/g, user.name);
    output = output.replace(/{%EMAIL%}/g, user.email);
    output = output.replace(/{%ID%}/g, user._id.$oid)
    return output;
  } 