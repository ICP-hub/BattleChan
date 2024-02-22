// Import the Post model from the relative path where post_model.rs is located.
use super::post_model::Post;
// Import the state module from the shared crate path to access shared state management functions.
use crate::shared::state;

// Function to retrieve all posts from the application's state.
pub fn get_all_posts() -> Vec<Post> {
    // Delegate the call to the state module's get_posts function.
    state::get_posts()
}

// Function to create a new post and add it to the application's state.
pub fn create_new_post(title: String, content: String, image_url: String, author: String, created_at: u64, updated_at: u64) {
    // Create a new instance of Post with provided and generated fields.
    let new_post = Post {
        id: state::generate_new_id(), // Generate a unique ID for the new post.
        title,                        // Use the title passed to the function.
        image_url,                    // Use the image URL passed to the function.
        content,                      // Use the content passed to the function.
        author,                       // Use the author passed to the function.
        created_at,                   // Use the creation timestamp passed to the function.
        updated_at,                   // Use the update timestamp passed to the function.
    };
    // Add the newly created post to the application's state.
    state::add_post(new_post);
}