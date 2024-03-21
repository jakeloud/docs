import React, { useCallback } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const ecology = {
  title: 'Ecology 🌱',
  description: (
    <>
      JakeLoud offers an efficient and optimized
      platform for running multiple applications on a single server.
      Utilizing the fast web proxy Nginx, it ensures smooth and quick operation,
      reducing energy consumption and lowering your carbon footprint.

      Choose JakeLoud for a sustainable, cost-effective, and efficient experience in running your applications.
    </>
  )
}

function Hero() {
  const {siteConfig} = useDocusaurusContext();

  const canvasRef = useCallback((c) => {
    if (!c) return;
    c.width = 1920
    c.height = 1080
    const x = c.getContext`2d`
    let Z = 0, X = 0, w

    const u=(t)=>{
      t/=1000
      const r=_=>x.lineTo(w/2+(X-21)/Z*w-15,2/Z*w)
      for(let i=w=c.width|=0;i--;r(Z++),r(X--))X=i%40,r(Z=1-t*9%1+i/40)
        x.strokeStyle='#f0f'
        x.fillStyle='#0000'
        x.fillRect(0,0,w,w)
        x.stroke()
        requestAnimationFrame(u)
    }
    u(0)
  })

  return (
    <header className={clsx( styles.heroBanner)}>
      <div className="container">
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.center}>
          <Link
            className={clsx('button button--primary button--lg', styles.button)}
            to="/docs/intro">
            Jakeloud Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title} - ${siteConfig.tagline}`}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>JakeLoud - Self-Hosted Alternative to Heroku</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <Hero />
      <main>
        <HomepageFeatures />
        <section>
          <div  className={clsx('container', styles.center)}>
            <div className="text--center padding-horiz--md" style={{maxWidth: '60ch'}}>
              <h3>{ecology.title}</h3>
              <p>{ecology.description}</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
