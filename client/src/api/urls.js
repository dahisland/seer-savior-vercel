export const baseApiURL = "https://seer-savior.vercel.app/api";

// -----------------------------------------
// IS CONNECTED (token control)
// -----------------------------------------
export const isConnectedEndpoint = "/jwtid";

// -----------------------------------------
// AUTH
// -----------------------------------------
export const loginEndpoint = "/user/login";
export const signupEndpoint = "/user/signup";
export const logoutEndpoint = "/user/logout";

// -----------------------------------------
// USER
// -----------------------------------------
export const userEndpoint = "/user/";
export const addUserScoreEndpoint = userEndpoint + "add-level-score/"; // + :id (user)
export const updateUserScoreEndpoint = userEndpoint + "update-level-score/"; // + :id (user)
export const updateUserEmailEndpoint = userEndpoint + "update-email/"; // + :id (user)
export const updateUserAvatarEndpoint = userEndpoint + "update-picture/"; // + :id (user)
export const updateUserLoginsEndpoint = userEndpoint + "update-logins/"; // + :id (user)
export const uploadUserAvatarEndpoint = userEndpoint + "upload-picture/"; // + :id (user)
export const deleteUserAvatarsEndpoint = userEndpoint + "delete-pictures/"; // + :id (user)

// Create new user : userEndpoint
// Get one user data : userEndpoint + :id (user)
// Delete one user : userEndpoint + :id (user)

// -----------------------------------------
// RANKING
// -----------------------------------------
export const rankingEndpoint = "/ranking";
export const filterRankingByLevelEndpoint = rankingEndpoint + "/filter-ranking";

// Create new ranking : rankingEndpoint
// Get one ranking data : rankingEndpoint + :id (ranking)
// Update one ranking data : rankingEndpoint + :id (ranking)
// Delete one ranking : rankingEndpoint + :id (ranking)

// -----------------------------------------
// AVATAR
// -----------------------------------------
export const avatarEndpoint = "/avatar/";
export const filterAvatarsByLevelEndpoint = avatarEndpoint + "filter-avatars";

// Create new avatar : avatarEndpoint
// Get one avatar data : avatarEndpoint + :id (avatar)
// Update one avatar data : avatarEndpoint + :id (avatar)
// Delete one avatar : avatarEndpoint + :id (avatar)
