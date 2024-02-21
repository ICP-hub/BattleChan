#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::query]
pub fn demo() -> String {
    format!("Hello from the Internet Computer!")
}
