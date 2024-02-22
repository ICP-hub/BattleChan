use std::{sync::Mutex, collections::HashMap};
use crate::features::posts::post_model::Post;
use once_cell::sync::Lazy; // Import the Lazy type

// Initialize `POSTS` using `Lazy` for thread-safe, lazy initialization.
// This replaces the direct initialization with `HashMap::new()`.
static POSTS: Lazy<Mutex<HashMap<u64, Post>>> = Lazy::new(|| Mutex::new(HashMap::new()));

// Use an atomic type for thread-safe incrementing.
// This is necessary for safe concurrent access and modification.
use std::sync::atomic::{AtomicU64, Ordering};
static NEXT_ID: AtomicU64 = AtomicU64::new(1);

pub fn get_posts() -> Vec<Post> {
    // Access the global state safely. Lock the mutex before accessing the HashMap.
    let posts = POSTS.lock().unwrap();
    posts.values().cloned().collect()
}

pub fn add_post(post: Post) {
    // Lock the mutex to safely add a new post to the HashMap.
    let mut posts = POSTS.lock().unwrap();
    posts.insert(post.id, post);
}

pub fn generate_new_id() -> u64 {
    // Increment `NEXT_ID` safely using atomic operations.
    NEXT_ID.fetch_add(1, Ordering::SeqCst)
}
