//todo! come up with better name
import { type Context as BaseContext } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";

export type MyContext = BaseContext & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
