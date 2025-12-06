const express = require('express');
const router = express.Router();

const {handleGetAllUsers, 
    handleGetUserbyId,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
} = require('../controllers/user');

// router.get("/", async(req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//         <ul>
//             ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//         </ul>
//         `;
//     res.send(html);
// });


//REST API

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);


router
    .route("/:id")
    .get(handleGetUserbyId)
    .post(handleCreateNewUser)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;