import { Bot, session, type Context as BaseContext, InputFile } from "grammy";
import dotenv from "dotenv";

import { MyContext } from "./logic";

// import { conversations, createConversation } from "@grammyjs/conversations";
import { entryKeyboard, kirbyOffering } from "./ui/customkeyboard";
import { Input } from "telegraf";

dotenv.config();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (process.env.BOT_TOKEN) {
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN);

  // Install the session plugin.
  bot.use(
    session({
      initial() {
        // return empty object for now
        return {};
      },
    })
  );

  // Install the conversations plugin.

  bot.on("callback_query:data", async (ctx, next) => {
    console.log(
      "another callbackQuery happened",
      ctx.callbackQuery.data.length,
      ctx.callbackQuery.data
    );
    return next();
  });

  bot.command("start", async (ctx) =>
    ctx.reply("Welcome to the kirby club. we love kirby", {
      reply_markup: entryKeyboard,
    })
  );

  bot.hears("See Kirby Pictures", async (ctx) => {
    const kirby_index = getRandomInt(1, 22);
    await ctx.replyWithPhoto(new InputFile(`./public/${kirby_index}.jpg`));
    await ctx.reply("never  enough kirby, kirby is cute", {
      reply_markup: entryKeyboard,
    });
  });

  bot.hears("See More Kirby Pictures", async (ctx) => {
    const kirby_index = getRandomInt(1, 22);
    await ctx.replyWithPhoto(new InputFile(`./public/${kirby_index}.jpg`));
    await ctx.reply("moooore kirby mooore kirbyyyyy", {
      reply_markup: entryKeyboard,
    });
  });

  bot.hears("Show love to each other", async (ctx) => {
    await ctx.reply("love is everything", {
      reply_markup: kirbyOffering,
    });
  });

  bot.catch((error) => {
    console.log("bot error", error);
  });

  async function startup() {
    await bot.start({
      onStart(botInfo) {
        console.log(new Date(), "Bot starts as", botInfo.username);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  startup();
} else {
  console.log("BOT_TOKEN not supplied");
}
