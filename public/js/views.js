/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export { postView, homeContent, listThreePosts, listRecentPosts, listPopularPosts };

function applyTemplate(targetid, templateid, data) {
    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    );
    target.innerHTML = template(data);
}

function postView(targetid, posts) {
    applyTemplate(targetid, "single-post", {"posts": posts});
}

function homeContent(targetid) {
    let target = document.getElementById(targetid);
    target.innerHTML = "<h2>Featured Posts</h2><div id='threePosts'></div><h3>Recent Posts</h2><div id='recentPosts'></div><h2>Popular Posts</h2><div id='popularPosts'></div>";
}

function listThreePosts(targetid, posts) {
    let rand = Math.floor(Math.random() * (posts.length - 3)) + 1;
    posts = posts.slice(rand, rand + 3);

    applyTemplate(targetid, "three-post-list", {"posts": posts});
}

function listRecentPosts(targetid, posts) {
    let tenRecent = [];
    for(let i = 0, len = posts.length; i < len; ++i)
        tenRecent.push(posts[i]);

    tenRecent.sort(function(t1, t2) {
        return new Date(t2.published_at) - new Date(t1.published_at);
    });

    tenRecent.length = 10;

    applyTemplate(targetid, "ten-list", {"posts": tenRecent});
}

function listPopularPosts(targetid, posts) {
    let topTen = [];
    for(let i = 0, len = posts.length; i < len; ++i)
        topTen.push(posts[i]);

    topTen.sort(function(t1, t2) {
        return t2.p_likes - t1.p_likes;
    });

    topTen.length = 10;

    applyTemplate(targetid, "ten-list", {"posts": topTen});
}

