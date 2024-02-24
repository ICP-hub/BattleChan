import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AllPostsData { 'status' : string, 'data' : Array<Post> }
export interface Post {
  'id' : bigint,
  'title' : string,
  'updated_at' : bigint,
  'content' : string,
  'image_url' : string,
  'created_at' : bigint,
  'author' : string,
}
export interface _SERVICE {
  'create_post' : ActorMethod<[string, string, string, string], undefined>,
  'get_posts' : ActorMethod<[], AllPostsData>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
