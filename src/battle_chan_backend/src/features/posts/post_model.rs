use candid::CandidType;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, CandidType, Clone)]
pub struct Post {
    pub id: u64,
    pub title: String,
    pub image_url: String,
    pub content: String,
    pub author: String,
    pub created_at: u64,
    pub updated_at: u64
}