import { createContext } from "react";

import ru from '../locales/ru.json';
import en from '../locales/en.json';
import he from '../locales/he.json';

export const locales = {ru, en, he};

export const LocaleContext = createContext();