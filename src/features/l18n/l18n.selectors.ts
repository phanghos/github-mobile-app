import { RootState } from 'store';

export const localeSelector = (state: RootState) => state.l18n.locale;
