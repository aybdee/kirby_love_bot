import { Context, Keyboard } from "grammy";
export const entryKeyboard = new Keyboard()
  .text("See Kirby Pictures")
  .row()
  .text("See More Kirby Pictures")
  .row()
  .text("Show love to each other")
  .row()
  .resized();

export const kirbyOffering = new Keyboard()
  .text("Your love")
  .row()
  .text("Our emotions")
  .row()
  .text("we can paint kirby")
  .row()
  .resized();
