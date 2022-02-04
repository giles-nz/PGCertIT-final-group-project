const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

// Retrieve all upvote by comment id
async function retrieveUpvote(commentId) {
    const db = await dbPromise;

    const upvote = await db.all(SQL`
        select isvoted from votes
        where commentId = ${commentId}
        and isvoted = 0`);

    return upvote.length;
}

// Retrieve all downvote by comment id
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

async function deleteVote(commentId, userId) {
    const db = await dbPromise;

    await db.run(SQL`
    delete from votes
    WHERE commentId = ${commentId} AND userId = ${userId}`);
}

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