import { type ObjectId } from "mongoose";

export type RecipeResponse = {
  _id: ObjectId;
  title: string;
  ingredients: string[];
  instructions: string[];
  link?: string;
  dateCreated: string;
  dateUpdated?: string;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
  link?: string;
  dateCreated: string;
  dateUpdated?: string;
};

export type PopupMenu = {
  isActive: boolean;
  menuType: string;
  handler?: (newValue: string) => void;
};

export type UserSettings = {
  alwaysRememberPassword: boolean;
  useDarkTheme: boolean;
  displayLanguage: string;
  alwaysMinimizeNavbar: boolean;
};

