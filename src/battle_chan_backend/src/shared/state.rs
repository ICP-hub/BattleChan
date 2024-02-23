use std::{sync::Mutex, collections::HashMap};
use crate::features::posts::post_model::Post;
use once_cell::sync::Lazy; // Import the Lazy type
use ic_cdk::api;

// Initialize `POSTS` using `Lazy` for thread-safe, lazy initialization.
// This replaces the direct initialization with `HashMap::new()`.
static POSTS: Lazy<Mutex<HashMap<u64, Post>>> = Lazy::new(|| Mutex::new(HashMap::new()));
static NEXT_ID: Lazy<Mutex<u64>> = Lazy::new(|| Mutex::new(1));

pub fn get_posts() -> Vec<Post> {
    let posts = POSTS.lock().unwrap();
    posts.values().cloned().collect()
}

pub fn add_post(post: Post) {
    let mut posts = POSTS.lock().unwrap();
    posts.insert(post.id, post);
}

pub fn generate_new_id() -> u64 {
    let mut next_id = NEXT_ID.lock().unwrap();
    let id = *next_id;
    *next_id += 1;
    id
}

pub fn current_timestamp() -> u64 {
    api::time() / 1_000_000_000 // Convert nanoseconds to seconds
}