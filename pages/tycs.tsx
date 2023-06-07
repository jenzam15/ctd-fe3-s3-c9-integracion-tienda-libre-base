import { GetStaticProps, NextPage } from "next";
import React from "react";
import { TyC, TyCsAPIResponse } from "../types";
import styles from "../styles/TYC.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { TEXTS_BY_LANGUAGE, defaultLocale, locales } from "../locale/constants";

// Por ahora estamos utilizando data mockeada, pero
// debemos reemplazar esto por información proveniente de la
// API

interface tycsProps {
  data: TyCsAPIResponse
}


const TerminosYCondiciones: NextPage<tycsProps > = ({data}) => {
  
const {locale} = useRouter();

const {MAIN} =
    TEXTS_BY_LANGUAGE[
      (locale || defaultLocale) as keyof typeof TEXTS_BY_LANGUAGE
    ];
  
  if (!data) return null;

  const { version, tycs } = data;

  const renderTyc: (tyc: TyC) => JSX.Element = ({ id, description, title }) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  return (
    <div className={styles.tycContainer}>
      <Head>
        <title>Tienda Libre - Términos y Condiciones</title>
        <meta
          name="description"
          content="términos y condiciones de Tienda Libre"
        />
      </Head>
      <h2>{MAIN.TYCS}</h2>
      <p>Versión: {version}</p>
      {tycs.map(renderTyc)}
    </div>
  );
};

export const getStaticProps : GetStaticProps = async ({locale}) => {

  const baseURL = "http://localhost:3000/"
 
  const response = await fetch(`${baseURL}/api/tycs/${locale}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 86400 //24 horas
  };
};

export default TerminosYCondiciones;
