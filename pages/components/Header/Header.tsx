import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Header.module.css";
import { useRouter } from "next/router";
import {
  TEXTS_BY_LANGUAGE,
  defaultLocale,
  localeNames,
  locales,
} from "../../../locale/constants";

const Header: FC = () => {
  const { locale, asPath } = useRouter();

  const { HEADER } =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <figure>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </figure>
          <div className={styles.appName}>
            <p>Tienda</p>
            <p>Libre</p>
          </div>
        </div>
        <div className={styles.navbar}>
          <Link href="./">{HEADER.PRODUCTS}</Link>
          <Link href="./tycs">{HEADER.TYCS}</Link>
        </div>
      </div>
      <div className={styles.localeSwith}>
        <Link href={asPath} locale={locales.ES_ES}>
          <a>
            <Image
              src="/español.png"
              alt="Espanish"
              width={20}
              height={20}
              layout="fixed"
            />
            {localeNames[locales.ES_ES as keyof typeof localeNames]}
          </a>
        </Link>
        <Link href={asPath} locale={locales.PT_BR}>
          <a>
            <Image
              src="/portugues.png"
              alt="Portugues"
              width={20}
              height={20}
              layout="fixed"
            />
            {localeNames[locales.PT_BR as keyof typeof localeNames]}
          </a>
        </Link>
        <Link href={asPath} locale={locales.EN_US}>
          <a>
            <Image
              src="/english.png"
              alt="English"
              width={20}
              height={20}
              layout="fixed"
            />
            {localeNames[locales.EN_US as keyof typeof localeNames]}
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
