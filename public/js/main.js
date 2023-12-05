/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */

import { postView, homeContent, listThreePosts, listRecentPosts, listPopularPosts } from "./views.js";
import { splitHash } from "./util.js"
import { Model } from "./model.js";
import * as views from "./views.js";

window.addEventListener("modelUpdated", function(e) {

    let data = Model.getPosts();
    let hash = splitHash(window.location.hash);
    if (hash.path === "posts") {
        views.postView("content", {data: data[hash.id - 1]});
    } else {
        views.homeContent("content");
        views.listThreePosts("threePosts", data);
        views.listRecentPosts("recentPosts", data);
        views.listPopularPosts("popularPosts", data);
    }

    bindings();
});

function likeClickHandler() {
    let id = this.dataset.id;
    Model.addLike(id);
}

function bindings() {
    let buttons = document.getElementsByClassName("like");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = likeClickHandler;
    }
}

window.onload = function() {
    Model.updatePosts();
};

window.onhashchange = function() {
    Model.updatePosts();
}

