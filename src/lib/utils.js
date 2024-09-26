const roles = ['admin', 'manager', 'user']

const expiresIn = (hours) => {
    const currentTime = new Date(); // Get the current date and time
    const futureTime = new Date(currentTime.getTime() + hours * 60 * 60 * 1000); // Add hours in milliseconds
    return futureTime;
}

module.exports = {
    expiresIn,
    roles
}