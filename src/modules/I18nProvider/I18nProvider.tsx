import React, { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../../translations/en.json';
import es from '../../translations/es.json';

const translations: Record<string, Record<string, string>> = {
  en,
  es,
};

export const I18nProvider = ({ children }: PropsWithChildren<unknown>) => {
  const locale = 'en';

  return (
    <IntlProvider locale={locale} messages={translations[locale]}>
      {children}
    </IntlProvider>
  );
};
