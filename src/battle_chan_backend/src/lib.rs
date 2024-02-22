mod features;
mod shared;
mod candid;

use crate::features::posts::post_model::Post;
use crate::features::posts::post_service;

use ic_cdk_macros::*;

#[query]
fn get_posts() -> Vec<Post> {
    post_service::get_all_posts()
}

#[update]
fn create_post(title: String, content: String, image_url: String, author: String, created_at: u64, updated_at: u64) {
    post_service::create_new_post(title, content, image_url, author, created_at, updated_at);
}
