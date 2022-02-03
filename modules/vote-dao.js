const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Retrieve all likes by comment id
async function retrieveUpvote(commentId) {
    const db = await dbPromise;

    const upvote = await db.all(SQL`
        select isvoted from votes
        where commentId = ${commentId}
        and isvoted = 0`);

    return upvote.length;
}

// Retrieve all dislikes by comment id
async function retrieveDownvote(commentId) {
    const db = await dbPromise;

    const downvote = await db.all(SQL`
        select isvoted from votes
        where commentId = ${commentId}
        and isvoted = 1`);

    return downvote.length;
}


async function upvote(commentId, userId) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into votes (commentId, userId, isvoted) values
            (${commentId}, ${userId}, 0)`);
}

async function downvote(commentId, userId) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into votes (commentId, userId, isvoted) values
            (${commentId}, ${userId}, 1)`);
}

// Unovte (delete vote) in database by comment id, user id
async function deleteVote(commentId, userId) {
    const db = await dbPromise;

    await db.run(SQL`
    delete from votes
    WHERE commentId = ${commentId} AND userId = ${userId}`);
}

// // Delete all votes associated with a comment by comment id
// // This is called when a comment is deleted, thus delete all votes as well
// async function deleteAllVotes(commentID) {
//     const db = await dbPromise;

//     await db.run(SQL`
//         delete from VOTE
//         where commentID = ${commentID}`);
// }

// // Retrive a single vote by comment id and user id

async function retreiveAVote(commentId, userId) {
    const db = await dbPromise;

    const vote = await db.get(SQL`
        select * from votes
        where commentId = ${commentId}
        and userId = ${userId}`);

    return vote;
}

async function retreiveAUpVote(commentId, userId) {
    const db = await dbPromise;

    const vote = await db.get(SQL`
        select * from votes
        where commentId = ${commentId}
        and userId = ${userId} and isvoted = 0`);

    return vote;
}

async function retreiveADownVote(commentId, userId) {
    const db = await dbPromise;

    const vote = await db.get(SQL`
        select * from votes
        where commentId = ${commentId}
        and userId = ${userId} and isvoted = 1`);

    return vote;
}

// Export comment DAO functions
module.exports = {
    retrieveUpvote,
    retrieveDownvote,
    upvote,
    downvote,
    deleteVote,
    retreiveAVote,
    retreiveAUpVote,
    retreiveADownVote
};