import { NextPage } from "next";
import React from "react";
import { TyC, TyCsAPIResponse } from "../types";
import styles from "../styles/TYC.module.css";
import Head from "next/head";

// Por ahora estamos utilizando data mockeada, pero
// debemos reemplazar esto por información proveniente de la
// API

interface tycsProps {
  data: TyCsAPIResponse
}


const TerminosYCondiciones: NextPage<tycsProps > = ({data}) => {
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
      <h2>Terminos y Concidiones</h2>
      <p>Versión: {version}</p>
      {tycs.map(renderTyc)}
    </div>
  );
};

export const getStaticProps = async () => {
 
  const response = await fetch("https://ctd-fe3-s3-c9-integracion-tienda-libre-base-six.vercel.app/api/tycs");
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 86400 //24 horas
  };
};

export default TerminosYCondiciones;
