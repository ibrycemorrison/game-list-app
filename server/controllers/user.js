/**
 * Funtion to add users to the database
 * @param {*} req Request from frontend
 * @param {*} res Response to frontend
 * @returns The appropriate response to the frontend app
 */
export const addUser = (req, res) => {
  // Testing for backend connection
  return res.json("from controller");
};
