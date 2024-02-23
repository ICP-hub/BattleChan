mod features;
mod shared;
mod candid;

use crate::features::posts::post_model::AllPostsData;
use crate::features::posts::post_service;

use ic_cdk_macros::*;

#[query]
fn get_posts() ->AllPostsData{
    let get_all_posts: AllPostsData = post_service::get_all_posts();
    println!("{:?}", get_all_posts);
    get_all_posts
}

#[update]
fn create_post(title: String, content: String, image_url: String, author: String) {
    post_service::create_new_post(title, content, image_url, author);
}
