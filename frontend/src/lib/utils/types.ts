import { type ObjectId } from 'mongoose';

export interface RecipeResponse {
  _id: ObjectId;
  title: string;
  ingredients: string[];
  instructions: string[];
  link?: string;
  dateCreated: string;
  dateUpdated?: string;
};

export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  link?: string;
  dateCreated: string;
  dateUpdated?: string;
};

export interface PopupMenu {
  isActive: boolean;
  menuType: string;
  handler?: (newValue: string) => void;
};

export interface UserSettings {
  alwaysRememberPassword: boolean;
  useDarkTheme: boolean;
  displayLanguage: string;
  alwaysMinimizeNavbar: boolean;
};
